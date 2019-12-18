import * as React from 'react';
import '../styles/ui.css';

const SettingsPage = () => (
    <div style={{display: 'flex', flexDirection: 'column', padding: 8, width: '100%', overflow: 'auto'}}>
        <div className="checkbox">
            <input className="checkbox__box" type="checkbox" />
            <label className="checkbox__label">Label</label>
        </div>
    </div>
);

export default SettingsPage;
