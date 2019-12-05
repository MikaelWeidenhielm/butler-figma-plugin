import * as React from 'react';
import '../styles/ui.css';

import Search from './search';
import ApplyList from './applyList';

const App = ({}) => {
    const [isLoading, setLoading] = React.useState(true);
    const [assets, setAssets] = React.useState();
    const [tabIndex, setTabIndex] = React.useState(0);

    const onLoad = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'onLoad'}}, '*');
    }, []);

    const onCancel = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }, []);

    // const onClick = React.useCallback(() => {
    //     parent.postMessage({pluginMessage: {type: 'apply-fill-style'}}, '*');
    // }, []);

    const applyBorderStyle = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'apply-border-style'}}, '*');
    }, []);

    const applyFillStyle = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'apply-fill-style'}}, '*');
    }, []);

    const applyTextStyle = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'apply-text-style'}}, '*');
    }, []);

    const applyEffectStyle = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'apply-effect-style'}}, '*');
    }, []);

    const applyGridStyle = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'apply-grid-style'}}, '*');
    }, []);

    //check for tab presses
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

    //check for tab presses
    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    //Initialize UI with data
    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        onLoad();

        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'loaded-assets') {
                setAssets(JSON.parse(message));
                setLoading(false);
            }
        };
    }, []);

    return isLoading ? (
        <p>loading</p>
    ) : (
        <div>
            <Search tabIndex={tabIndex} />
            {tabIndex === 0 && <ApplyList assets={assets} />}

            <button id="create" onClick={applyGridStyle}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
