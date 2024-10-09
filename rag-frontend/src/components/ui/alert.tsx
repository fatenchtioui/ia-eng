import React from 'react';

interface AlertProps {
  variant: 'destructive' | 'info';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const alertStyles =
    variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  return <div className={`p-4 rounded ${alertStyles}`}>{children}</div>;
};

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="font-bold">{children}</div>;
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
