import { motion } from 'motion/react';
import { SITE_INFO } from '../constants';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-6xl font-display font-bold tracking-tighter mb-16 text-center">OUR STORY</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] bg-gray-100 overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop" 
            alt="Mafiya Workshop" 
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        
        <div className="space-y-8">
          <span className="text-xs font-bold tracking-[0.4em] text-gray-400">EST. 2024</span>
          <h2 className="text-4xl font-display font-bold tracking-tighter leading-tight">CRAFTED IN THE <br />SILENCE OF THE NIGHT.</h2>
          <p className="text-gray-600 font-light leading-relaxed">
            {SITE_INFO.name} was born out of a desire to create a new language of luxury. One that doesn't scream for attention but commands it through silence, precision, and unwavering quality.
          </p>
          <p className="text-gray-600 font-light leading-relaxed">
            Our philosophy is simple: create pieces that last a lifetime. Every garment is a testament to the artisans who spend hours perfecting a single seam, and the visionaries who see the future of streetwear in the shadows of the past.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-gray-100 pt-32">
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold tracking-tighter">THE CRAFT</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            We use only the highest grade materials. From GOTS-certified organic cotton to hand-painted calfskin, our sourcing is global and uncompromising.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold tracking-tighter">THE VISION</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Streetwear is high fashion. High fashion is streetwear. We blur the lines between the runway and the asphalt to create something truly unique.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold tracking-tighter">THE FUTURE</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Sustainability is not a feature; it's our foundation. We are constantly evolving our techniques to minimize our footprint while maximizing our impact.
          </p>
        </div>
      </div>
    </div>
  );
}
