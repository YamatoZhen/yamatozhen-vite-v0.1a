// LightboxGallery.tsx
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GridContainer } from '../../thumbnail/Thumbnail';
import './LightboxGallery.css';
import Button from '../../button/Button';
import { Icon } from '../../navigation_rail/NavigationRail';


const sampleItems = [
    { title: 'Item 1',
      description: 'A very cool thing', 
      imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3142bdda-d51f-4527-b457-9eb705a5f125/dg4b27v-70a0e48e-b135-4068-ba7e-2b9b1943e9f6.jpg/v1/fill/w_1920,h_2400,q_75,strp/_zblxt9__by_lazyskel_ai_dg4b27v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxNDJiZGRhLWQ1MWYtNDUyNy1iNDU3LTllYjcwNWE1ZjEyNVwvZGc0YjI3di03MGEwZTQ4ZS1iMTM1LTQwNjgtYmE3ZS0yYjliMTk0M2U5ZjYuanBnIiwiaGVpZ2h0IjoiPD0yNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMzE0MmJkZGEtZDUxZi00NTI3LWI0NTctOWViNzA1YTVmMTI1XC9sYXp5c2tlbC1haS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.40ndgn6CS4nsb1yV0zM_yO9dhRnDYniDKYzZ1tCZAxc" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/044/114/861/large/yamato-zhen-asset.jpg?1639125850" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdna.artstation.com/p/assets/images/images/044/115/122/large/yamato-zhen-asset.jpg?1639126574" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/049/734/287/large/yamato-zhen-asset.jpg?1653207221" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdna.artstation.com/p/assets/images/images/044/205/618/large/yamato-zhen-asset.jpg?1639390041" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/044/115/185/large/yamato-zhen-asset.jpg?1639126707" 
    },

    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/048/281/783/large/yamato-zhen-asset.jpg?1649673495" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/059/903/501/large/yamato-zhen-export-2.jpg?1677411575" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdna.artstation.com/p/assets/images/images/044/115/274/large/yamato-zhen-asset.jpg?1639126901" 
    },
    { title: 'Item 2', 
      description: 'An even cooler thing', 
      imageUrl: "https://cdnb.artstation.com/p/assets/images/images/076/274/081/large/yamato-zhen-asset.jpg?1716580396" 
    },

];

export default function LightboxGallery() {
    const [items] = useState(sampleItems);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (activeIndex === null) return;
        if (e.key === 'Escape') setActiveIndex(null);
        if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
        if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    }, [activeIndex, items.length]);

    useEffect(() => {
        document.body.style.overflow = activeIndex !== null ? 'hidden' : 'auto';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [activeIndex, handleKeyDown]);

    return (
        <>
            <section className="home-section">
                <GridContainer setRows="auto" setColumns={4}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="lightbox-thumb"
                            style={{ overflow: "hidden" }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveIndex(i)}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '16px',
                                    objectFit: 'cover',
                                    clipPath: 'inset(0% 0% 0% 0%)'
                                }}
                            />
                        </motion.div>
                    ))}
                </GridContainer>
            </section>
            <AnimatePresence>
                {activeIndex !== null && (
                    <>
                        <motion.div
                            className="lightbox-overlay"
                            style={{
                                position: "fixed",
                                zIndex: "9999",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "110dvw",
                                height: "110dvh",
                                left: "-5dvw",
                                top: "-5dvh",
                            }}
                            initial={{ opacity: 0 , backdropFilter: "blur(0)"}}
                            animate={{ opacity: 1 , backdropFilter: "blur(34px)" }}
                            exit={{ opacity: 0 , backdropFilter: "blur(0)"}}
                            transition={{ duration: 0.5, ease: [0.55, 0.75, 0.15, 1.87] }}
                            onClick={() => setActiveIndex(null)}
                        />

                        <motion.div
                            className="lightbox-expanded"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            style={{
                                position: "fixed",
                                zIndex: "9999",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "80%",
                                height: "68%",
                                gap: 24,
                                left: "10%",
                                top: "calc(16% + 38px)"

                            }}
                        > <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 'auto',
                                maxHeight: '100%',
                                borderRadius: 26,
                            }}>
                                <img style={{
                                    width: 'auto',
                                    height: '100%',
                                    maxHeight: 564,
                                    minHeight: 564,
                                    borderRadius: '26px 0 0 26px',
                                }}
                                    className='elevated'
                                    src={items[activeIndex].imageUrl}
                                    alt={items[activeIndex].title}
                                />
                                <div
                                    className='elevated content-wrapper'
                                    style={{
                                        minWidth: "364px",
                                        width: "100%",
                                        height: "100%",
                                        minHeight: 564,
                                        maxHeight: 564,
                                        borderRadius: '0 26px 26px 0',
                                        backgroundColor: "var(--md-sys-color-surface-container-lowest)"
                                    }}>
                                    <h2>{items[activeIndex].title}</h2>
                                    <p>{items[activeIndex].description}</p>
                                </div>
                            </div>
                            <div 
                                className="lightbox-nav"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Button 
                                    onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                                    type='filled-alt elevated icon group' id={'navBtn'}
                                    >
                                        <Icon iconName='keyboard_arrow_left'/>
                                </Button>
                                <Button 
                                    onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                                    type='filled-alt elevated label-icon group' 
                                    id={'navBtn'}
                                    >
                                        <Icon label='Next' iconName='keyboard_arrow_right'/>
                                </Button>
                                <Button 
                                    onClick={() => setActiveIndex(null)}
                                    type='filled-alt elevated icon group' id={'navBtn'}
                                    >
                                        <Icon iconName='close'/>
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
