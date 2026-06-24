import { useStore } from '@nanostores/react';
import { $messages, $replying } from './messages.store';

export function useMessages() {
  return useStore($messages);
}

export function useReplying() {
  return useStore($replying);
}
