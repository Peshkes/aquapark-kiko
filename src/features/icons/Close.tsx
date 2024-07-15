import React from 'react';

type Props = {
    rotate: number
}
const Close = ({rotate}: Props) => {
    return (
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.3s ease' }}
        >
            <g id="Menu / Close_MD">
                <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#ffffff" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    );
};

export default Close;