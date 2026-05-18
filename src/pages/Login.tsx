import { useState } from 'react';
import { motion } from 'motion/react';
import { SITE_INFO } from '../constants';
import { ArrowRight, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-40 pb-24 px-6 max-w-lg mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold tracking-tighter mb-4">
          {isLogin ? 'WELCOME BACK' : 'JOIN THE INNER CIRCLE'}
        </h1>
        <p className="text-gray-500 font-light text-sm uppercase tracking-widest">
          {isLogin ? 'ENTER YOUR CREDENTIALS' : 'CREATE YOUR PRIVATE ACCOUNT'}
        </p>
      </div>

      <form className="space-y-6">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-gray-400">FULL NAME</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-transparent focus:border-black p-4 text-sm focus:outline-none transition-all"
              placeholder="YOUR NAME"
            />
          </div>
        )}
        <div className="space-y-1">
          <label className="text-[10px] font-bold tracking-widest text-gray-400">EMAIL ADDRESS</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="email" 
              className="w-full bg-gray-50 border border-transparent focus:border-black py-4 pl-12 pr-4 text-sm focus:outline-none transition-all underline-offset-4"
              placeholder="EMAIL@EXAMPLE.COM"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold tracking-widest text-gray-400">PASSWORD</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="password" 
              className="w-full bg-gray-50 border border-transparent focus:border-black py-4 pl-12 pr-4 text-sm focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button className="w-full bg-black text-white py-5 text-xs font-bold tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-4">
          <span>{isLogin ? 'ENTER' : 'CREATE ACCOUNT'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase"
        >
          {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : "ALREADY A MEMBER? LOGIN"}
        </button>
      </div>
    </div>
  );
}
