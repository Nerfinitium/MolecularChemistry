import React, { useState, useRef, useEffect } from 'react';
import BlackBox from './BlackBox';
import materials from './materials.json';
import Modal from 'react-modal';


const WhiteBoard = () => {
    const [icons, setIcons] = useState([]);
    const [currentIcon, setCurrentIcon] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [placingIcon, setPlacingIcon] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
    const iconRefs = useRef([]);


    const [molecule, setMolecule] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkMolecule = (icons) => {
          const hydrogenAtoms = icons.filter(icon => icon.icon === 'H');
        const oxygenAtoms = icons.filter(icon => icon.icon === 'O');
        const nitrogenAtoms = icons.filter(icon => icon.icon === 'N');
        const carbonAtoms = icons.filter(icon => icon.icon === 'C');
        const chlorineAtoms = icons.filter(icon => icon.icon === 'Cl');


        if (hydrogenAtoms.length >= 2 && oxygenAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return oxygenAtoms.some(oxygen => {
                    const distance = Math.sqrt(
                        Math.pow(hydrogen.x - oxygen.x, 2) + Math.pow(hydrogen.y - oxygen.y, 2)
                    );
                    return distance < 80;
                });
            });

            if (areConnected) {
                return 'Water';
            }
        }

        if (hydrogenAtoms.length >= 3 && nitrogenAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Ammonia';
            }
        }

        if (nitrogenAtoms.length >= 1 && carbonAtoms.length >= 1 && hydrogenAtoms.length >= 1) {
            const areConnected = nitrogenAtoms.some(nitrogen => {
                return carbonAtoms.some(carbon => {
                    return hydrogenAtoms.some(hydrogen => {
                        const distance1 = Math.sqrt(
                            Math.pow(nitrogen.x - carbon.x, 2) + Math.pow(nitrogen.y - carbon.y, 2)
                        );
                        const distance2 = Math.sqrt(
                            Math.pow(nitrogen.x - hydrogen.x, 2) + Math.pow(nitrogen.y - hydrogen.y, 2)
                        );
                        const distance3 = Math.sqrt(
                            Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(carbon.y - hydrogen.y, 2)
                        );
                        return distance1 < 80 && distance2 < 80 && distance3 < 80;
                    });
                });
            });

            if (areConnected) {
                return 'Methyl Isocyanide';
            }
        }
        if (carbonAtoms >= 2 && nitrogenAtoms.length >= 2) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Cyanogen';
            }
        }
        if (nitrogenAtoms.length >= 1 && oxygenAtoms.length >= 2) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Nitrogen Dioxide';
            }
        }
        if (nitrogenAtoms.length >= 1 && chlorineAtoms.length >= 3) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Nitrogen Trichloride';
            }
        }
        if (carbonAtoms.length >= 1 && oxygenAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Carbon monoxide';
            }
        }
        if (oxygenAtoms.length >= 1 && chlorineAtoms.length >= 2) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Oxygen difuirode';
            }
        }

        if (carbonAtoms.length >= 1 && chlorineAtoms.length >= 4) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'carbon tetrachlorine';
            }
        }
        if (carbonAtoms.length >= 1 && hydrogenAtoms.length >= 4) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Methane';
            }
        }
        if (hydrogenAtoms.length >= 1 && chlorineAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Hyrogen chloride';
            }
        }
        if (hydrogenAtoms.length >= 1 && oxygenAtoms.length >= 1 && carbonAtoms.length >= 1 && nitrogenAtoms >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Cyannic acid';
            }
        }

        if (carbonAtoms.length >= 10 && hydrogenAtoms.length >= 15 && nitrogenAtoms.length >=  1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 => {
                return hydrogenAtoms.some(hydrogen2 => {
                    return hydrogenAtoms.some(hydrogen3 => {
                        return nitrogenAtoms.some(nitrogen => {
                            const distance1 = Math.sqrt(
                                Math.pow(hydrogen1.x - nitrogen.x, 2) + Math.pow(hydrogen1.y - nitrogen.y, 2)
                            );
                            const distance2 = Math.sqrt(
                                Math.pow(hydrogen2.x - nitrogen.x, 2) + Math.pow(hydrogen2.y - nitrogen.y, 2)
                            );
                            const distance3 = Math.sqrt(
                                Math.pow(hydrogen3.x - nitrogen.x, 2) + Math.pow(hydrogen3.y - nitrogen.y, 2)
                            );
                            return distance1 < 80 && distance2 < 80 && distance3 < 80;
                        });
                    });
                });
            });

            if (areConnected) {
                return 'Methan Fethamine';
            }
        }












        return null;
    };

    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const moleculeDetails = checkMolecule(icons);





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
            setIcons(prevIcons => {
                const updatedIcons = prevIcons.map(icon => {
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
                                            return {...icon, x: otherIcon.x - 72, y: otherIcon.y};
                                        } else {
                                            // Other atom is to the left
                                            return {...icon, x: otherIcon.x + 72, y: otherIcon.y};
                                        }
                                    } else {
                                        // Collision is more vertical than horizontal
                                        if (dy > 0) {
                                            // Other atom is below
                                            return {...icon, x: otherIcon.x, y: otherIcon.y - 72};
                                        } else {
                                            // Other atom is above
                                            return {...icon, x: otherIcon.x, y: otherIcon.y + 72};
                                        }
                                    }
                                }
                            }
                        }

                        // No collision, move the atom normally
                        return {...icon, x: newX, y: newY};
                    }

                    return icon;
                });
                const newMolecule = checkMolecule(updatedIcons);
                console.log('New molecule:', newMolecule); // Add this line
                console.log('Updated icons:', updatedIcons); // Add this line

                setMolecule(newMolecule);

                return updatedIcons;
            });
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

            {/* First BlackBox component */}
            <BlackBox setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} resetIcons={resetIcons} />

            {/* Button to show molecule details */}
            <button onClick={handleShowModal} style={{ position: 'absolute', right: 10, top: 10, backgroundColor: 'white', padding: '5px 10px', borderRadius: '5px' }}>Show Molecule</button>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    },
                    content: {
                        background: 'darkgray', // Set the background color
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        color: 'white', // Set the text color
                    },
                }}
            >
                {moleculeDetails === 'Water' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the water molecule representation */}
                        <img src="path/to/water-molecule.png" alt="Water Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}

                {moleculeDetails === 'Ammonia' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the ammonia molecule representation */}
                        <img src="path/to/ammonia-molecule.png" alt="Ammonia Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}

                {moleculeDetails === 'Methyl Isocyanide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}

                {moleculeDetails === 'Cyanogen' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Nitrogen Dioxide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Carbon monoxide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Oxygen difuirode' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Methane' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}

                {moleculeDetails === 'Hyrogen chloride' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Cyannic acid' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}
                {moleculeDetails === 'Methan Fethamine' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        {/* Adjust the size of the methyl isocyanide molecule representation */}
                        <img src="path/to/methyl-isocyanide-molecule.png" alt="Methyl Isocyanide Molecule" style={{ width: '120px', height: '120px' }} />
                    </>
                )}

                {/* Additional details or content can go here */}
                <button onClick={handleCloseModal}>Close</button>
            </Modal>




            {/* Second BlackBox component */}
            <BlackBox handleShowModal={handleShowModal} setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} resetIcons={resetIcons} />
        </div>
    );
}


    export default WhiteBoard;