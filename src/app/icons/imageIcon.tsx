import * as React from 'react';

const ImageIcon = props => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" stroke="#333333" />
            <path
                d="M2 15L5.58579 11.4142C6.36684 10.6332 7.63316 10.6332 8.41421 11.4142L10 13M15 18L10 13M10 13L12.5858 10.4142C13.3668 9.63316 14.6332 9.63317 15.4142 10.4142L18.5 13.5"
                stroke="#333333"
            />
            <circle cx="7.5" cy="6.5" r="2" stroke="#333333" />
        </svg>
    );
};

export default ImageIcon;
