import { useParams } from 'react-router-dom';
import ReviewCard from '../components/Reviews/ReviewCard';
import ReviewStats from '../components/Reviews/ReviewStats';
import { useEffect, useState } from 'react';
import ReviewModal from '../components/Reviews/ReviewModal';
import { ID } from 'appwrite';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const { id } = useParams();
    const openReviewModal = () => setIsReviewModalOpen(true);
    const closeReviewModal = () => setIsReviewModalOpen(false);

    //Passed google_book_id from BookDetails.jsx in route so as to use the id to fetch the reviews on that particular book to display them.
    useEffect(() => {
        const fetchReviews = async() => {
            setLoading(true);
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${id}/reviews`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                const data = await res.json();
                if(data.success){
                    setReviews(data.reviews);
                    console.log("Reviews fetched successfully: ", data.reviews);
                }else{
                    console.error("Failed to fetch reviews: ", data.message);
                    setReviews([]);
                }
            }catch(error){
                console.error("Error fetching reviews: ", error);
            }
        };

        fetchReviews();
        setLoading(false);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-16">
            <h1 className="text-3xl font-bold mb-8">Reviews</h1>
            <button onClick={openReviewModal}>Add your review !</button>
            <ReviewStats />
            <h1>Reviews : {reviews.length}</h1>
            {loading ? (
                <p>Loading Reviews ...</p>
            ) : (
                <div>
                {reviews.map((review, i) => (
                    <ReviewCard key={i} user_id={review.user_id} book_id={review.book_id} rating={review.rating} review_text={review.review_text} />
                ))}
            </div>
            )}
            <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} google_book_id={id} />
        </div>
    )
}

export default Reviews
