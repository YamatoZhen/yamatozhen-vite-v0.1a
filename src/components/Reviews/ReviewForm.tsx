import { useState } from 'react';
import './ReviewCSS.css'
import '../button/Button'
import Stepper, { Step } from '../react-bits/Stepper/Stepper';
import GradientText from '../react-bits/GradientText/GradientText';
import FAB from '../FAB/FAB';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../navigation_rail/NavigationRail';

export default function ReviewForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const MAX_CHARS = 200;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log({ name, rating, comment });

        const reviewData = {
            name,
            rating: Number(rating),
            comment,
        };

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const result = await response.json();
            console.log('Review submitted:', result);

            setName('');
            setComment('');
            setRating('');
            setIsOpen(false); //close the window and reset all states

            window.dispatchEvent(new Event('review-submitted'));

        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (<>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ right: "14px", bottom: "14px", position: "fixed", zIndex: "9999" }}
        >
            <FAB
                id={'setOpen-btn'}
                iconName={'favorite'}
                className={`review-fab ${isOpen === true && 'opened'}`}
                onClick={() => setIsOpen(true)}
            />
        </motion.div>
        <AnimatePresence>
            {isOpen && (
                <><motion.div
                    className='bg'
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
                    initial={{ opacity: 0, scale: 0.9, }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.55, 0.75, 0.15, 1.87] }}
                >
                        <Stepper
                            initialStep={1}
                            onStepChange={(step) => {
                                console.log(step);
                            } }
                            onFinalStepCompleted={() => { setIsOpen(false); handleSubmit({ preventDefault: () => { } } as React.FormEvent); } }
                            backButtonText="Previous"
                            nextButtonText="Next"
                            lastNextButtonIcon="send"
                            lastNextButtonText="Submit"
                        >
                            <Step>
                                <h2 style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>Share your <GradientText animationSpeed={6} showBorder={false}>Experience!</GradientText></h2>
                            </Step>
                            <Step>
                                <label htmlFor="name">
                                    <h2>Tell us your name!</h2>
                                    <input value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                            </Step>
                            <Step>
                                <h2>How would you rate our services?</h2>
                                <div className="star-rating" style={{ scale: 1.2, display: 'flex', gap: '4px', margin: '8px 0' }}>
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <span
                                            key={r}
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '2rem',
                                                color: r <= Number(rating) ? '#FFD600' : '#CCC',
                                                transition: 'color 0.2s',
                                                padding: '0 4px',
                                                userSelect: 'none', // Prevent text selection
                                                display: 'inline-flex',
                                                alignItems: 'center'
                                            }}
                                            onClick={() => setRating(String(r))}
                                            aria-label={`${r} star${r > 1 ? 's' : ''}`}
                                        >
                                            <Icon className={`review-star ${r <= Number(rating) ? 'active' : ''}`} iconName='star_rate' label='' />
                                        </span>
                                    ))}
                                </div>
                            </Step>
                            <Step>
                                <label htmlFor="comment">
                                    <textarea
                                        className='comment-area'
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        maxLength={MAX_CHARS}
                                        style={{ padding: '16px' }} />
                                    <div className="char-count" style={{ fontSize: '16px' }}>
                                        {MAX_CHARS - comment.length} characters left
                                    </div>
                                </label>
                            </Step>
                        </Stepper>
                    </motion.div></>
            )}
        </AnimatePresence>
    </>);
};