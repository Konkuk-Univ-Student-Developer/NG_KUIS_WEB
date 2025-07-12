import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getColorClass, getHoverColorClass } from '@/lib/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'darkgreen';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  const customVariants = {
    darkgreen: `${getColorClass('darkgreen', 'bg')} text-white ${getHoverColorClass('darkgreen', 'bg')}/90 border-transparent`,
  };

  const isCustomVariant = variant === 'darkgreen';
  const buttonVariant = isCustomVariant ? 'default' : variant;
  const customClass = isCustomVariant ? customVariants[variant] : '';

  return (
    <ShadcnButton
      variant={buttonVariant}
      size={size}
      className={cn(customClass, className)}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
