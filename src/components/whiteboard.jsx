import React, { useState, useRef, useEffect } from 'react';
import BlackBox from './BlackBox';

const WhiteBoard = () => {
    const [icons, setIcons] = useState([]);
    const [currentIcon, setCurrentIcon] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [placingIcon, setPlacingIcon] = useState(false);
    const iconRefs = useRef([]);

    useEffect(() => {
        iconRefs.current = iconRefs.current.slice(0, icons.length);
    }, [icons]);

    const handleMouseDown = (e) => {
        const iconUnderMouse = icons.find((icon, index) => {
            const rect = iconRefs.current[index].getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        });

        if (iconUnderMouse) {
            setCurrentIcon(iconUnderMouse.icon);
            setDragging(true);
        } else if (currentIcon && placingIcon) {
            const newIcon = { x: e.clientX - 16, y: e.clientY - 16, icon: currentIcon };
            setIcons(prevIcons => [...prevIcons, newIcon]);
            setCurrentIcon(null);
            setPlacingIcon(false);
        }
    };
    const handleMouseMove = (e) => {
        if (dragging && currentIcon) {
            setIcons(icons.map(icon => {
                if (icon.icon === currentIcon) {
                    return { ...icon, x: e.clientX - 16, y: e.clientY - 16 }; // subtract half the width and height of the icon
                }
                return icon;
            }));
        }
    };


    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div style={{ backgroundColor: 'white', width: '100%', height: '500px', position: 'relative' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {icons.map((icon, index) => (
                <div key={index} style={{ position: 'absolute', top: icon.y, left: icon.x, userSelect: 'none' }} ref={el => iconRefs.current[index] = el}>
                    <button style={{ background: 'none', border: 'none' }}>
                        <img src={`src/assets/${icon.icon}.png`} alt="icon" style={{ width: '32px', height: '32px' }} />
                    </button>
                </div>
            ))}
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <BlackBox setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} />
            </div>
        </div>
    );
};

export default WhiteBoard;