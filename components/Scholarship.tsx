import React from 'react';

const Scholarship: React.FC = () => {
  return (
    <section className="relative py-24 bg-aucdt-maroon text-white text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-aucdt-gold">SCHOLARSHIP</h2>
        <p className="text-lg md:text-xl mb-10 text-gray-100 leading-relaxed">
          AsanSka Minerals Scholarship for the 2025 Academic Year. The Scholarship is for Undergraduate Degree study at AsanSka University College of Design and Technology offered to Ghanaian citizens.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-aucdt-maroon transition-all duration-300"
          >
            READ MORE
          </a>
          <a 
            href="#" 
            className="px-8 py-3 bg-aucdt-gold text-aucdt-maroon border-2 border-aucdt-gold font-semibold rounded hover:bg-transparent hover:text-aucdt-gold transition-all duration-300"
          >
            DOWNLOAD FORM
          </a>
        </div>
      </div>
    </section>
  );
};

export default Scholarship;
