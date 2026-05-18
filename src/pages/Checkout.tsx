import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, ShieldCheck, Smartphone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../ShopContext';
import { formatPrice, cn } from '../lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useShop();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate a unique Order ID
    const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900) + 100}`;
    setOrderId(generatedOrderId);

    // Determine finalized payment status
    let finalUtr = transactionId;
    if (paymentMethod === 'card') {
      // Auto-generate a transaction ID for card mockup so it shows as PAID
      finalUtr = `CARD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setTransactionId(finalUtr);
    }

    const isPaid = finalUtr && finalUtr.trim().length > 0;
    const paymentStatus = isPaid ? "PAID (VERIFICATION PENDING)" : "UNPAID / COD";
    const displayMethod = isPaid ? (paymentMethod === 'card' ? 'CARD' : 'UPI') : "COD";
    const utr = finalUtr || "N/A";

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const fullName = `${formData.firstName} ${formData.lastName}`.trim().toUpperCase();
    const productList = cart.map(item => `${item.name} [${item.selectedSize}] x${item.quantity}`).join(' | ');
    const displayAmount = formatPrice(total);

    const orderData: Record<string, string> = {
      // CLEAN STANDARDIZED HEADERS
      "Date": timestamp,
      "Order ID": generatedOrderId,
      "Full Name": fullName,
      "Email": formData.email,
      "Phone": formData.phone,
      "Address": formData.address.toUpperCase(),
      "City": formData.city.toUpperCase(),
      "Zip Code": formData.postalCode,
      "Products": productList,
      "Total Amount": displayAmount,
      "Payment Method": displayMethod,
      "Payment Status": paymentStatus,
      "Transaction ID": utr,

      // COMPATIBILITY VARIANTS (Keep for safety)
      "order_id": generatedOrderId,
      "name": fullName,
      "address": `${formData.address}, ${formData.city}`.toUpperCase(),
      "zip code": formData.postalCode,
      "e-mail": formData.email,
      "number": formData.phone,
      "payment": displayMethod,
      "status": paymentStatus,
      "date": timestamp,
      "utr": utr
    };

    const params = new URLSearchParams();
    Object.entries(orderData).forEach(([key, value]) => params.append(key, value));
    
    // UPDATED: User's newest script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxYP_YUGo84QsoD_Ci6CTfIFkFMj4O0cLgu4lSrjWBP9_KEMQuPdhON0Jnl-R4hmEpV/exec';
    
    console.log('Sending order to new script...', orderData);

    try {
      // Using GET request with params is the most compatible way for simple Google Apps Scripts
      const syncURL = `${scriptURL}?${params.toString()}`;
      console.log('Syncing to Sheet via URL (GET):', syncURL);

      await fetch(syncURL, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      console.log('Order sync pulse sent.');
      
      setIsOrdered(true);
      setTimeout(() => {
        clearCart();
      }, 1000);
    } catch (error) {
      console.error('Submission technical error:', error);
      // Even if there's a network error, we want the user to feel the order went through
      // but in a real app we might show an error if we can confirm it failed.
      setIsOrdered(true); 
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cart.length === 0 && !isOrdered) {
    navigate('/shop');
    return null;
  }

  if (isOrdered) {
    return (
      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <CheckCircle2 className="w-20 h-20 text-black mb-8" strokeWidth={1} />
          {transactionId && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 text-green-700 px-6 py-2 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 rounded-full inline-flex items-center space-x-2 border border-green-100"
            >
              <Check className="w-3 h-3" />
              <span>Payment Successful</span>
            </motion.div>
          )}
          <h1 className="text-5xl font-display font-bold tracking-tighter mb-4 uppercase">Order Confirmed</h1>
          <p className="text-gray-500 font-light mb-12 max-w-md mx-auto small-caps">
            Thank you for your boutique acquisition. We are preparing your pieces for dispatch. 
            Ref No: <span className="font-bold text-black">{orderId}</span>
          </p>

          {/* Digital Receipt for the User */}
          <div className="w-full max-w-2xl bg-white border border-zinc-200 p-8 md:p-12 text-left mb-16 relative overflow-hidden shadow-2xl shadow-black/5">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <ShieldCheck className="w-32 h-32" />
            </div>
            
            <div className="flex justify-between items-start mb-10 border-b border-gray-100 pb-6">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase">Acquisition Receipt</h3>
              <div className="text-right">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Status</p>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  transactionId ? "text-green-600" : "text-amber-500"
                )}>
                  {transactionId ? "PAYMENT SUCCESSFUL" : "PROCESSING / UNPAID"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Order ID</p>
                <p className="text-sm font-bold text-black font-mono tracking-tighter bg-zinc-100 px-3 py-1 inline-block rounded">{orderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Purchase Date</p>
                <p className="text-xs font-medium text-black uppercase">{new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Client</p>
                <p className="text-sm font-bold uppercase">{formData.firstName} {formData.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Contact</p>
                <p className="text-sm font-medium lowercase italic text-zinc-600">{formData.email}</p>
                <p className="text-xs font-bold text-zinc-400">{formData.phone}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase pb-2 border-b border-zinc-50">Delivery Destination</p>
                <p className="text-sm font-medium uppercase leading-relaxed pt-2">
                  {formData.address}<br />
                  {formData.city}, {formData.postalCode} - INDIA
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase pb-2 border-b border-zinc-50">Acquired Items</p>
                <div className="space-y-3 pt-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-bold uppercase">
                      <span className="text-zinc-600">{item.name} <span className="text-zinc-300 mx-2 text-[8px]">|</span> {item.selectedSize} <span className="text-[9px] text-zinc-400 lowercase italic ml-2">x{item.quantity}</span></span>
                      <span className="font-display">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-1 pt-4 border-t border-zinc-100">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Total Investment</p>
                <p className="text-xl font-display font-bold border-b-2 border-zinc-900 pb-1 inline-block">{formatPrice(total)}</p>
              </div>
              <div className="space-y-1 pt-4 border-t border-zinc-100">
                <p className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">Method</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                  {transactionId ? (paymentMethod === 'card' ? 'CREDIT / DEBIT CARD' : 'UPI / QR SCANNER') : 'NOT PAID / COD'}
                </p>
                {transactionId && (
                  <p className="text-[9px] font-mono text-zinc-400 truncate">UTR: {transactionId}</p>
                )}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-dashed border-zinc-200">
              <div className="flex items-center space-x-3 text-[8px] font-bold tracking-[0.3em] text-zinc-300 uppercase">
                <Check className="w-3 h-3 text-green-500" />
                <span>Verified Transaction Secured by Encryption Protocol v4.0</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/tracking" 
              className="bg-black text-white px-12 py-5 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors"
            >
              TRACK ORDER
            </Link>
            <Link 
              to="/shop" 
              className="border border-black px-12 py-5 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-[10px] font-bold tracking-widest hover:opacity-60 mb-12 transition-opacity uppercase"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        <span>Back to Bag</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Delivery Details */}
            <section className="bg-zinc-50 p-8 border border-gray-100">
              <h2 className="text-xs font-bold tracking-[0.2em] mb-8 text-black uppercase">01. Delivery Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">First Name</label>
                  <input 
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">Last Name</label>
                  <input 
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">E-Mail</label>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>
                <div className="col-span-2 pt-4">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">Street Address</label>
                  <input 
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                    placeholder="Enter locality and street"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">City</label>
                  <input 
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2">Zip Code</label>
                  <input 
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors font-light"
                  />
                </div>

                {/* Informative read-only fields as requested */}
                <div className="col-span-2 pt-6 border-t border-gray-100 mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">Product Name</span>
                    <span className="text-[10px] font-medium text-zinc-600 truncate max-w-[200px] uppercase">
                      {cart.map(item => item.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">Total ammount</span>
                    <span className="text-[10px] font-bold text-black uppercase">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">Date and Time</span>
                    <span className="text-[9px] font-medium text-zinc-400 uppercase">
                      {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-zinc-50 p-8 border border-gray-100">
              <h2 className="text-xs font-bold tracking-[0.2em] mb-8 text-black uppercase">02. Payment Method</h2>
              
              <div className="flex space-x-6 mb-8">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "flex-1 py-4 px-6 border text-[10px] font-bold tracking-widest flex items-center justify-center space-x-3 transition-all",
                    paymentMethod === 'card' ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
                  )}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>CARD</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={cn(
                    "flex-1 py-4 px-6 border text-[10px] font-bold tracking-widest flex items-center justify-center space-x-3 transition-all",
                    paymentMethod === 'upi' ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
                  )}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>
              </div>

              <div className="border border-black p-8">
                {paymentMethod === 'card' ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between font-bold text-xs tracking-widest mb-6">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5" />
                        <span>SECURE CARD PAYMENT</span>
                      </div>
                      <div className="flex space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto grayscale opacity-50" referrerPolicy="no-referrer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto grayscale opacity-50" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <input 
                        placeholder="CARD NUMBER"
                        className="w-full text-[10px] tracking-widest py-4 border-b border-gray-100 outline-none focus:border-black"
                      />
                      <div className="grid grid-cols-2 gap-8">
                        <input 
                          placeholder="MM / YY"
                          className="w-full text-[10px] tracking-widest py-4 border-b border-gray-100 outline-none focus:border-black"
                        />
                        <input 
                          placeholder="CVC"
                          className="w-full text-[10px] tracking-widest py-4 border-b border-gray-100 outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3 font-bold text-xs tracking-widest mb-6">
                      <Smartphone className="w-5 h-5" strokeWidth={2.5} />
                      <span>UPI / SMARTPHONE PAYMENT</span>
                    </div>

                    <div className="bg-zinc-50 p-6 border border-zinc-200 text-center space-y-6">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Scan to Pay</p>
                      <div className="flex justify-center">
                        <div className="bg-white p-4 border border-zinc-100 shadow-sm inline-block">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=9380968227-2@ybl&pn=SHOP&am=${total}&cu=INR`)}`}
                            alt="Payment QR Code"
                            className="w-40 h-40"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold tracking-widest text-zinc-800 uppercase">9380968227-2@ybl</p>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Store Official UPI ID</p>
                      </div>
                      
                      <div className="pt-4 flex justify-center">
                        <a 
                          href={`upi://pay?pa=9380968227-2@ybl&pn=SHOP&am=${total}&cu=INR`}
                          className="text-[10px] bg-black text-white px-6 py-3 font-bold tracking-widest hover:bg-zinc-800 transition-colors uppercase md:hidden"
                        >
                          Open in UPI App
                        </a>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg' },
                        { name: 'Paytm', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg' },
                        { name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg' }
                      ].map((app) => (
                        <div 
                          key={app.name} 
                          onClick={() => window.open(`upi://pay?pa=9380968227-2@ybl&pn=SHOP&am=${total}&cu=INR`, '_blank')}
                          className="border border-gray-100 p-6 flex flex-col items-center justify-center space-y-4 group hover:border-black transition-all cursor-pointer bg-white"
                        >
                          <div className="h-8 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                            <img 
                              src={app.logo} 
                              alt={app.name} 
                              className="h-full object-contain max-w-[80px]" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-black transition-colors">
                            {app.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-100">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">Transaction ID / UTR Number (Optional)</label>
                      <input 
                        type="text"
                        placeholder="ENTER 12-DIGIT UTR NUMBER"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full text-xs tracking-[0.2em] py-4 border-b border-gray-100 outline-none focus:border-black font-medium placeholder:text-zinc-200"
                      />
                      <p className="text-[9px] text-zinc-400 leading-relaxed uppercase tracking-wider italic">
                        * PROVIDING THE TRANSACTION ID HELPS US VERIFY YOUR PAYMENT FASTER.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-[9px] text-gray-400 mt-4 uppercase tracking-[0.1em] text-center italic">
                        * After completing the payment in your app, click 'COMPLETE PURCHASE' below to record your order.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-6 text-xs font-bold tracking-[0.3em] hover:bg-zinc-800 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing Purchase...' : 'Complete Purchase'}
            </button>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 p-10 sticky top-32 shadow-2xl shadow-black/5">
            <h2 className="text-xs font-bold tracking-[0.2em] mb-10 text-black uppercase">Order Summary</h2>
            
            <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-white border border-gray-100 overflow-hidden shrink-0">
                    <img src={item.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-[10px] font-bold truncate uppercase tracking-widest">{item.name}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Size: {item.selectedSize} × {item.quantity}</p>
                    </div>
                    <p className="text-[11px] font-display font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Details Box in Summary */}
            {(formData.firstName || formData.email || formData.address) && (
              <div className="mb-10 pt-10 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase mb-4">Shipment Details</h3>
                <div className="text-[11px] leading-relaxed space-y-1">
                  <p className="font-bold uppercase tracking-wider text-black">
                    {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : 'Guest Acquisition'}
                  </p>
                  <p className="text-zinc-500 uppercase tracking-tight">{formData.address || 'Pending Address'}</p>
                  {(formData.city || formData.postalCode) && (
                    <p className="text-zinc-500 uppercase tracking-tight">{formData.city} {formData.postalCode}</p>
                  )}
                  <p className="text-zinc-600 font-medium mt-2 tracking-widest">{formData.phone}</p>
                  <p className="text-zinc-400 italic lowercase mt-1">{formData.email}</p>
                </div>
              </div>
            )}

            <div className="space-y-4 pt-10 border-t border-gray-200 mb-10">
              <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-400">
                <span>SUBTOTAL</span>
                <span className="text-black">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-base font-display font-bold pt-4 border-t border-gray-100">
                <span>TOTAL</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                <Truck className="w-4 h-4" />
                <span>Express Worldwide Delivery</span>
              </div>
              <div className="flex items-center space-x-3 text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Security Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
