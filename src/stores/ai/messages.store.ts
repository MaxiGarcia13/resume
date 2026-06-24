import { atom } from 'nanostores';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}

export const $messages = atom<Array<Message>>([]);

export function pushMessage(message: Message): void {
  $messages.set([...$messages.get(), message]);
}
