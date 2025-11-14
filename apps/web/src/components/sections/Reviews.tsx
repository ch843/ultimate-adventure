import { useReviews } from "@/hooks/useReviews";
import type { ReviewInfo } from "@ultimate-adventure/shared-models";

const ReviewsCard = ({review}: { review : ReviewInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
      <div className="flex-grow">
        <p className="text-gray-600 italic mb-6">"{review.description}"</p>
      </div>
      <div className="flex items-center">
        <img
          src={review.picture_link ?? ''}
          alt={review.name ?? "Profile Image"}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-medium text-dark">{review.name}</h4>
          <p className="text-gray-500 text-sm">{new Date(review.date ?? "").toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const { reviewData } = useReviews()

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewData?.map((review) => (
            <ReviewsCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
