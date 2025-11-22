import type { Position } from '@/types/experiences';
import { cn } from '@/utils';
import { Heading, Text } from '../shared';

function PositionItem({ title, description }: Position) {
  return (
    <li className="flex gap-2">
      <Text variant="highlight" tag="span">{'=>'}</Text>
      <div>
        <Heading tag="h4">{title}</Heading>
        <Text>{description}</Text>
      </div>
    </li>
  );
}

export function Positions({ positions, className }: { positions: Array<Position>, className?: string }) {
  return (
    <ul className={cn('flex flex-col gap-4 py-2', className)}>
      {positions.map((position, index) => <PositionItem key={`${position.title}-${index.toString()}`} {...position} />)}
    </ul>
  );
}
