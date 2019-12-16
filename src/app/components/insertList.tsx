import * as React from 'react';
import '../styles/ui.css';
import GenericItem from './listItems/genericItem';
import ComponentIcon from '../icons/componentIcon';

const InsertList = ({assets, value, wrapper}) => {
    const [cursor, setCursor] = React.useState(0);

    const [scrollTop, setScrollTop] = React.useState(0);

    const {components} = assets;

    React.useEffect(() => {
        if (wrapper.current) {
            if (cursor === 0) {
                window.scrollTo(0, 0);
                return;
            }

            const blockHeight = 36;
            const offset = cursor * blockHeight;

            const displayOffset = scrollTop + blockHeight;

            if (displayOffset < offset) {
                setScrollTop(scrollTop + blockHeight);

                window.scrollTo(0, scrollTop);
            }

            if (scrollTop >= offset) {
                setScrollTop(scrollTop - blockHeight);

                window.scrollTo(0, scrollTop);
            }
        }
    }, [cursor]);

    const handleKeyDown = event => {
        if (event.key === 'ArrowDown' && cursor < maxCursor) {
            event.preventDefault();
            setCursor(cursor + 1);
        }

        if (event.key === 'ArrowUp' && cursor > 0) {
            event.preventDefault();
            setCursor(cursor - 1);
        }

        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    React.useEffect(() => {
        setCursor(0);
    }, [value]);

    const handleSubmit = () => {
        const selected = filteredComponents[cursor];

        if (selected.type === 'COMPONENT') {
            parent.postMessage({pluginMessage: {type: 'create-instance', payload: selected}}, '*');
        }
    };

    const filterStyles = style => {
        return style.filter(asset => asset.name.toLowerCase().includes(value.toLocaleLowerCase()));
    };

    const filteredComponents = filterStyles(components);

    const assetTypes = [
        {
            title: 'Components',
            type: 'component',
            assets: filteredComponents,
        },
    ];

    const maxCursor = assetTypes.reduce((acc, nxt) => {
        return acc + nxt.assets.length;
    }, 0);

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 8, width: '100%', overflow: 'auto'}}>
            {assetTypes.map(({title, assets, type}, mainIndex, allAssets) => {
                const startIndex = allAssets.slice(0, mainIndex).reduce((acc, nxt) => {
                    const num = nxt.assets.length;
                    return acc + num;
                }, 0);

                return (
                    <div key={title} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        {assets.length > 0 && (
                            <p style={{padding: '8px 0', color: '#858585'}} className="type type--pos-xlarge-normal">
                                {title}
                            </p>
                        )}
                        {assets.map((item, i) => {
                            const active = startIndex + i === cursor;

                            if (type === 'component') {
                                return <GenericItem key={i} item={item} active={active} icon={<ComponentIcon />} />;
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default InsertList;
