import * as React from 'react';
import '../styles/ui.css';

const ApplyList = ({assets}) => {
    const {colorStyles, textStyles, components, effectStyles, gridStyles} = assets;

    const setFontWeight = fontWeight => {
        switch (fontWeight.toLowerCase()) {
            case 'ultralight':
            case 'ultra light':
            case 'extra light':
            case 'ultralight beta':
            case 'ultra light beta':
            case 'extra light beta':
            case 'thin':
                return 100;
            case 'light':
                return 300;
            case 'regular':
            case 'normal':
                return 400;
            case 'medium':
                return 500;
            case 'semi bold':
            case 'semibold':
            case 'demibold':
            case 'demi bold':
                return 600;
            case 'bold':
                return 700;
            case 'heavy':
            case 'extra bold':
                return 800;
            case 'black':
            case 'ultra bold':
                return 900;
            default:
                return 400;
        }
    };

    return (
        <div>
            {console.log(assets)}
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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>Fill Styles</p>
                {colorStyles.map((item, i) => {
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
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>Border Styles</p>
                {colorStyles.map((item, i) => {
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
                <p>Text Styles</p>
                {textStyles.map((item, i) => {
                    const fontWeight = setFontWeight(item.fontName.style);

                    return (
                        <div key={i} style={{display: 'flex', alignItems: 'center'}}>
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
                <p>Effect Styles</p>
                {effectStyles.map((item, i) => {
                    return (
                        <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>Grid Styles</p>
                {gridStyles.map((item, i) => {
                    console.log(item);
                    return (
                        <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ApplyList;
