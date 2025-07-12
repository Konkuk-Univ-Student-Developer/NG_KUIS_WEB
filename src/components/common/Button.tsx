import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  // darkgreen variant는 간단하게 클래스 오버라이드로 처리
  if (variant === 'darkgreen') {
    return (
      <ShadcnButton
        variant="default"
        size={size}
        className={cn(
          'bg-darkgreen text-white hover:bg-darkgreen/90 border-transparent',
          className
        )}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
