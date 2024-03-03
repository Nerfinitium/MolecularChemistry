import React, { useState, useRef, useEffect } from 'react';
import BlackBox from './BlackBox';
import materials from './materials.json';

const WhiteBoard = () => {
    const [icons, setIcons] = useState([]);
    const [currentIcon, setCurrentIcon] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [placingIcon, setPlacingIcon] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
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
            setCurrentIcon(iconUnderMouse.id);
            setDragging(true);
        } else if (currentIcon && placingIcon) {
            const elementData = materials.elements.find(element => element.symbol === currentIcon);
            const newIcon = {
                x: e.clientX - 16,
                y: e.clientY - 16,
                icon: currentIcon,
                id: idCounter,
                type: elementData.name,
                possibleBonds: elementData.possible_bonds.map(bond => bond.element)
            };
            setIcons(prevIcons => [...prevIcons, newIcon]);
            setCurrentIcon(null);
            setPlacingIcon(false);
            setIdCounter(idCounter + 1);
        }
    };
    const handleMouseMove = (e) => {
        if (dragging && currentIcon) {
            setIcons(icons.map(icon => {
                if (icon.id === currentIcon) {
                    const newX = e.clientX - 16;
                    const newY = e.clientY - 16;

                    // Check for collision with other atoms
                    for (let otherIcon of icons) {
                        if (otherIcon.id !== icon.id) {
                            const dx = otherIcon.x - newX;
                            const dy = otherIcon.y - newY;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 72) { // assuming the atom size is 32
                                // Atoms are overlapping, make them stick together
                                if (Math.abs(dx) > Math.abs(dy)) {
                                    // Collision is more horizontal than vertical
                                    if (dx > 0) {
                                        // Other atom is to the right
                                        return { ...icon, x: otherIcon.x - 72, y: otherIcon.y };
                                    } else {
                                        // Other atom is to the left
                                        return { ...icon, x: otherIcon.x + 72, y: otherIcon.y };
                                    }
                                } else {
                                    // Collision is more vertical than horizontal
                                    if (dy > 0) {
                                        // Other atom is below
                                        return { ...icon, x: otherIcon.x, y: otherIcon.y - 72 };
                                    } else {
                                        // Other atom is above
                                        return { ...icon, x: otherIcon.x, y: otherIcon.y + 72 };
                                    }
                                }
                            }
                        }
                    }

                    // No collision, move the atom normally
                    return { ...icon, x: newX, y: newY };
                }
                return icon;
            }));
        }
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    const resetIcons = () => {
        setIcons([]);
    };


    return (
        <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', position: 'relative' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {icons.map((icon, index) => (
                <div key={icon.id} style={{ position: 'absolute', top: icon.y, left: icon.x, userSelect: 'none' }} ref={el => iconRefs.current[index] = el}>
                    <button style={{ background: 'none', border: 'none' }}>
                        <img src={`src/assets/${icon.icon}.png`} alt="icon" style={{ width: '72px', height: '72px' }} />
                    </button>
                </div>
            ))}
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <BlackBox setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} resetIcons={resetIcons} />
            </div>
        </div>
    );
};

export default WhiteBoard;