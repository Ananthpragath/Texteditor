// components/FontWeightSelector.tsx
import React from 'react';

interface FontWeightSelectorProps {
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
  variants: { [variant: string]: string };
}

const FontWeightSelector: React.FC<FontWeightSelectorProps> = ({ selectedWeight, onWeightChange, variants }) => {
  return (
    <div>
      <select value={selectedWeight} onChange={(e) => onWeightChange(e.target.value)}>
        {Object.keys(variants).map(weight => (
          <option key={weight} value={weight}>{weight}</option>
        ))}
      </select>
    </div>
  );
};

export default FontWeightSelector;
