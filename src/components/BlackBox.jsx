import React from 'react';

const BlackBox = ({ setCurrentIcon, setPlacingIcon }) => {
    const handleClick = (icon) => {
        setCurrentIcon(icon);
        setPlacingIcon(true);
    };

    return (
        <div style={{ backgroundColor: 'black', width: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', border: '2px solid white' }}>
            <button style={{ margin: '10px' }} onClick={() => handleClick('web')}>Button 1</button>
            <button style={{ margin: '10px' }} onClick={() => handleClick('web')}>Button 2</button>
            <button style={{ margin: '10px' }} onClick={() => handleClick('web')}>Button 3</button>
        </div>
    );
};

export default BlackBox;