import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ShieldCheck, Activity } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  onTestClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onTestClick }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 font-light text-sm">
        {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: About Us */}
        <div className="space-y-6">
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-beige to-aucdt-gold">About Us</h4>
            <p className="leading-relaxed">
                The vision of the College is to become an internationally reputable centre for Design education and research.
            </p>
            <div className="space-y-2">
                <p><strong className="text-white">Location:</strong><br />Oyibi (opposite the Valley View University) off the Adenta - Dodowa Road (Accra-Ghana)</p>
                <p><strong className="text-white">Digital Address:</strong><br />GM-274-6332</p>
            </div>
            <a href="#" className="inline-block border border-gray-600 text-xs px-4 py-2 hover:border-aucdt-gold hover:text-aucdt-gold transition-colors">
                Accreditation & Affiliation
            </a>
        </div>

        {/* Column 2: Connect */}
        <div className="space-y-6">
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-beige to-aucdt-gold">Connect with us</h4>
            <div className="space-y-4">
                <p><strong className="text-white">Postal Address:</strong><br />P. O. Box VV 179,<br />Oyibi - Accra.</p>
                <p><strong className="text-white">Mobile/Whatsapp:</strong><br />+233 (0)54 012 4400<br />+233 (0)54 012 4488</p>
            </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="space-y-6">
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-beige to-aucdt-gold">Quick Links</h4>
            <ul className="space-y-2">
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Students</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Faculty</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Departments</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Admissions</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Ofosua Library</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">AUCDT LMS</a></li>
            </ul>
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-beige to-aucdt-gold mt-6">Resources</h4>
             <ul className="space-y-2">
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">AUCDT Email</a></li>
                <li><a href="#" className="hover:text-aucdt-gold transition-colors">Privacy Statement</a></li>
            </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
             <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-aucdt-beige to-aucdt-gold">Subscribe to our Newsletter</h4>
             <p>Join our mailing list to receive the latest news and updates from our institution.</p>
             <form className="space-y-3">
                 <input type="text" placeholder="Last Name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-aucdt-gold text-white" />
                 <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-aucdt-gold text-white" />
                 <button type="button" className="w-full bg-aucdt-gold text-aucdt-maroon font-bold py-2 rounded hover:bg-white transition-colors">Subscribe</button>
             </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">
                AsanSka University College of Design and Technology | Copyright © 2025 | All Rights Reserved
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-aucdt-gold transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-aucdt-gold transition-colors"><Twitter size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-aucdt-gold transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-aucdt-gold transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-aucdt-gold transition-colors"><Youtube size={20} /></a>
              </div>
              <div className="flex items-center space-x-4 border-l border-gray-700 pl-4">
                <button 
                    onClick={onTestClick}
                    className="text-gray-600 hover:text-aucdt-gold transition-colors flex items-center text-xs"
                    title="Run Self-Test Suite"
                >
                    <Activity size={14} className="mr-1" /> Test Suite
                </button>
                <button 
                    onClick={onAdminClick}
                    className="text-gray-600 hover:text-aucdt-gold transition-colors flex items-center text-xs"
                    title="Admin Portal"
                >
                    <ShieldCheck size={14} className="mr-1" /> Admin
                </button>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;