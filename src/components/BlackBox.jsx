import React from 'react';

const BlackBox = ({handleShowModal, setCurrentIcon, setPlacingIcon, resetIcons}) => {
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
            <button style={{margin: '10px'}} onClick={() => handleClick('H')}>Hidrojen</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('O')}>Oksijen</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('C')}>Karbon</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('N')}>Azot</button>
            <button style={{margin: '10px'}} onClick={() => handleClick('Cl')}>Klor</button>
            <button style={{margin: '10px'}} onClick={resetIcons}>Reset</button>
            <button style={{margin: '10px'}} onClick={handleShowModal}>Show Molecule</button>
        </div>
        //
    );
};

export default BlackBox;