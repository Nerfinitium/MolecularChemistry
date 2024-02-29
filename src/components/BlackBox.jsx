import React from 'react';

const BlackBox = ({ setCurrentIcon, setPlacingIcon, resetIcons}) => {
    const handleClick = (icon) => {
        setCurrentIcon(icon);
        setPlacingIcon(true);
    };

    return (
        <div style={{
            backgroundColor: 'black',
            width: '100%',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            border: '2px solid white'
        }}>
            <button style={{margin: '10px'}} onClick={() => handleClick('hidrojenes')}>Hidrojen</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('oxygenes')}>Oksijen</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('web')}>Carbon</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('web')}>Klor</button>
            <button style={{margin: '10px'}} onClick={resetIcons}>Reset</button>
        </div>
    );
};

export default BlackBox;