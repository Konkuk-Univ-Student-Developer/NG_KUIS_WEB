import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  widthClass?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'beige' | 'gray' | 'darkgreen' | 'white' | 'white-gray';
  size?: 'sm' | 'md' | 'lg';
  as?: 'span' | 'div' | 'button';
  icon?: React.ReactNode;
  onClick?: () => void;
  hover?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children,
  label,
  className = '', 
  widthClass = '',
  variant = 'default',
  size = 'md',
  as: Component = 'span',
  icon,
  onClick,
  hover = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap';
  
  const variantStyles = {
    default: 'bg-stone-200 text-gray-500',
    primary: 'bg-[#036B3F] text-white',
    secondary: 'bg-stone-200 text-gray-500',
    beige: 'bg-beige text-black',
    gray: 'bg-gray-100 text-gray-700',
    darkgreen: 'bg-darkgreen text-white',
    white: 'bg-white text-darkgray',
    'white-gray': 'bg-white text-gray-500'
  };

  const sizeStyles = {
    sm: 'px-3 py-0.5 text-xs rounded-[10px]',
    md: 'px-4 py-1 text-sm rounded-[10px]',
    lg: 'px-4 py-2 text-sm rounded-[10px] font-semibold'
  };

  // For Tag-like usage with label
  if (Component === 'div' && label) {
    return (
      <div className={`relative flex justify-center items-center ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${className}`}>
        <span className="text-center leading-tight">
          {label}
        </span>
      </div>
    );
  }

  // For button usage
  if (Component === 'button') {
    return (
      <button 
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${hover} transition-colors ${className}`}
      >
        {icon && (
          <span className="flex items-center gap-2">
            {icon}
            {children || label}
          </span>
        )}
        {!icon && (children || label)}
      </button>
    );
  }

  // For Chip-like usage or regular Badge
  return (
    <Component 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <span className="flex items-center gap-2">
          {icon}
          {children || label}
        </span>
      )}
      {!icon && (children || label)}
    </Component>
  );
};

export default Badge;