import * as React from 'react';
import '../styles/ui.css';

import Search from './search';
import ApplyList from './applyList';
import InsertList from './insertList';
import GoToList from './goToList';
import SkeletonLoader from './skeletonLoader';

const App = ({}) => {
    const [isLoading, setLoading] = React.useState(true);
    const [assets, setAssets] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [tabIndex, setTabIndex] = React.useState(0);
    const [badgeActive, setBadgeActive] = React.useState(false);
    const [badgeType, setBadgeType] = React.useState('');

    const wrapper = React.useRef(null);

    const onLoad = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'onLoad'}}, '*');
    }, []);

    //check keyboard events
    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            parent.postMessage({pluginMessage: {type: 'close'}}, '*');
        }

        if (event.keyCode === 9) {
            event.preventDefault();

            if (tabIndex === 2) {
                setTabIndex(0);
            } else {
                setTabIndex(tabIndex + 1);
            }
        }

        if (event.keyCode === 8 && value === '') {
            setBadgeActive(false);
        }
    };

    //check keyboard events
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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

    React.useEffect(() => {
        if (badgeActive) {
            setValue('');
        }
    }, [badgeActive]);

    return isLoading ? (
        <SkeletonLoader />
    ) : (
        <div ref={wrapper}>
            <Search
                badgeActive={badgeActive}
                tabIndex={tabIndex}
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                }}
                badgeType={badgeType}
            />

            <div style={{height: 70}} />
            {tabIndex === 0 && <InsertList wrapper={wrapper} assets={assets} value={value} />}
            {tabIndex === 1 && (
                <ApplyList
                    wrapper={wrapper}
                    assets={assets}
                    value={value}
                    setBadgeActive={setBadgeActive}
                    badgeActive={badgeActive}
                    badgeType={badgeType}
                    setBadgeType={setBadgeType}
                />
            )}
            {tabIndex === 2 && <GoToList wrapper={wrapper} assets={assets} value={value} />}
        </div>
    );
};

export default App;
