import * as React from 'react';
import '../styles/ui.css';

const Search = ({tabIndex, onChange, value}) => {
    const commands = ['Apply', 'Run', 'Insert', 'Go to', 'Create'];

    const placeholder = [
        'Apply colors, text-styles or grids',
        'Run menu actions ex: subtract, union',
        'Insert components or other shapes',
        'Navigate to your favorite node',
        'Create component selection',
    ];

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{padding: 12, backgroundColor: '#16161d', color: '#fff', width: 64, marginRight: 8}}>
                    {commands[tabIndex]}
                </div>
                <input
                    style={{width: 600}}
                    autoFocus
                    onChange={onChange}
                    placeholder={placeholder[tabIndex]}
                    value={value}
                />
            </div>
            <div>
                <p style={{margin: 0, background: '#16161d', color: '#fff'}}>Press tab to change command</p>
            </div>
        </div>
    );
};

export default Search;
