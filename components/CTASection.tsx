import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-aucdt-beige">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-maroon to-aucdt-gold">
              What are you waiting for?
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
              <p>
                Are you looking to pursue your passion for design? Look no further than AUCDT! Our accredited degree programs in Fashion Design, Jewellery Design Technology, Digital Media and Communication Design, and Product Design are designed to help you achieve your dreams.
              </p>
              <p>
                Our experienced faculty and cutting-edge facilities provide a top-notch education, while our affordable tuition ensures that you won't break the bank. Don't wait - apply today and start your journey towards a fulfilling career in design!
              </p>
            </div>
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-block bg-aucdt-gold text-aucdt-maroon font-semibold px-8 py-3 rounded shadow-md hover:shadow-lg hover:bg-aucdt-maroon hover:text-white transition-all duration-300"
              >
                Download Brochure
              </a>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-xl border-t-4 border-aucdt-maroon text-center">
            <h3 className="text-2xl font-bold text-aucdt-maroon mb-6">
              YOUR CAREER TRAINING STARTS HERE!
            </h3>
            <a 
              href="https://portal.aucdt.edu.gh/admissions/#/home"
              className="block w-full bg-aucdt-maroon text-white font-bold text-xl px-8 py-4 rounded shadow-lg hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all duration-300 transform hover:-translate-y-1"
            >
              APPLY NOW!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
