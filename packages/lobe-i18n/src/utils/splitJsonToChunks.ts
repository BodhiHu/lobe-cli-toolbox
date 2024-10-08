import { isPlainObject, reduce } from 'lodash-es';

import { LocaleObj } from '@/types';
import { I18nConfig } from '@/types/config';

import { ModelTokens, defaultModel } from '../../../common/models';
import {
  KEY_EXTRA_TOKENS,
  OBJECT_EXTRA_TOKENS,
  calcEncodedKeyToken,
  calcJsonToken,
  calcPrimitiveValueToken,
  calcToken,
} from './calcToken';
import { diff } from './diffJson';

const splitJSONtoSmallChunks = (object: LocaleObj, splitToken: number) =>
  reduce(
    Object.entries(object),
    (chunks: any[], [key, value]: [string, any]) => {
      let [chunk, chunkSize]: [LocaleObj, number] = chunks.pop() || [{}, OBJECT_EXTRA_TOKENS];
      const nextValueSize = isPlainObject(value)
        ? calcJsonToken(value, 1)
        : calcPrimitiveValueToken(value);
      if (chunkSize + calcEncodedKeyToken(key) + KEY_EXTRA_TOKENS + nextValueSize <= splitToken) {
        chunk[key] = value;
        chunkSize += calcEncodedKeyToken(key) + KEY_EXTRA_TOKENS + nextValueSize;
        chunks.push([chunk, chunkSize]);
      } else {
        chunks.push(
          [chunk, chunkSize],
          [{ [key]: value }, calcEncodedKeyToken(key) + KEY_EXTRA_TOKENS + nextValueSize],
        );
      }
      return chunks;
    },
    [],
  ).map(([chunk]) => chunk);

export const getSplitToken = (config: I18nConfig, prompt: string) => {
  let splitToken = (ModelTokens[config.modelName || defaultModel] - calcToken(prompt)) / 3;
  if (!splitToken) {
    splitToken = 128_000;
  }
  if (config.splitToken) {
    splitToken = config.splitToken;
  }
  splitToken = Math.floor(splitToken);
  console.info("INFO: splitToken =", splitToken);
  return splitToken;
};

export const splitJsonToChunks = (
  config: I18nConfig,
  entry: LocaleObj,
  target: LocaleObj,
  prompt: string,
): LocaleObj[] => {
  const extraJSON = diff(entry, target).entry;
  const splitToken = getSplitToken(config, prompt);
  const splitObj = splitJSONtoSmallChunks(extraJSON, splitToken);
  return splitObj;
};
