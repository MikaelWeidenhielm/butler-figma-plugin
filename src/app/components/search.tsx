import * as React from 'react';
import '../styles/ui.css';

const Search = ({}) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const [command] = React.useState(['Apply', 'Run', 'Insert', 'Go to', 'Create']);
    const [placeholder] = React.useState([
        'Apply colors, text-styles or grids',
        'Run menu actions ex: subtract, union',
        'Insert components or other shapes',
        'Navigate to your favorite node',
        'Create component selection',
    ]);

    const handleUserKeyPress = event => {
        if (event.keyCode === 9) {
            event.preventDefault();

            if (tabIndex === 4) {
                setTabIndex(0);
            } else {
                setTabIndex(tabIndex + 1);
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{padding: 12, backgroundColor: '#16161d', color: '#fff', width: 64, marginRight: 8}}>
                    {command[tabIndex]}
                </div>
                <input style={{width: 600}} autoFocus placeholder={placeholder[tabIndex]} />
            </div>
            <div>
                <p style={{margin: 0, background: '#16161d', color: '#fff'}}>Press tab to change command</p>
            </div>
        </div>
    );
};

export default Search;
