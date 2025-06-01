const reviews = [
  {
    id: 1,
    name: "Greenix Team",
    date: "11/13/2021",
    image: "https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/review-profiles/Greenix_Team.avif",
    text: "We took a group of 11 people to canyoneer through Leprechaun Canyon for a leadership retreat activity and THIS ONE IS FOR THE BOOKS. Not only is the canyon breathtaking, but Sharon and her assistant guide Will gave us exceptional service. We had quite a few experienced hikers and a couple nervous hikers, and they made it such a comfortable and enjoyable experience for all. Plus - they are just fun!! Would 10/10 recommend this specific hike, but if you are going, take Sharon!! She is the best.",
  },
  {
    id: 2,
    name: "Sara",
    date: "9/11/2021",
    image: "https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/review-profiles/Sara.avif",
    text: "Sharon is an expert canyoneer and has also been so knowledgeable about the details of each canyon we have done with her. She is safe, competent and yet relaxed and makes the experience fun and enjoyable. She is also great at explaining and teaching so I have not only had a great time but have also improved my canyoneering knowledge. Highly recommend!! You will have a great time—she will cater to your experience and adventure level.",
  },
  {
    id: 3,
    name: "Josh",
    date: "6/3/2020",
    image: "https://ooelvqpdhbpsjsqbrljg.supabase.co/storage/v1/object/public/ultimate-adventure-prod/review-profiles/Josh_JPG.avif",
    text: "I have been Canyoneering with Sharon many times over the years. She has lead me through everything from very basic canyons, to extremely technical canyons. Not only does Sharon have a great respect for the outdoors, but she has the experience and knowledge to make any Canyon experience fun and exciting. I would recommend Sharon to any new person looking to explore the joy of Earth’s Canyons.",
  },
];

const ReviewsCard = ({ testimonial }: { testimonial: typeof reviews[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
      </div>
      <div className="flex items-center">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-medium text-dark">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.date}</p>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        {/*<div className="text-center mb-12">*/}
        {/*  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">What Our Customers Say</h2>*/}
        {/*  <p className="text-lg text-gray-600 max-w-3xl mx-auto">*/}
        {/*    Real experiences from adventurers who have explored with us*/}
        {/*  </p>*/}
        {/*</div>*/}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((testimonial) => (
            <ReviewsCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;