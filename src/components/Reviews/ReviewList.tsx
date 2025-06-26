import { useState, useEffect, useRef } from "react";
import { Icon } from "../navigation_rail/NavigationRail";
import './ReviewCSS.css';
import ReviewsGraph from "./ReviewsGraph";
import Button from "../button/Button";

type Review = {
    name: string;
    rating: number;
    comment: string;
    date: string;
};

export default function ReviewList() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/reviews');
                if (!res.ok) throw new Error('Failed to fetch Reviews');
                const data: Review[] = await res.json();
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setReviews(data);

            } catch (err: any) {
                const message = err?.message || (await err?.response?.json()?.message) || 'Unknown Error';
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
        const handler = () => fetchReviews();
        window.addEventListener('review-submitted', handler);
        return () => window.removeEventListener('review-submitted', handler);
    }, []);

    const scrollRight = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollBy({ left: 290, behavior: 'smooth' });
        }
    };
    const scrollLeft = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollBy({ left: -290, behavior: 'smooth' });
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="review-container">
            <div className="arrows-wrapper">
                <Button
                    onClick={scrollLeft}
                    type="filled elevated icon"
                    activeState="inactive"
                    id={"scrollLeft"}
                >
                    <Icon iconName={"keyboard_arrow_left"} label={""} />
                </Button>
                <Button
                    onClick={scrollRight}
                    type="filled elevated icon"
                    activeState="inactive"
                    id={"scrollRight"}
                >
                    <Icon iconName={"keyboard_arrow_right"} label={""} />
                </Button>
            </div>
            <h1>* Testimonials *</h1>
            {reviews.length === 0 ? (
                <p>No reviews yet. Be the first!</p>
            ) : (
                <div
                    className="cards-container"
                    ref={cardsRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        overflow: 'auto',
                        borderRadius: '26px'
                    }}
                >
                    <ReviewsGraph />
                    {reviews.map(({ name, rating, comment, date }, i) => (
                        <div key={i} className="review-card">
                            <div className="icon-name-date" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                <Icon label="" iconName="account_circle" className="profile-pic" />
                                <h3 style={{ color: 'var(--md-sys-color-on-primary-container)' }}>{name}</h3>
                                <small style={{ paddingTop: '4px', color: 'var(--md-sys-color-outline-variant)', fontWeight: '700' }}>
                                    {new Date(date).toLocaleDateString(undefined, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </small>
                            </div>
                            <div className="star-rating">
                                {[...Array(rating)].map((_, i) => (
                                    <span key={`full-${i}`}>
                                        <Icon className="review-star active" iconName="star_rate" label="" />
                                    </span>
                                ))}
                                {[...Array(5 - rating)].map((_, i) => (
                                    <span key={`empty-${i}`}>
                                        <Icon className="review-star" iconName="star_rate" label="" />
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontSize: '16px' }}>{comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}