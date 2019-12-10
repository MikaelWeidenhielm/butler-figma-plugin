import * as React from 'react';
import '../styles/ui.css';
import FillItem from './listItems/fillItem';
import StrokeItem from './listItems/strokeItem';
import TextItem from './listItems/textItem';
import GenericItem from './listItems/genericItem';
import EffectIcon from '../icons/effectIcon';
import GridIcon from '../icons/gridIcon';

const ApplyList = ({assets, value, wrapper}) => {
    const [cursor, setCursor] = React.useState(0);

    const {fillStyles, strokeStyles, textStyles, effectStyles, gridStyles} = assets;

    // React.useEffect(() => {
    //     // if (wrapper.current) {
    //     if (wrapper.current) {
    //         if (cursor === 0) {
    //             console.log('scrolling to top!');
    //             window.scrollTo(0, 0);
    //             return;
    //         }

    //         // wrapper.current.scrollIntoView({behavior: 'smooth', block: 'start'});

    //         const blockHeight = 40;
    //         const offset = cursor * blockHeight;

    //         const displayOffset = scrollTop + 100;

    //         if (displayOffset < offset) {
    //             setScrollTop(scrollTop + blockHeight);

    //             window.scrollTo(0, scrollTop);
    //         }

    //         if (scrollTop >= offset) {
    //             setScrollTop(scrollTop - blockHeight);

    //             window.scrollTo(0, scrollTop);
    //         }
    //     }
    // }, [cursor]);

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
        const selected = allAssets[cursor];

        if (selected.category === 'fill') {
            parent.postMessage({pluginMessage: {type: 'apply-fill-style', payload: selected.key}}, '*');
        }

        if (selected.category === 'stroke') {
            parent.postMessage({pluginMessage: {type: 'apply-stroke-style', payload: selected.key}}, '*');
        }

        if (selected.type === 'TEXT') {
            parent.postMessage({pluginMessage: {type: 'apply-text-style', payload: selected.key}}, '*');
        }

        if (selected.type === 'EFFECT') {
            parent.postMessage({pluginMessage: {type: 'apply-effect-style', payload: selected.key}}, '*');
        }

        if (selected.type === 'GRID') {
            parent.postMessage({pluginMessage: {type: 'apply-grid-style', payload: selected.key}}, '*');
        }
    };

    const filterStyles = style => {
        return style.filter(asset => asset.name.toLowerCase().includes(value.toLocaleLowerCase()));
    };

    const filteredFillStyles = filterStyles(fillStyles);
    const filteredStrokeStyles = filterStyles(strokeStyles);
    const filteredTextStyles = filterStyles(textStyles);
    const filteredEffectStyles = filterStyles(effectStyles);
    const filteredGridStyles = filterStyles(gridStyles);

    const arr = [];

    const allAssets = arr.concat(
        filteredFillStyles,
        filteredStrokeStyles,
        filteredTextStyles,
        filteredEffectStyles,
        filteredGridStyles
    );

    const assetTypes = [
        {
            title: 'Fill styles',
            type: 'fill',
            assets: filteredFillStyles,
        },
        {
            title: 'Stroke styles',
            type: 'stroke',
            assets: filteredStrokeStyles,
        },
        {
            title: 'Text styles',
            type: 'text',
            assets: filteredTextStyles,
        },
        {
            title: 'Effect styles',
            type: 'effect',
            assets: filteredEffectStyles,
        },
        {
            title: 'Grid styles',
            type: 'grid',
            assets: filteredGridStyles,
        },
    ];

    const maxCursor = assetTypes.reduce((acc, nxt) => {
        return acc + nxt.assets.length;
    }, 0);

    const handleMouseEnter = arg => {
        // setIsHovering(true);
        setCursor(arg);
    };

    return (
        <div
            // onScroll={() => onResultScroll()}
            style={{display: 'flex', flexDirection: 'column', padding: 8, width: '100%', overflow: 'auto'}}
        >
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

                            if (type === 'fill') {
                                return (
                                    <FillItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                    />
                                );
                            }

                            if (type === 'stroke') {
                                return (
                                    <StrokeItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                    />
                                );
                            }

                            if (type === 'text') {
                                return (
                                    <TextItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                    />
                                );
                            }

                            if (type === 'effect') {
                                return (
                                    <GenericItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        icon={<EffectIcon />}
                                    />
                                );
                            }

                            if (type === 'grid') {
                                return (
                                    <GenericItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        icon={<GridIcon />}
                                    />
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ApplyList;
