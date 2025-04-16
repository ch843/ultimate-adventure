const ContactForm = () => {
  return (
    <section className="py-16 bg-emerald-800 opacity-80 text-white mx-80">
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
                placeholder="First Name"
                className="flex-1 py-3 px-4 rounded-md outline focus:ring-2 focus:ring-secondary"
            />
            <input
                type="text"
                placeholder="Last Name"
                className="flex-1 py-3 px-4 rounded-md outline focus:ring-2 focus:ring-secondary"
            />
            <input
                type="email"
                placeholder="Your email"
                className="flex-1 py-3 px-4 rounded-md outline focus:ring-2 focus:ring-secondary"
            />
            <select id="options" name="options" className="bg-emerald-800 outline rounded px-2 focus:outline-none">
              <option value="">--Please choose--</option>
              <option value="climbing">Climbing</option>
              <option value="rafting">Rafting</option>
              <option value="canyoneering">Canyoneering</option>
            </select>
            <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 py-3 px-6 rounded-md whitespace-nowrap font-medium"
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

export default ContactForm;