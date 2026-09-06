import type { ComponentPropsWithoutRef } from 'react';

export function Table({ children, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-2 max-w-full overflow-x-auto whitespace-normal">
      <table
        {...props}
        className="w-full border-collapse border border-gray-300 dark:border-gray-600"
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, ...props }: ComponentPropsWithoutRef<'thead'>) {
  return (
    <thead {...props} className="bg-gray-100 dark:bg-gray-700">
      {children}
    </thead>
  );
}

export function TableHeader({ children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      {...props}
      className="border border-gray-300 px-2 py-1 text-left font-medium dark:border-gray-600"
    >
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      {...props}
      className="border border-gray-300 px-2 py-1 dark:border-gray-600"
    >
      {children}
    </td>
  );
}
