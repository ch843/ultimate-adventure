const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "The Ultimate Adventure Guides trip to New Zealand was the best travel experience of my life. Every detail was perfectly planned, and the guides were incredibly knowledgeable.",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "United Kingdom",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    text: "I can't recommend this service enough. The Costa Rica adventure was amazing, from the rainforest hikes to zip-lining. Will definitely book with them again!",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Spain",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The Iceland tour exceeded all my expectations. I got to see the northern lights and explore ice caves. Truly a once-in-a-lifetime experience.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
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
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real experiences from adventurers who have explored with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            Read More Reviews
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;