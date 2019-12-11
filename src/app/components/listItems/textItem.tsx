import * as React from 'react';
import '../../styles/ui.css';

const TextItem = ({item, active, i}) => {
    const setFontWeight = fontWeight => {
        switch (fontWeight.toLowerCase()) {
            case 'ultralight':
            case 'ultra light':
            case 'extra light':
            case 'ultralight beta':
            case 'ultra light beta':
            case 'extra light beta':
            case 'thin':
                return 100;
            case 'light':
                return 300;
            case 'regular':
            case 'normal':
                return 400;
            case 'medium':
                return 500;
            case 'semi bold':
            case 'semibold':
            case 'demibold':
            case 'demi bold':
                return 600;
            case 'bold':
                return 700;
            case 'heavy':
            case 'extra bold':
                return 800;
            case 'black':
            case 'ultra bold':
                return 900;
            default:
                return 400;
        }
    };

    const fontWeight = setFontWeight(item.fontName.style);

    const handleSubmit = item => {
        parent.postMessage({pluginMessage: {type: 'apply-text-style', payload: item.key}}, '*');
    };

    return (
        <div
            key={i}
            className="listItem"
            onClick={() => handleSubmit(item)}
            style={{
                width: '100%',
                background: active ? 'rgba(24,145,251, 0.2)' : '#fff',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                padding: 8,
            }}
        >
            <div
                style={{
                    width: 20,
                    height: 20,
                    marginRight: 8,
                    lineHeight: '20px',
                    fontFamily: `${item.fontName.family}, Inter`,
                    fontWeight: fontWeight,
                    fontSize: 16,
                }}
            >
                Ag
            </div>

            <div className="type type--neg-medium-normal" style={{marginRight: 8}}>
                {item.name}
            </div>
            {item.description && (
                <div style={{color: 'rgba(0,0,0, 0.48)', marginRight: 8}} className="type type--neg-small-normal">
                    |
                </div>
            )}
            {item.description && (
                <div style={{color: 'rgba(0,0,0, 0.48)'}} className="type type--neg-small-normal">
                    {item.description}
                </div>
            )}
        </div>
    );
};

export default TextItem;
