import { ChatPromptTemplate } from '@langchain/core/prompts';

const DEFAULT_REFERENCE = '';

export const promptJsonTranslate = (reference: string = DEFAULT_REFERENCE) => {
  return ChatPromptTemplate.fromMessages<{
    from: string;
    json: string;
    to: string;
  }>([
    [
      'system',
      [
        `You are a translation expert.`,
        `Translate the i18n JSON file from {from} to {to}`,
        reference && `Here are some reference to help with better translation.  ---${reference}---`,
        `Keep the keys the same as the original file and make sure the output remains a valid i18n JSON file.`,
      ]
        .filter(Boolean)
        .join('\n'),
    ],
    [
      'human',
      [
        '{json}'
      ].join('\n'),
    ],
  ]);
};

export const promptStringTranslate = (reference: string = DEFAULT_REFERENCE) => {
  return ChatPromptTemplate.fromMessages<{
    from: string;
    text: string;
    to: string;
  }>([
    [
      'system',
      [
        `You are a translation expert.`,
        `Translate the markdown from {from} to {to}.`,
        reference && `Here are some reference to help with better translation.  ---${reference}---`,
      ]
        .filter(Boolean)
        .join('\n'),
    ],
    ['human', '{text}'],
  ]);
};
