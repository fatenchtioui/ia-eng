import React from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className }) => {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className={`border rounded ${className}`}>
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  return <option value="">{placeholder}</option>;
};
