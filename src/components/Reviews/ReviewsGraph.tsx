import { useEffect, useState } from "react";
import { Icon } from "../navigation_rail/NavigationRail";

type Review = {
    name: string;
    rating: number;
    comment: string;
    date: string;
};

export default function ReviewsGraph() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/api/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
            .finally(() => setLoading(false));
    }, []);

    // Count reviews for each star (5 to 1)
    const starCounts = [5, 4, 3, 2, 1].map(star =>
        reviews.filter(r => r.rating === star).length
    );
    const maxCount = Math.max(...starCounts, 1);

    if (loading) return <p>Loading graph...</p>;

    return (
        <div style={{
            maxWidth: 400,
            marginRight: "16px",
            padding: "20px 26px",
            borderRadius: "26px",
            backgroundColor: "var(--md-sys-color-surface-container-low)",
            transition: "all var(--transition-expressive-color)"
        }}>
            {starCounts.map((count, idx) => (
                <div key={5 - idx}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                        flexDirection: "row",
                        position: "relative"
                    }}>
                    <span style={{ width: 24, display: "inline-flex", flexDirection: "row" }}>
                        <Icon
                            className={'review-star active'}
                            iconName='star_rate'
                            label=''
                        />
                    </span>
                    <div
                        style={{
                            background: "var(--md-sys-color-primary-container)",
                            height: 12,
                            width: `${(count / maxCount) * 200}px`,
                            minWidth: 8,
                            borderRadius: 32,
                            marginLeft: 10,
                            position: "relative",
                            transition: "width 0.3s"
                        }}
                    />
                    <span style={{
                        marginLeft: 8,
                        fontSize: 14,
                        color: "var(--md-sys-color-secondary)",
                        transition: "all var(--transition-expressive-color)"
                    }}>
                        {count}
                    </span>
                </div>
            ))}
        </div>
    );
}