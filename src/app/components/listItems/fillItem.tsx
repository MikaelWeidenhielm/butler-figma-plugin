import * as React from 'react';
import '../../styles/ui.css';
import ColorIcon from '../../icons/colorIcon';
import GradientIcon from '../../icons/gradientIcon';
import ImageIcon from '../../icons/imageIcon';

const FillItem = ({item, onMouseEnter, active, submit, i}) => {
    const paintLength = item.paints.length;

    //check how many paints there are
    const isSingle = paintLength === 1;

    //get the type if it's just one paint
    const type = isSingle && item.paints[0].type;

    // if it's single, check if it's a solid fill:
    const isSolid = type === 'SOLID';
    const fill = isSolid && isSingle && item.paints[0].color;

    //check if the color is transparent
    const isTransparent = item.paints[0].opacity !== 1;
    const opacity = isTransparent ? item.paints[0].opacity : 1;

    const r = isSolid && Math.floor(255 * fill.r);
    const g = isSolid && Math.floor(255 * fill.g);
    const b = isSolid && Math.floor(255 * fill.b);

    return (
        <div
            key={i}
            onMouseEnter={onMouseEnter}
            onClick={submit}
            style={{
                width: '100%',
                background: active ? 'rgba(24,145,251, 0.2)' : 'white',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                padding: 8,
            }}
        >
            {isSingle && type === 'SOLID' && (
                <div
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: isSolid && `rgba(${r}, ${g}, ${b}, ${opacity})`,
                        border: '1px solid #e5e5e5',
                        marginRight: 8,
                    }}
                ></div>
            )}
            {isSingle && type === 'IMAGE' && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        marginRight: 8,
                    }}
                >
                    <ImageIcon />
                </div>
            )}
            {isSingle && type.includes('GRADIENT') && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        marginRight: 8,
                    }}
                >
                    <GradientIcon />
                </div>
            )}
            {!isSingle && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 20,
                        height: 20,
                        marginRight: 8,
                    }}
                >
                    <ColorIcon />
                </div>
            )}
            <div className="type type--neg-medium-normal" style={{marginRight: 8}}>
                {item.name}
            </div>
            {!isSingle && (
                <div style={{color: '#858585', marginRight: 8}} className="type type--neg-small-normal">
                    Multiple colors
                </div>
            )}
            {isSingle && type === 'IMAGE' && (
                <div style={{color: '#858585', marginRight: 8}} className="type type--neg-small-normal">
                    Image
                </div>
            )}
            {isSingle && type.includes('GRADIENT') && (
                <div style={{color: '#858585', marginRight: 8}} className="type type--neg-small-normal">
                    Gradient
                </div>
            )}
            {item.description && (
                <div style={{color: '#858585', marginRight: 8}} className="type type--neg-small-normal">
                    |
                </div>
            )}
            {item.description && (
                <div style={{color: '#858585'}} className="type type--neg-small-normal">
                    {item.description}
                </div>
            )}
        </div>
    );
};

export default FillItem;
