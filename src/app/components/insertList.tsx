import * as React from 'react';
import '../styles/ui.css';

const InsertList = ({assets, value}) => {
    const {components} = assets;

    const filterStyles = style => {
        return style.filter(asset => asset.name.toLowerCase().includes(value.toLocaleLowerCase()));
    };

    const filteredColorStyles = filterStyles(components);

    const arr = [];

    // const allAssets = arr.concat(filteredColorStyles, filteredTextStyles, filteredEffectStyles, filteredGridStyles);

    // const isActive = () => {}; // denna kod gör mycket ;;;;~)

    // const assetTypes = {
    //     text: {
    //         title: 'Text styles',
    //         assets: filteredTextStyles,
    //         index: 0,
    //     },
    //     stroke: {
    //         title: 'Stroke styles',
    //         assets: filteredColorStyles,
    //         index: filteredTextStyles.length,
    //     },
    //     fill: {
    //         title: 'Fill styles',
    //         assets: filteredColorStyles,
    //         index: filteredColorStyles.length + filteredTextStyles.length,
    //     },
    //     effect: {
    //         title: 'Effect styles',
    //         assets: filteredEffectStyles,
    //         index: filteredColorStyles.length + filteredColorStyles.length + filteredTextStyles.length,
    //     },
    //     grid: {
    //         title: 'Grid styles',
    //         assets: filteredGridStyles,
    //         index:
    //             filteredEffectStyles.length +
    //             filteredColorStyles.length +
    //             filteredColorStyles.length +
    //             filteredTextStyles.length,
    //     },
    // };

    return (
        <div>
            {/* {Object.keys(assetTypes).map(assetType => {
                const {title, assets, index} = assetTypes[assetType];
                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        {assets.length > 0 && <p>{title}</p>}
                        {assets.map((item, i) => {
                            // const color = item.paints[0].color;

                            // const r = Math.floor(255 * color.r);
                            // const g = Math.floor(255 * color.g);
                            // const b = Math.floor(255 * color.b);
                            const selected = index + i === cursor;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        background: selected ? 'gray' : 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            // backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                            border: '1px solid #f6f6f6',
                                            marginRight: 16,
                                        }}
                                    />
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            })} */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>Components</p>
                {components.map((item, i) => {
                    return (
                        <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '1px solid #f6f6f6',
                                    marginRight: 16,
                                    fontSize: 16,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#7b61ff',
                                }}
                            >
                                ❖
                            </div>
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>
            {/* 
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {filteredColorStyles.length > 0 && <p>Fill Styles</p>}
                {filteredColorStyles.map((item, i) => {
                    const color = item.paints[0].color;

                    const r = Math.floor(255 * color.r);
                    const g = Math.floor(255 * color.g);
                    const b = Math.floor(255 * color.b);

                    return (
                        <div
                            key={i}
                            style={{
                                background: i === cursor ? 'gray' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
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
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {filteredColorStyles.length > 0 && <p>Border Styles</p>}
                {filteredColorStyles.map((item, i) => {
                    const color = item.paints[0].color;

                    const r = Math.floor(255 * color.r);
                    const g = Math.floor(255 * color.g);
                    const b = Math.floor(255 * color.b);

                    return (
                        <div
                            key={i}
                            style={{
                                background: i === cursor ? 'gray' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                    border: '1px solid #f6f6f6',
                                    marginRight: 16,
                                    fontSize: 16,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                }}
                            >
                                ●
                            </div>
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {filteredTextStyles.length > 0 && <p>Text Styles</p>}
                {filteredTextStyles.map((item, i) => {
                    const fontWeight = setFontWeight(item.fontName.style);

                    return (
                        <div
                            key={i}
                            style={{
                                background: i === cursor ? 'gray' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: `${item.fontName.family}, Inter`,
                                    fontWeight: fontWeight,
                                    fontSize: 14,
                                    marginRight: 8,
                                    padding: 0,
                                }}
                            >
                                Ag
                            </p>

                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {filteredEffectStyles.length > 0 && <p>Effect Styles</p>}
                {filteredEffectStyles.map((item, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                background: i === cursor ? 'gray' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                {filteredGridStyles.length > 0 && <p>Grid Styles</p>}
                {filteredGridStyles.map((item, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                background: i === cursor ? 'gray' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};

export default InsertList;
