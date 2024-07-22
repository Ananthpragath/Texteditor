import React, { useState, useEffect } from 'react';
import FontSelector from './components/FontSelector';
import FontWeightSelector from './components/FontWeightSelector';
import ItalicToggle from './components/ItalicToggle';
import './App.css';

interface FontData {
  [key: string]: {
    [variant: string]: string;
  };
}

const App: React.FC = () => {
  const [fonts, setFonts] = useState<FontData>({});
  const [selectedFont, setSelectedFont] = useState<string>('Arial');
  const [selectedWeight, setSelectedWeight] = useState<string>('normal');
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  // Fetch font data from JSON file
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch('/fonts.json');
        const data: FontData = await response.json();
        setFonts(data);
      } catch (error) {
        console.error('Error fetching font data:', error);
      }
    };

    fetchFonts();
  }, []);

  // Load saved state from local storage
  useEffect(() => {
    const savedText = localStorage.getItem('text');
    const savedFont = localStorage.getItem('font');
    const savedWeight = localStorage.getItem('weight');
    const savedItalic = localStorage.getItem('italic');

    if (savedText) setText(savedText);
    if (savedFont) setSelectedFont(savedFont);
    if (savedWeight) setSelectedWeight(savedWeight);
    if (savedItalic !== null) setIsItalic(JSON.parse(savedItalic));
  }, []);

  // Save the current state to local storage
  const handleSave = () => {
    localStorage.setItem('text', text);
    localStorage.setItem('font', selectedFont);
    localStorage.setItem('weight', selectedWeight);
    localStorage.setItem('italic', JSON.stringify(isItalic));
    alert('Changes saved!');
  };

  // Clear textarea content but retain local storage values
  const handleReset = () => {
    setText(''); // Clear textarea content
  };

  // Handle font change
  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    applyStyle();
  };

  // Handle weight change
  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight);
    applyStyle();
  };

  // Toggle italic
  const handleItalicToggle = () => {
    setIsItalic(prev => !prev);
    applyStyle();
  };

  // Apply styles to selected text
  const applyStyle = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontFamily = selectedFont;
      span.style.fontWeight = selectedWeight === 'normal' ? '400' : selectedWeight;
      span.style.fontStyle = isItalic ? 'italic' : 'normal';
      span.appendChild(range.extractContents());
      range.insertNode(span);
      selection.removeAllRanges();
    }
  };

  // Get font variants and URL
  const fontVariants = fonts[selectedFont] || {};
  const currentFontUrl = fontVariants[selectedWeight] || '';

  // Update font link
  useEffect(() => {
    let linkElement = document.getElementById('font-link') as HTMLLinkElement;

    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = 'font-link';
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }

    linkElement.href = `${currentFontUrl}?${new Date().getTime()}`;

    return () => {
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, [currentFontUrl]);

  return (
    <div className="app-container">
      <div className="controls">
        <div className="font-selector">
          <label>Font Family</label>
          <FontSelector
            fonts={Object.keys(fonts)}
            selectedFont={selectedFont}
            onFontChange={handleFontChange}
          />
        </div>
        <div className="font-weight-selector">
          <label>Variant</label>
          <FontWeightSelector
            selectedWeight={selectedWeight}
            onWeightChange={handleWeightChange}
            variants={fontVariants}
          />
        </div>
        <div className="italic-toggle">
          <ItalicToggle
            isItalic={isItalic}
            onToggle={handleItalicToggle}
          />
        </div>
      </div>
      <div
        className="text-editor"
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: selectedFont,
          fontWeight: selectedWeight === 'normal' ? '400' : selectedWeight === 'bold' ? '700' : selectedWeight,
          fontStyle: isItalic ? 'italic' : 'normal',
          border: '1px solid #ccc',
          padding: '10px',
          width: '100%',
          maxWidth: '800px',
          minHeight: '200px',
          marginTop: '20px',
        }}
        onInput={(e) => setText((e.target as HTMLDivElement).innerHTML)}
      >
        {text}
      </div>
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
