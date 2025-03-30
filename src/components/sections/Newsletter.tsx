const Newsletter = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Inspired For Your Next Adventure</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our newsletter and receive expert travel tips, exclusive offers, and inspiring 
            adventure guides directly in your inbox.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Your name"
              className="flex-1 py-3 px-4 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 py-3 px-4 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-md whitespace-nowrap font-medium"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm mt-4 opacity-75">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;