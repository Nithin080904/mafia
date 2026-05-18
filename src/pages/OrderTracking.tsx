import { useState } from 'react';
import { Package, Search, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="mb-20">
        <h1 className="text-5xl font-display font-bold tracking-tighter mb-4">TRACK YOUR SHIPMENT</h1>
        <p className="text-gray-500 font-light text-sm max-w-md">Our global concierge service ensures your luxury pieces reach you with the utmost care and speed.</p>
      </div>

      <div className="bg-gray-50 p-10 mb-20 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-grow space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-gray-400">ORDER IDENTIFIER</label>
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-white border border-black/10 focus:border-black p-4 text-sm focus:outline-none transition-all uppercase placeholder:normal-case"
              placeholder="e.g. #MAFIYA-12345"
            />
          </div>
          <button 
            onClick={() => setHasSearched(true)}
            className="w-full md:w-auto bg-black text-white px-10 py-4 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" strokeWidth={2.5} />
            <span>LOCATE PACKAGE</span>
          </button>
        </div>
      </div>

      {hasSearched && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-8">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1 uppercase">ESTIMATED ARRIVAL</p>
              <p className="text-2xl font-display font-bold">MONDAY, MAY 25TH</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1 uppercase">STATUS</p>
              <span className="bg-black text-white px-4 py-1 text-[10px] font-bold tracking-widest">IN TRANSIT</span>
            </div>
          </div>

          <div className="relative pt-8">
            {/* Progress Line */}
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-100" />
            
            <div className="space-y-12">
              <div className="relative flex items-center gap-8 group">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 shrink-0 text-white">
                  <Package className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-widest mb-1">ORDER CONFIRMED</p>
                  <p className="text-xs text-gray-400">MAY 18, 2024 • 09:45 AM CENTRAL</p>
                </div>
              </div>

              <div className="relative flex items-center gap-8 group">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 shrink-0 text-white">
                  <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-widest mb-1">PROCESSED & READY FOR DISPATCH</p>
                  <p className="text-xs text-gray-400">MAY 19, 2024 • 02:20 PM CENTRAL</p>
                </div>
              </div>

              <div className="relative flex items-center gap-8 group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center z-10 shrink-0 text-gray-400 border-2 border-dashed border-black/20">
                  <Truck className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-widest mb-1 opacity-40">DEPARTED FROM DISTRIBUTION HUB</p>
                  <p className="text-xs text-gray-400 italic">PENDING UPDATE</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
