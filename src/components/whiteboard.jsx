import React, { useState, useRef, useEffect } from 'react';
import BlackBox from './BlackBox';
import materials from './materials.json';
import Modal from 'react-modal';
import {ComputersCanvas} from "./canvas/index.js";


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


        //test
        /*
        if (hydrogenAtoms.length >= 1 && nitrogenAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return nitrogenAtoms.some(nitrogen => {
                    const distance = Math.sqrt(
                        Math.pow(hydrogen.x - nitrogen.x, 2) + Math.pow(hydrogen.y - nitrogen.y, 2)
                    );
                    return distance < 80;
                });
            });

            if (areConnected) {
                return 'test';
            }
        }

        */

        //Test
        if (hydrogenAtoms.length >= 3 && nitrogenAtoms.length >= 1) {
            const areConnected = hydrogenAtoms.some(hydrogen1 =>
                nitrogenAtoms.some(hydrogen2 =>
                    hydrogenAtoms.some(hydrogen3 => {
                        const distance1 = Math.sqrt(Math.pow(hydrogen1.x - nitrogenAtoms[0].x, 2) + Math.pow(hydrogen1.y - nitrogenAtoms[0].y, 2));
                        const distance2 = Math.sqrt(Math.pow(hydrogen2.x - nitrogenAtoms[0].x, 2) + Math.pow(hydrogen2.y - nitrogenAtoms[0].y, 2));
                        const distance3 = Math.sqrt(Math.pow(hydrogen3.x - nitrogenAtoms[0].x, 2) + Math.pow(hydrogen3.y - nitrogenAtoms[0].y, 2));

                        return distance1 < 80 && distance2 < 80 && distance3 < 80;
                    })
                )
            );

            if (areConnected) {
                return 'Ammonia';
            }
        }
        //bugged
        if (nitrogenAtoms.length >= 1 && carbonAtoms.length >= 1 && hydrogenAtoms.length >= 3) {
            const areConnected = nitrogenAtoms.some(nitrogen =>
                carbonAtoms.some(carbon =>
                    hydrogenAtoms.some(hydrogen1 =>
                        hydrogenAtoms.some(hydrogen2 =>
                            hydrogenAtoms.some(hydrogen3 => {
                                const distanceNC = Math.sqrt(Math.pow(nitrogen.x - carbon.x, 2) + Math.pow(nitrogen.y - carbon.y, 2));
                                const distanceNH1 = Math.sqrt(Math.pow(nitrogen.x - hydrogen1.x, 2) + Math.pow(nitrogen.y - hydrogen1.y, 2));
                                const distanceCH2 = Math.sqrt(Math.pow(carbon.x - hydrogen2.x, 2) + Math.pow(carbon.y - hydrogen2.y, 2));
                                const distanceCH3 = Math.sqrt(Math.pow(carbon.x - hydrogen3.x, 2) + Math.pow(carbon.y - hydrogen3.y, 2));

                                return distanceNC < 80 && distanceNH1 < 80 && distanceCH2 < 80 && distanceCH3 < 80;
                            })
                        )
                    )
                )
            );

            if (areConnected) {
                return 'Methyl Isocyanide';
            }
        }


        if (carbonAtoms.length >= 1 && oxygenAtoms.length >= 1 ) {
            const areConnected = carbonAtoms.some(carbon => {
                return oxygenAtoms.some(oxygen => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - oxygen.x, 2) + Math.pow(carbon.y - oxygen.y, 2)
                    );
                    return distance < 80;
                    })
});

            if (areConnected) {
                return 'Carbon Monoxide';
            }
        }



        if (nitrogenAtoms.length >= 1 && carbonAtoms.length >= 1 ) {
            const areConnected = nitrogenAtoms.some(nitrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(nitrogen.x - carbon.x, 2) + Math.pow(carbon.y - nitrogen.y, 2)
                    );
                    return distance < 80;
                })
            });

            if (areConnected) {
                return 'Siyanür';
            }
        }
        if (hydrogenAtoms.length >= 1 && chlorineAtoms.length >= 1 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return chlorineAtoms.some(chlorine => {
                    const distance = Math.sqrt(
                        Math.pow(chlorine.x - hydrogen.x, 2) + Math.pow(hydrogen.y - chlorine.y, 2)
                    );
                    return distance < 80;
                })
            });

            if (areConnected) {
                return 'Hidroklorik asit';
            }
        }
        if (nitrogenAtoms.length >= 1 && hydrogenAtoms.length >= 3 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return nitrogenAtoms.some(nitrogen => {
                    const distance = Math.sqrt(
                        Math.pow(nitrogen.x - hydrogen.x, 2) + Math.pow(hydrogen.y - nitrogen.y, 2)
                    );
                    return distance < 80;
                })
            });
            if (areConnected) {
                return 'Amonyak';
            }
        }
        if (nitrogenAtoms.length >= 2 && hydrogenAtoms.length >= 4 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return nitrogenAtoms.some(nitrogen => {
                    const distance = Math.sqrt(
                        Math.pow(nitrogen.x - hydrogen.x, 2) + Math.pow(hydrogen.y - nitrogen.y, 2)
                    );
                    return distance < 80;
                })
            });

            if (areConnected) {
                return 'Hidrozin';
            }
        }
        if (carbonAtoms.length >= 2 && hydrogenAtoms.length >= 6 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(hydrogen.y - carbon.y, 2)
                    );
                    return distance < 80;
                })
            });
            if (areConnected) {
                return 'Etan';
            }
        }
        if (carbonAtoms.length >= 2 && hydrogenAtoms.length >= 4 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(hydrogen.y - carbon.y, 2)
                    );
                    return distance < 80;
                })
            });
            if (areConnected) {
                return 'Etilen';
            }
        }
        if (carbonAtoms.length >= 2 && hydrogenAtoms.length >= 2 ) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(hydrogen.y - carbon.y, 2)
                    );
                    return distance < 80;
                })
            });
            if (areConnected) {
                return 'Asetilen';
            }
        }

        if (nitrogenAtoms.length >= 1 && oxygenAtoms.length >= 2) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return nitrogenAtoms.some(nitrogen => {
                    const distance = Math.sqrt(
                        Math.pow(nitrogen.x - hydrogen.x, 2) + Math.pow(hydrogen.y - nitrogen.y, 2)
                    );
                    return distance < 80;
                })
            });
            if (areConnected) {
                return 'Nitrogen Dioxide';
            }
        }
        if (carbonAtoms.length >= 1 && oxygenAtoms.length >= 2) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(hydrogen.y - carbon.y, 2)
                    );
                    return distance < 80;
                })
            });

            if (areConnected) {
                return 'Carbon Dioxide';
            }
        }
        if (carbonAtoms.length >= 1 && hydrogenAtoms.length >= 4) {
            const areConnected = hydrogenAtoms.some(hydrogen => {
                return carbonAtoms.some(carbon => {
                    const distance = Math.sqrt(
                        Math.pow(carbon.x - hydrogen.x, 2) + Math.pow(hydrogen.y - carbon.y, 2)
                    );
                    return distance < 80;
                })
            });

            if (areConnected) {
                return 'Metan';
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

                        for (let otherIcon of icons) {
                            if (otherIcon.id !== icon.id) {
                                const dx = otherIcon.x - newX;
                                const dy = otherIcon.y - newY;
                                const distance = Math.sqrt(dx * dx + dy * dy);

                                if (distance < 72) {
                                    if (Math.abs(dx) > Math.abs(dy)) {
                                        if (dx > 0) {
                                            return {...icon, x: otherIcon.x - 72, y: otherIcon.y};
                                        } else {
                                            return {...icon, x: otherIcon.x + 72, y: otherIcon.y};
                                        }
                                    } else {
                                        if (dy > 0) {
                                            return {...icon, x: otherIcon.x, y: otherIcon.y - 72};
                                        } else {
                                            return {...icon, x: otherIcon.x, y: otherIcon.y + 72};
                                        }
                                    }
                                }
                            }
                        }

                        return {...icon, x: newX, y: newY};
                    }

                    return icon;
                });
                const newMolecule = checkMolecule(updatedIcons);
                console.log('New molecule:', newMolecule);
                console.log('Updated icons:', updatedIcons);

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

            <BlackBox setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} resetIcons={resetIcons} />

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
                        background: 'black',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        color: 'white',
                    },
                }}
            >
                {moleculeDetails === 'Water' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                        <ComputersCanvas />
                    </>
                )}
                {moleculeDetails === 'test' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Ammonia' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Methyl Isocyanide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Carbon Monoxide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Siyanür' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}

                {moleculeDetails === 'Hidroklorik asit' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}

                {moleculeDetails === 'Etan' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Asetilen' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Nitrogen Dioxide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}

                {moleculeDetails === 'Carbon Dioxide' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}
                {moleculeDetails === 'Metan' && (
                    <>
                        <h2 style={{ fontSize: '24px' }}>{moleculeDetails}</h2>
                    </>
                )}

                <button onClick={handleCloseModal}>Close</button>
            </Modal>

            <BlackBox handleShowModal={handleShowModal} setCurrentIcon={setCurrentIcon} setDragging={setDragging} setPlacingIcon={setPlacingIcon} resetIcons={resetIcons} />
        </div>
    );
}
    export default WhiteBoard;