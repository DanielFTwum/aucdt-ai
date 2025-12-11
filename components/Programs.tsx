import React from 'react';
import { PROGRAMS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-aucdt-maroon mb-6">Our Programmes</h2>
          <p className="text-gray-600 text-lg">
            Our pedagogical mission is to prepare our students for professional excellence in design and entrepreneurship. 
            Our broader ethos is to foster creativity, innovation, inspire leadership, use of technology and educate students to commit to sustainability.
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div className="flex overflow-x-auto pb-12 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory">
        <div className="flex-shrink-0 w-0 lg:w-[calc((100vw-80rem)/2)]"></div> {/* Spacer for centering on large screens */}
        {PROGRAMS.map((program) => (
          <div 
            key={program.id} 
            className="flex-shrink-0 w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-100 snap-center group hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-56 overflow-hidden rounded-t-lg">
              <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute top-4 right-0 bg-aucdt-gold text-aucdt-maroon text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md">
                {program.badge}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-aucdt-maroon mb-3 group-hover:text-aucdt-green transition-colors">
                {program.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                {program.description}
              </p>
              <a 
                href={program.link}
                className="inline-flex items-center text-aucdt-maroon font-semibold text-sm hover:text-aucdt-gold transition-colors"
              >
                Read More <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-4"></div>
      </div>
    </section>
  );
};

export default Programs;
