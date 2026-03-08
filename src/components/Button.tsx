import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  children?: ReactNode;
}

export const Button = ({ className, variant = 'primary', children, ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-neo-yellow hover:bg-yellow-400',
    secondary: 'bg-neo-blue text-white hover:bg-blue-600',
    accent: 'bg-neo-pink hover:bg-pink-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      className={cn('neo-button', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
