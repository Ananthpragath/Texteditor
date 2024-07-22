// components/FontSelector.tsx
import React from 'react';

interface FontSelectorProps {
  fonts: string[];
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, selectedFont, onFontChange }) => {
  return (
    <div>
      <select value={selectedFont} onChange={(e) => onFontChange(e.target.value)}>
        {fonts.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
