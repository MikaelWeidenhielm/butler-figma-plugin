import * as React from 'react';
import '../styles/ui.css';

import Search from './search';

const App = ({}) => {
    const [isLoading, setLoading] = React.useState(true);
    const [assets, setAssets] = React.useState();

    // const countRef = React.useCallback((element: HTMLInputElement) => {
    //     if (element) element.value = '5';
    //     textbox.current = element;
    // }, []);

    // const onCreate = React.useCallback(() => {
    //     const count = parseInt(textbox.current.value, 10);
    //     parent.postMessage({pluginMessage: {type: 'create', count}}, '*');
    // }, []);

    const onLoad = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'onLoad'}}, '*');
    }, []);

    const onCancel = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }, []);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        onLoad();

        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'loaded-assets') {
                console.log('got msg');
                // console.log(JSON.stringify(message));
                setAssets(JSON.parse(message));
                setLoading(false);
            }
        };
    }, []);

    const onClick = () => {
        console.log(assets.colorStyles);
    };

    return isLoading ? (
        <p>loading</p>
    ) : (
        <div>
            <Search />
            {assets.colorStyles.map((item, i) => {
                const color = item.paints[0].color;

                const r = Math.floor(255 * color.r);
                const g = Math.floor(255 * color.g);
                const b = Math.floor(255 * color.b);

                return (
                    <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                border: '1px solid #f6f6f6',
                                marginRight: 16,
                            }}
                        />
                        <p>{item.name}</p>
                    </div>
                );
            })}
            <button id="create" onClick={onClick}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
