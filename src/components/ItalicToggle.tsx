// components/ItalicToggle.tsx
import React from 'react';
import './ItalicToggle.css'; // Import CSS for styling

interface ItalicToggleProps {
  isItalic: boolean;
  onToggle: () => void;
}

const ItalicToggle: React.FC<ItalicToggleProps> = ({ isItalic, onToggle }) => {
  return (
    <div className="italic-toggle-container">
      <label className="switch">
        <input type="checkbox" checked={isItalic} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <span className="toggle-label">Italic</span>
    </div>
  );
};

export default ItalicToggle;
