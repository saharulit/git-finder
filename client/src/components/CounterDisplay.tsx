import React from 'react';

interface CounterDisplayProps {
  title: string;
  count: number;
  className?: string;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ title, count,className }) => {
  return (
    <p className={`text-gray-500 mb-3 ${className}`}>
      {title}: <span className="font-semibold">{count}</span>
    </p>
  );
};

export default CounterDisplay;
