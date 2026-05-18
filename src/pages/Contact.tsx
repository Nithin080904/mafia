import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { SITE_INFO } from '../constants';

export default function Contact() {
  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <h1 className="text-6xl font-display font-bold tracking-tighter mb-8 text-black">CONNECT <br />WITH US.</h1>
          <p className="text-gray-500 font-light text-lg mb-12 max-w-md">Our concierge team is available 24/7 to assist with your luxury inquiries.</p>
          
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1 uppercase">EMAIL US</p>
                <a href={`mailto:${SITE_INFO.email}`} className="text-sm font-medium hover:opacity-60 transition-opacity uppercase">{SITE_INFO.email}</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1 uppercase">CALL US</p>
                <p className="text-sm font-medium">{SITE_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1 uppercase">FLAGSHIP STORE</p>
                <p className="text-sm font-medium uppercase">{SITE_INFO.address}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">{SITE_INFO.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-12 shadow-sm border border-gray-100 h-fit">
          <h3 className="text-2xl font-display font-bold tracking-tighter mb-10">SEND A MESSAGE</h3>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">NAME</label>
                <input type="text" className="w-full bg-white border border-transparent focus:border-black p-4 text-sm focus:outline-none transition-all uppercase" placeholder="JOHN DOE" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">EMAIL</label>
                <input type="email" className="w-full bg-white border border-transparent focus:border-black p-4 text-sm focus:outline-none transition-all uppercase" placeholder="JOHN@GMAIL.COM" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">SUBJECT</label>
              <input type="text" className="w-full bg-white border border-transparent focus:border-black p-4 text-sm focus:outline-none transition-all uppercase" placeholder="GENERAL INQUIRY" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">MESSAGE</label>
              <textarea rows={5} className="w-full bg-white border border-transparent focus:border-black p-4 text-sm focus:outline-none transition-all uppercase" placeholder="TELL US MORE..." />
            </div>
            <button className="w-full bg-black text-white py-5 text-xs font-bold tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-4 uppercase">
              <span>SEND MESSAGE</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">VISIT MAFIYA BOUTIQUE</span>
            <h2 className="text-5xl font-display font-bold tracking-tighter mt-4">FLAGSHIP LOCATION.</h2>
          </div>
          <p className="text-gray-500 font-light max-w-sm text-right mt-4 md:mt-0">
            Experience our full collection in person. Our Athani flagship offers exclusive in-store only releases and bespoke tailoring services.
          </p>
        </div>
        
        <div className="w-full h-[600px] bg-gray-100 grayscale contrast-125 brightness-90 relative overflow-hidden group">
          <iframe 
            src="https://maps.google.com/maps?q=Mafiya%20Boutique,%20Near%20Gajanan%20Temple,%20Athani,%20Belagavi,%20Karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale saturate-50 hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
        </div>
      </div>

    </div>
  );
}
