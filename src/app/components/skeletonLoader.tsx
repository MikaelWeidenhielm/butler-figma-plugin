import * as React from 'react';
import '../styles/ui.css';

const SkeletonLoader = () => {
    return (
        <div style={{position: 'fixed', width: '100%', background: '#fff'}}>
            <div style={{display: 'flex', alignItems: 'center', padding: 8}}>
                <button className="button--skeleton" style={{marginRight: 8}} />
                <input className="input-skeleton" />
            </div>
            <div
                style={{
                    paddingLeft: 16,
                    paddingRight: 12,
                    paddingBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f1f1f1',
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p
                        className="type type--pos-small-normal"
                        style={{
                            margin: 0,
                            marginRight: 8,
                            background: '#f1f1f1',
                            padding: '2px 8px',
                            width: 32,
                            height: 16,
                            borderRadius: 4,
                        }}
                    ></p>
                    <p
                        className="type type--pos-small-normal"
                        style={{
                            margin: 0,
                            marginRight: 8,
                            background: '#f1f1f1',
                            padding: '2px 8px',
                            width: 32,
                            height: 16,
                            borderRadius: 4,
                        }}
                    ></p>
                    <p
                        className="type type--pos-small-normal"
                        style={{
                            margin: 0,
                            marginRight: 8,
                            background: '#f1f1f1',
                            padding: '2px 8px',
                            width: 32,
                            height: 16,
                            borderRadius: 4,
                        }}
                    ></p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p
                        className="type type--pos-small-bold"
                        style={{
                            margin: 0,
                            background: '#f1f1f1',
                            width: 200,
                            height: 16,
                            borderRadius: 4,
                        }}
                    ></p>
                </div>
            </div>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
