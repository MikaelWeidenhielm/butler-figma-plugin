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
    const [scrollTop, setScrollTop] = React.useState(0);

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

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

    // const filterStyles = style => {
    //     return style.filter(asset => asset.name.toLowerCase().includes(value.toLocaleLowerCase()));
    // };

    function filterStyles(q, style) {
        function escapeRegExp(s) {
            return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        const words = q
            .split(/\s+/g)
            .map(s => s.trim())
            .filter(s => !!s);
        const hasTrailingSpace = q.endsWith(' ');
        const searchRegex = new RegExp(
            words
                .map((word, i) => {
                    if (i + 1 === words.length && !hasTrailingSpace) {
                        // The last word - ok with the word being "startswith"-like
                        return `(?=.*\\b${escapeRegExp(word)})`;
                    } else {
                        // Not the last word - expect the whole word exactly
                        return `(?=.*\\b${escapeRegExp(word)}\\b)`;
                    }
                })
                .join('') + '.+',
            'gi'
        );
        return style.filter(item => {
            return searchRegex.test(item.name);
        });
    }

    const filteredFillStyles = filterStyles(value, fillStyles);
    const filteredStrokeStyles = filterStyles(value, strokeStyles);
    const filteredTextStyles = filterStyles(value, textStyles);
    const filteredEffectStyles = filterStyles(value, effectStyles);
    const filteredGridStyles = filterStyles(value, gridStyles);

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
                            <p style={{padding: 8, color: '#858585'}} className="type type--pos-xlarge-normal">
                                {title}
                            </p>
                        )}
                        {assets.map((item, i) => {
                            const active = startIndex + i === cursor;

                            if (type === 'fill') {
                                return <FillItem key={i} item={item} active={active} />;
                            }

                            if (type === 'stroke') {
                                return <StrokeItem key={i} item={item} active={active} />;
                            }

                            if (type === 'text') {
                                return <TextItem key={i} item={item} active={active} />;
                            }

                            if (type === 'effect') {
                                return <GenericItem key={i} item={item} active={active} icon={<EffectIcon />} />;
                            }

                            if (type === 'grid') {
                                return <GenericItem key={i} item={item} active={active} icon={<GridIcon />} />;
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
