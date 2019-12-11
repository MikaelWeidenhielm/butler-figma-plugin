import * as React from 'react';
import '../styles/ui.css';
import GenericItem from './listItems/genericItem';
import FrameIcon from '../icons/frameIcon';
import PageIcon from '../icons/pageIcon';
import VectorIcon from '../icons/vectorIcon';
import RectangleIcon from '../icons/rectangleIcon';
import ComponentIcon from '../icons/componentIcon';
import InstanceIcon from '../icons/instanceIcon';
import TextIcon from '../icons/textIcon';
import LineIcon from '../icons/lineIcon';
import GroupIcon from '../icons/groupIcon';
import PolygonIcon from '../icons/polygonIcon';
import EllipseIcon from '../icons/ellipseIcon';
import StarIcon from '../icons/starIcon';

const GoToList = ({assets, value, wrapper}) => {
    const [cursor, setCursor] = React.useState(0);
    // const [isHovering, setIsHovering] = React.useState(false);

    // const [scrollTop, setScrollTop] = React.useState(0);

    const {frames, pages} = assets;

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

        parent.postMessage({pluginMessage: {type: 'go-to-selected', payload: selected}}, '*');
    };

    const filterStyles = style => {
        return style.filter(asset => asset.name.toLowerCase().includes(value.toLocaleLowerCase()));
    };

    const filteredPages = filterStyles(pages);
    const filteredFrames = filterStyles(frames);

    const arr = [];

    const allAssets = arr.concat(filteredPages, filteredFrames);

    const assetTypes = [
        {
            title: 'Pages',
            type: 'page',
            assets: filteredPages,
        },
        {
            title: 'Frames',
            type: 'frame',
            assets: filteredFrames,
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

                            if (type === 'page') {
                                return (
                                    <GenericItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        icon={<PageIcon />}
                                    />
                                );
                            }

                            if (type === 'frame') {
                                const getIcon = () => {
                                    switch (item.type) {
                                        case 'FRAME':
                                            return <FrameIcon />;
                                        case 'COMPONENT':
                                            return <ComponentIcon />;
                                        case 'INSTANCE':
                                            return <InstanceIcon />;
                                        case 'GROUP':
                                            return <GroupIcon />;
                                        case 'RECTANGLE':
                                            return <RectangleIcon />;
                                        case 'POLYGON':
                                            return <PolygonIcon />;
                                        case 'ELLIPSE':
                                            return <EllipseIcon />;
                                        case 'STAR':
                                            return <StarIcon />;
                                        case 'TEXT':
                                            return <TextIcon />;
                                        case 'LINE':
                                            return <LineIcon />;
                                        case 'VECTOR':
                                            return <VectorIcon />;
                                        default:
                                            return <FrameIcon />;
                                    }
                                };

                                const icon = getIcon();

                                return (
                                    <GenericItem
                                        key={i}
                                        item={item}
                                        submit={() => handleSubmit()}
                                        active={active}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        icon={icon}
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

export default GoToList;
