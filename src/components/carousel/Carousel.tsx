import './carousel.css';
import { useEffect, useState, useRef } from "react";
import MaskableFragment from "./MaskableFragment";
import Button from '../button/Button';
import { Icon } from '../navigation_rail/NavigationRail';

const f2 = (x: number) => (16 * Math.exp(4 * x)) / Math.pow(1 + Math.exp(16 * x), 2);
const widthFunction = (w: number) => Math.floor(f2((w / 400) - 2.4) * 400);

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

function Carousel(props: { urls?: string[], supportSnap?: boolean }) {
    const { urls = [] } = props;

    const minScroll = 900;
    const maxScroll = urls.length * 110 + 750;

    const [scroll, setScroll] = useState(minScroll);
    const [heroElement, setHeroElement] = useState(0);
    const [, setCurrentSnapPosition] = useState(minScroll);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [wData, setWData] = useState(urls.map(() => 0));
    const [mouseDown, setMouseDown] = useState(false);
    const [direction, setDirection] = useState(0);
    const [didScroll, setDidScroll] = useState(false);

    const startX = useRef(0);
    // let currentSnapPosition = 0; // Removed duplicate declaration

    // Helper to update scroll, clamping to min/max
    const updateScroll = (s: number) => {
        setScroll(Math.max(minScroll, Math.min(maxScroll, s)));
    };

    // --- Horizontal Scroll Logic Adjustments ---
    const onScrollListener = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!mouseDown) return;
        setDidScroll(true);
        updateScroll(scroll - (e.movementX || 0));
    };

    const onWheelListener = (e: React.WheelEvent<HTMLDivElement>) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            setDidScroll(true);
            updateScroll(scroll + e.deltaX);
            releaseScrollState();
            e.preventDefault(); // Prevent page scroll only for horizontal
        }
        // If vertical scroll is greater, do nothing and let the page scroll
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        startX.current = touch.clientX;
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        const x = touch.clientX;
        const deltaX = x - startX.current;
        updateScroll(scroll - deltaX);
        startX.current = x;
    };

    // Snap to nearest after mouse/touch
    const snapToNearest = () => {
        const nearestIndex = Math.round((scroll - minScroll) / 111);
        const targetSnapPos = nearestIndex * 111 + minScroll;
        setHeroElement(nearestIndex);
        setCurrentSnapPosition(targetSnapPos);
        snapToPosition(scroll - targetSnapPos, true); // <-- animate!
    };

    // Animate scroll for arrows/keyboard
    const snapToPosition = (deltaX: number, _p0: boolean) => {
        if (deltaX === 0) return;
        const duration = 400; // ms
        const start = performance.now();
        const initialScroll = scroll;
        const targetScroll = initialScroll - deltaX;

        function easeOutCubic(t: number) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const newScroll = initialScroll + (targetScroll - initialScroll) * eased;
            setScroll(newScroll);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setScroll(targetScroll);
            }
        }

        requestAnimationFrame(animate);
    };

    const getHeroElement = () => {
        let hero = 0;
        let maxCardWidth = 0;
        for (let i = 0; i < wData.length; i++) {
            if (wData[i] > maxCardWidth) {
                maxCardWidth = wData[i];
                hero = i;
            }
        }
        setCurrentSnapPosition(hero * 111 + minScroll);
        return hero;
    };

    const releaseScrollState = () => {
        setTimeout(() => {
            if (didScroll) {
                snapToNearest();
                setDidScroll(false);
            }
        }, 100);
    };

    useEffect(() => {
        setHeroElement(getHeroElement());
        // eslint-disable-next-line
    }, [wData]);

    const getSafePosition = (pos: number) => {
        return Math.max(0, Math.min(urls.length - 1, pos));
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            setDirection(-1);
        } else if (e.key === 'ArrowRight') {
            setDirection(1);
        }
    };

    useEffect(() => {
        if (direction !== 0) {
            const newHeroIndex = getSafePosition(heroElement + direction);
            const targetSnapPos = newHeroIndex * 111 + minScroll;
            setHeroElement(newHeroIndex);
            setCurrentSnapPosition(targetSnapPos);
            snapToPosition(scroll - targetSnapPos, true);
            setDirection(0);
        }
        // eslint-disable-next-line
    }, [direction]);

    useEffect(() => {
        let scrollArray: number[] = [];
        for (let i = 0; i < urls.length; i++) {
            scrollArray.push(widthFunction(scroll - (i * 110)));
        }
        setWData(scrollArray);
        // eslint-disable-next-line
    }, [scroll, urls.length]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return function () {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        setImagesLoaded(0);
    }, [urls]);

    const handleImageLoad = () => setImagesLoaded((n) => n + 1);

    const allLoaded = imagesLoaded === urls.length;

    return (
        <div className="carousel-clip">
            <div
                className="arrows-wrapper"
                style={{
                    marginTop: "13px",
                    marginInline: "15px",
                    width: "calc(100% - 25px)"
                }}>
                <Button
                    onClick={() => setDirection(-1)}
                    type="filled icon elevated"
                    id={"scrollLeft"}
                >
                    <Icon iconName={"keyboard_arrow_left"} label={""} />
                </Button>
                <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Button
                        id={''}
                        type={'filled label-icon elevated'}
                    >
                        <Icon label='Gallery' iconName='interests' id={''} />
                    </Button>
                    <Button
                        onClick={() => setDirection(1)}
                        type="filled elevated icon"
                        id={"scrollRight"}
                    >
                        <Icon iconName={"keyboard_arrow_right"} label={""} />
                    </Button>
                </div>
            </div>
            <div className="carousel-container">
                {!allLoaded && (
                    <div className="carousel-loader"></div>
                )}
                <div
                    id="carousel"
                    className="carousel"
                    onMouseUp={() => {
                        setMouseDown(false);
                        releaseScrollState();
                    }}
                    onMouseDown={() => {
                        setMouseDown(true);
                    }}
                    onMouseMove={onScrollListener}
                    onWheel={onWheelListener}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={releaseScrollState}
                >
                    {wData.map((w, i) => (
                        <MaskableFragment key={uuidv4()} width={w} url={urls[i]} onLoad={handleImageLoad} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;