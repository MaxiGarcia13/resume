import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm';
import { atom } from 'nanostores';

export type Message = ChatCompletionMessageParam;

export const $messages = atom<Array<Message>>([]);

export function pushMessage(message: Message): void {
  $messages.set([...$messages.get(), message]);
}
