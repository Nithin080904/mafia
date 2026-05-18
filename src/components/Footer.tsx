import { Link } from 'react-router-dom';
import { Mail, Instagram, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { SITE_INFO } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold tracking-tighter mb-6">{SITE_INFO.name}</h3>
            <p className="text-gray-400 font-light mb-6 max-w-xs">{SITE_INFO.footerText}</p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-6">
                <a 
                  href="https://maps.app.goo.gl/d3j8pbWKw2hnk2uDA?g_st=ac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-[10px] font-bold tracking-widest text-gray-400 hover:text-white transition-colors uppercase"
                >
                  <MapPin className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" strokeWidth={2.5} />
                  <span>MAFIYA BOUTIQUE</span>
                </a>
                
                <div className="flex space-x-4">
                  <a href={SITE_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" strokeWidth={2.5} /></a>
                  <a href={SITE_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><WhatsAppIcon className="w-5 h-5" /></a>
                </div>
              </div>
              
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase max-w-[250px] leading-relaxed">
                <p>{SITE_INFO.address}</p>
                <p className="mt-1 opacity-60 font-light">{SITE_INFO.hours}</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-6 uppercase">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><Link to="/shop" className="hover:text-white transition-colors">Outerwear</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Pants</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-6 uppercase">Customer Care</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><Link to="/tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-6 uppercase">Newsletter</h4>
            <p className="text-sm text-gray-400 font-light mb-6">Join the inner circle for exclusive drops and private events.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border border-white/20 px-4 py-3 text-xs w-full focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-4 py-3 text-xs font-bold hover:bg-gray-200 transition-colors">JOIN</button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-medium tracking-widest">
          <p>© 2024 {SITE_INFO.name}. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors text-xs">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors text-xs">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
