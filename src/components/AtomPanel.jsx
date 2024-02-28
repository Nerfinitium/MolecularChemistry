// eslint-disable-next-line no-unused-vars
import React from 'react';

const AtomPanel = ({ atoms }) => {
    return (
        <div className="atom-panel">
            {atoms.map((atom, index) => (
                <div key={index} className="atom">
                    <img src={atom.image} alt={atom.name} />
                    <p>{atom.name}</p>
                </div>
            ))}
        </div>
    );
};

export default AtomPanel;