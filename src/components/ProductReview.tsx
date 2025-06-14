import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}

interface ProductReviewProps {
  productId: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    reviewerName: '',
  });

  useEffect(() => {
    // Simulate fetching reviews from a backend
    const fetchedReviews: Review[] = [
      { id: '1', productId: 'aura-darjeeling-first-flush', rating: 5, comment: 'Absolutely love this tea! The aroma is captivating and the flavor is so refreshing.', reviewerName: 'Priya S.', date: '2023-10-26' },
      { id: '2', productId: 'aura-darjeeling-first-flush', rating: 4, comment: 'A good quality Darjeeling. A bit milder than expected, but still very pleasant.', reviewerName: 'Rahul K.', date: '2023-10-20' },
      { id: '3', productId: 'aura-assam-black-tea', rating: 5, comment: 'Strong and malty, perfect for my morning brew. A true Assam classic.', reviewerName: 'Amit V.', date: '2023-09-15' },
    ];
    setReviews(fetchedReviews.filter(review => review.productId === productId));
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim() || !newReview.reviewerName.trim()) {
      alert('Please fill in all review fields and provide a rating.');
      return;
    }
    const submittedReview: Review = {
      ...newReview,
      id: Date.now().toString(), // Simple unique ID
      productId,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [submittedReview, ...prev]);
    setNewReview({ rating: 0, comment: '', reviewerName: '' });
  };

  return (
    <div className="bg-[#23232a] rounded-lg shadow-md p-8 border border-gray-700">
      <h2 className="text-3xl font-serif font-bold mb-6 border-b border-gray-700 pb-4 text-gray-100">Customer Reviews</h2>

      {/* Review Submission Form */}
      <div className="mb-10">
        <h3 className="text-xl font-serif font-bold mb-4 text-gray-100">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Your Rating</label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${i < newReview.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => handleRatingChange(i + 1)}
                  fill={i < newReview.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-gray-300 text-sm font-medium mb-1">Your Review</label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder="Share your experience with this product..."
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="reviewerName" className="block text-gray-300 text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              id="reviewerName"
              name="reviewerName"
              value={newReview.reviewerName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Existing Reviews */}
      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-300 text-center">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-[#121212] p-6 rounded-lg shadow-sm border border-gray-800">
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-3 text-gray-300 text-sm">{review.reviewerName}</span>
                  <span className="ml-auto text-gray-400 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;