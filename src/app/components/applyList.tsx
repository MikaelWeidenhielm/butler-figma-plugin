import * as React from 'react';
import '../styles/ui.css';
import FillItem from './listItems/fillItem';
import StrokeItem from './listItems/strokeItem';
import TextItem from './listItems/textItem';
import GenericItem from './listItems/genericItem';
import EffectIcon from '../icons/effectIcon';
import GridIcon from '../icons/gridIcon';

const ApplyList = ({assets, value, wrapper, setBadgeActive, badgeActive, badgeType, setBadgeType}) => {
    const [cursor, setCursor] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    const [filterTypes, setFilterTypes] = React.useState(false);

    const {fillStyles, strokeStyles, textStyles, effectStyles, gridStyles} = assets;

    React.useEffect(() => {
        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'error') {
                const timer = setTimeout(() => {
                    setError(false);
                }, 4000);

                setError(true);
                setErrorMsg(message);

                return () => clearTimeout(timer);
            }
        };
    }, []);

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

        if (filterTypes && event.key === 'ArrowDown' && cursor < assetTypes.length - 1) {
            event.preventDefault();
            setCursor(cursor + 1);
        }

        if (event.key === 'ArrowUp' && cursor > 0) {
            event.preventDefault();
            setCursor(cursor - 1);
        }

        if (filterTypes && event.key === 'Enter') {
            const selected = filteredStupidTypes[cursor];

            setBadgeType(selected.type.substr(1));

            setBadgeActive(true);
        }

        if (!filterTypes && event.key === 'Enter') {
            handleSubmit();
        }
    };

    React.useEffect(() => {
        if (value.startsWith('/') && !badgeActive) {
            setFilterTypes(true);
        } else {
            setFilterTypes(false);
        }
    }, [value]);

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

    const stupidTypes = [
        {
            type: '/Fills',
            assets: fillStyles,
        },
        {
            type: '/Strokes',
            assets: strokeStyles,
        },
        {
            type: '/Texts',
            assets: textStyles,
        },
        {
            type: '/Effects',
            assets: effectStyles,
        },
        {
            type: '/Grids',
            assets: gridStyles,
        },
    ];

    const filteredTypes = type => {
        return type.filter(type => type.type.toLowerCase().includes(value.toLocaleLowerCase()));
    };

    const filteredStupidTypes = filteredTypes(stupidTypes);

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

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 8, width: '100%', overflow: 'auto'}}>
            {filterTypes &&
                !badgeActive &&
                filteredStupidTypes.map((asset, i) => {
                    const active = 0 + i === cursor;

                    const assetType = asset.type.substr(1);

                    if (asset.assets.length > 0) {
                        return (
                            <p
                                style={{
                                    padding: 4,
                                    color: '#000',
                                    background: active ? 'rgba(24,145,251, 0.2)' : 'white',
                                }}
                                className="type type--pos-xlarge-normal"
                            >
                                {assetType}
                            </p>
                        );
                    }
                })}
            {!filterTypes &&
                assetTypes.map(({title, assets, type}, mainIndex, allAssets) => {
                    const startIndex = allAssets.slice(0, mainIndex).reduce((acc, nxt) => {
                        const num = nxt.assets.length;
                        return acc + num;
                    }, 0);

                    return (
                        <div
                            key={mainIndex}
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}
                        >
                            {assets.length > 0 && (
                                <p style={{padding: 8, color: '#000'}} className="type type--pos-xlarge-normal">
                                    {title}
                                </p>
                            )}
                            {assets.map((item, i) => {
                                const active = startIndex + i === cursor;

                                if (type === 'fill') {
                                    return <FillItem i={i} item={item} active={active} />;
                                }

                                if (type === 'stroke') {
                                    return <StrokeItem i={i} item={item} active={active} />;
                                }

                                if (type === 'text') {
                                    return <TextItem i={i} item={item} active={active} />;
                                }

                                if (type === 'effect') {
                                    return <GenericItem i={i} item={item} active={active} icon={<EffectIcon />} />;
                                }

                                if (type === 'grid') {
                                    return <GenericItem i={i} item={item} active={active} icon={<GridIcon />} />;
                                }
                            })}
                        </div>
                    );
                })}

            {error && (
                <div className="position--bottom visual-bell visual-bell--error">
                    <span style={{color: '#fff'}} className="visual-bell__msg">
                        {errorMsg}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ApplyList;
