import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { alert } from '@lobehub/cli-ui';

import { promptJsonTranslate, promptStringTranslate } from '@/prompts/translate';
import { LocaleObj } from '@/types';
import { I18nConfig } from '@/types/config';
import { BaseMessage, MessageType } from '@langchain/core/messages';

const lcMsgs_2_oaiMsgs = (msgs: BaseMessage[]) => {
  const typeToRole = (type: MessageType) => {
    switch(type) {
      case "human":
        return "user";
      case "system":
      case "function":
      case "tool":
        return type;
      case "ai":
      case "generic":
      case "remove":
      default:
        return 'assistant';
    }
  }

  return msgs.map(m => ({
    role: typeToRole(m._getType()),
    content: m.content
  }));
}

export class TranslateLocale {
  private model: ChatOpenAI;
  private config: I18nConfig;
  private openAIProxyUrl?: string;
  private openAIApiKey: string;
  private isJsonMode: boolean;
  promptJson: ChatPromptTemplate<{ from: string; json: string; to: string }>;
  promptString: ChatPromptTemplate<{ from: string; text: string; to: string }>;
  constructor(config: I18nConfig, openAIApiKey: string, openAIProxyUrl?: string) {
    this.config = config;
    this.openAIProxyUrl = openAIProxyUrl;
    this.openAIApiKey = openAIApiKey;
    console.info("INFO: i18n config =", this.config);
    this.model = new ChatOpenAI({
      configuration: {
        baseURL: openAIProxyUrl,
      },
      maxConcurrency: config.concurrency,
      maxRetries: 4,
      modelName: config.modelName,
      openAIApiKey,
      temperature: config.temperature,
      topP: config.topP,
    });
    this.promptJson = promptJsonTranslate(config.reference);
    this.promptString = promptStringTranslate(config.reference);
    this.isJsonMode = Boolean(this.config?.experimental?.jsonMode);
  }

  async runByString({
    from,
    to,
    text,
    leftRetries = undefined
  }: {
    from?: string;
    text: string;
    to: string;
    leftRetries?: number;
  }): Promise<string | any> {
    try {
      const formattedChatPrompt = await this.promptString.formatMessages({
        from: from || this.config.entryLocale,
        text: text,
        to,
      });

      let result = '';

      const messages = lcMsgs_2_oaiMsgs(formattedChatPrompt);
      // console.info("DEBUG: oai messages =", JSON.stringify(messages, null, 2));
      const res = await fetch(`${this.openAIProxyUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: this.config.modelName,
          stream: false,
          temperature: 0
        })
      });
      const resData = await res.json();

      result = resData?.choices?.[0]?.message?.content;

      if (!result) {
        console.info("ERROR: invalid reponse, resData =", resData);
        throw new Error("invalid reponse");
      }

      return result;
    } catch (error) {

      if (leftRetries === undefined) {
        leftRetries = 5;
      }

      if (leftRetries > 0) {
        const retryDelays = 90;
        console.info(`INFO: will retry in ${retryDelays} seconds...`);
        console.info('INFO: tick =', new Date().toUTCString());
        await new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve(0);
          }, retryDelays*1000);
        });
        console.info(`INFO: ${retryDelays} seconds reached, tick =`, new Date().toUTCString());
        return this.runByString({
          from, to, text,
          leftRetries: leftRetries - 1
        });
      }

      this.handleError(error);
    }
  }
  async runByJson({
    from,
    to,
    json,
  }: {
    from?: string;
    json: LocaleObj;
    to: string;
  }): Promise<LocaleObj | any> {
    try {
      const formattedChatPrompt = await this.promptJson.formatMessages({
        from: from || this.config.entryLocale,
        json: JSON.stringify(json),
        to,
      });

      // console.info("DEBUG: runByJson formattedChatPrompt =", JSON.stringify(formattedChatPrompt, null, 2));
      const res = await this.model.invoke(
        formattedChatPrompt,
        this.isJsonMode
          ? {
              response_format: { type: 'json_object' },
            }
          : undefined,
      );
      // console.info("DEBUG: res =", JSON.stringify(res, null, 2));

      const result = this.isJsonMode ? res['content'] : res['text'];

      if (!result) this.handleError();

      const message = JSON.parse(result as string);

      return message;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error?: any) {
    alert.error(`Translate failed, ${error || 'please check your network or try again...'}`, true);
    console.error("ERROR:", error);
  }
}
