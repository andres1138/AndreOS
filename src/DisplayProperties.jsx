import React, { useState } from "react";
import pattern1 from "./bg_images/pattern1.svg";
import pattern2 from "./bg_images/pattern2.svg";

const DisplayProperties = ({ currentBackground, onApply, onClose }) => {
    const [selectedBg, setSelectedBg] = useState(currentBackground);
    const [selectedPattern, setSelectedPattern] = useState('none');

    const colorOptions = [
        { id: 'teal', color: 'teal', name: 'Teal (Classic)' },
        { id: 'navy', color: '#000080', name: 'Navy Blue' },
        { id: 'maroon', color: '#800000', name: 'Maroon' },
        { id: 'purple', color: '#800080', name: 'Purple' },
        { id: 'olive', color: '#808000', name: 'Olive' },
        { id: 'forest', color: '#008080', name: 'Forest Green' },
        { id: 'black', color: '#000000', name: 'Black' },
        { id: 'gray', color: '#808080', name: 'Gray' },
    ];

    const patternOptions = [
        { id: 'none', name: '(None)', value: null },
        { id: 'pattern1', name: 'Pattern 1', value: `url(${pattern1})` },
        { id: 'pattern2', name: 'Pattern 2', value: `url(${pattern2})` },
    ];

    const handlePatternChange = (e) => {
        const pattern = patternOptions.find(p => p.id === e.target.value);
        setSelectedPattern(pattern.id);

        if (pattern.value) {
            // Pattern selected - use tiled pattern
            setSelectedBg(pattern.value);
        } else {
            // No pattern - reset to teal default
            setSelectedBg('teal');
        }
    };

    const handleColorClick = (color) => {
        setSelectedPattern('none');
        setSelectedBg(color);
    };

    const handleApply = () => {
        onApply(selectedBg);
    };

    const handleOk = () => {
        onApply(selectedBg);
        onClose();
    };

    return (
        <div className="display-properties">
            <div className="field-row-stacked" style={{ marginBottom: '10px' }}>
                <label htmlFor="wallpaper-select">Wallpaper:</label>
                <select
                    id="wallpaper-select"
                    value={selectedPattern}
                    onChange={handlePatternChange}
                >
                    {patternOptions.map(pattern => (
                        <option key={pattern.id} value={pattern.id}>
                            {pattern.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="field-row-stacked" style={{ marginBottom: '15px' }}>
                <label>Background Color:</label>
                <div className="color-grid">
                    {colorOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`color-swatch ${selectedBg === option.color ? 'selected' : ''}`}
                            style={{ backgroundColor: option.color }}
                            onClick={() => handleColorClick(option.color)}
                            title={option.name}
                        />
                    ))}
                </div>
            </div>

            <div className="preview-section">
                <label>Preview:</label>
                <div className="monitor-preview">
                    <div
                        className="monitor-screen"
                        style={{ background: selectedBg }}
                    />
                </div>
            </div>

            <div className="button-row">
                <button className="primary" onClick={handleOk}>OK</button>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};

export default DisplayProperties;
