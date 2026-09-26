import { View } from '@react-pdf/renderer';
import { colors } from '../constants';

interface DividerProps {
  color?: keyof typeof colors;
}

export function Divider({ color = 'primary' }: DividerProps) {
  return (
    <View
      style={{ height: 1, flex: 1, backgroundColor: colors[color] }}
    />
  );
}
