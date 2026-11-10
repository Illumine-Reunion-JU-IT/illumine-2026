import React from 'react';

/**
 * TODO: Implement a reusable theme-compliant button.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
