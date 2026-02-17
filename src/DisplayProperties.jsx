import React, { useState } from "react";
import '98.css';

const DisplayProperties = ({ currentBackground, onApply, onClose }) => {
    const [selectedBg, setSelectedBg] = useState(currentBackground);

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
                <select id="wallpaper-select" disabled>
                    <option>(None)</option>
                </select>
            </div>

            <div className="field-row-stacked" style={{ marginBottom: '10px' }}>
                <label htmlFor="pattern-select">Pattern:</label>
                <select id="pattern-select" disabled>
                    <option>(None)</option>
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
                            onClick={() => setSelectedBg(option.color)}
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
                <button onClick={handleOk}>OK</button>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};

export default DisplayProperties;
