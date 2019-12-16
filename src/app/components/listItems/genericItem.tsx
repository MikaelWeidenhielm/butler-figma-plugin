import * as React from 'react';
import '../../styles/ui.css';

const GenericItem = ({item, active, i, icon}) => {
    const handleSubmit = item => {
        console.log(item);
        if (item.type === 'EFFECT') {
            parent.postMessage({pluginMessage: {type: 'apply-effect-style', payload: item.key}}, '*');
        }

        if (item.type === 'GRID') {
            parent.postMessage({pluginMessage: {type: 'apply-grid-style', payload: item.key}}, '*');
        }

        if (item.category === 'navigation') {
            parent.postMessage({pluginMessage: {type: 'go-to-selected', payload: item}}, '*');
        }

        if (item.category === 'insert') {
            parent.postMessage({pluginMessage: {type: 'create-instance', payload: item}}, '*');
        }
    };
    return (
        <div
            key={i}
            onClick={() => {
                handleSubmit(item);
            }}
            className="listItem"
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {icon}
            </div>

            <div className="type type--neg-medium-normal" style={{marginRight: 8}}>
                {item.name}
            </div>
            {(item.description || item.page) && (
                <div style={{color: '#858585', marginRight: 8}} className="type type--neg-small-normal">
                    |
                </div>
            )}
            {item.description && (
                <div style={{color: '#858585'}} className="type type--neg-small-normal">
                    {item.description}
                </div>
            )}
            {item.page && (
                <div style={{color: '#858585'}} className="type type--neg-small-normal">
                    {item.page}
                </div>
            )}
        </div>
    );
};

export default GenericItem;
