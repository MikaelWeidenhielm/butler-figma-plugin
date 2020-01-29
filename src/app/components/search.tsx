import * as React from 'react';
import '../styles/ui.css';

const Search = ({tabIndex, onChange, value, badgeActive, badgeType}) => {
    const commands = ['Insert', 'Apply', 'Go to'];

    const placeholder = [
        'Search & insert local components',
        'Search & apply local styles to selection',
        'Search & navigate to a node',
    ];

    return (
        <div style={{position: 'fixed', width: '100%', background: '#fff'}}>
            <div style={{display: 'flex', alignItems: 'center', padding: 8}}>
                <button className="button--fixed" style={{marginRight: 8}}>
                    {commands[tabIndex]}
                </button>
                {badgeActive && (
                    <p
                        className="type type--pos-small-normal"
                        style={{
                            background: '#18a0fb',
                            padding: '2px 8px',
                            borderRadius: 4,
                            position: 'absolute',
                            color: '#fff',
                            left: 88,
                            zIndex: 10,
                        }}
                    >
                        {badgeType}
                    </p>
                )}
                <input
                    className="input"
                    autoFocus
                    onChange={onChange}
                    placeholder={!badgeActive ? placeholder[tabIndex] : ''}
                    value={value}
                    style={{paddingLeft: badgeActive && 48}}
                />
            </div>
            <div
                style={{
                    paddingLeft: 16,
                    paddingRight: 12,
                    paddingBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #e5e5e5',
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {commands.map((command, i) => {
                        const active = i === tabIndex;

                        return (
                            <p
                                key={i}
                                className="type type--pos-small-normal"
                                style={{
                                    margin: 0,
                                    marginRight: 8,
                                    background: active && 'rgba(24,145,251, 0.2)',
                                    color: active && '#1891fb',
                                    padding: active && '2px 8px',
                                    fontWeight: active && 500,
                                    borderRadius: 4,
                                }}
                            >
                                {command}
                            </p>
                        );
                    })}
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p
                        className="type type--pos-small-bold"
                        style={{
                            margin: 0,
                            fontWeight: 500,
                        }}
                    >
                        Change command with Tab
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Search;
