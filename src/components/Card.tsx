import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('neo-card', className)} {...props}>
      {children}
    </div>
  );
};
