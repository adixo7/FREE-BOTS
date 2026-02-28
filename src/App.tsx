import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [botCount, setBotCount] = useState('4');

  const handleLogin = () => {
    if (username === 'ADIXO' && password === 'PRIMEADIXO7') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('INVALID CREDENTIALS');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-[420px] p-8 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10 mx-4">
        {/* Header */}
        <div className="text-center mb-10 mt-2">
          <h1 className="text-4xl md:text-[46px] font-black text-white tracking-wide neon-text mb-3">
            LOGIN
          </h1>
          <p className="text-[#00e5ff] text-xs font-bold tracking-[0.15em] uppercase">
            SECURE TERMINAL
          </p>
        </div>

        {/* Inputs */}
        <div className="w-full space-y-4 mb-8">
          <input 
            type="text" 
            placeholder="USERNAME" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-[#7000ff] rounded p-3.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] input-glow transition-all placeholder-gray-600"
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-[#7000ff] rounded p-3.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] input-glow transition-all placeholder-gray-600"
          />
          {error && <div className="text-[#ff0055] font-mono text-[10px] text-center">{error}</div>}
        </div>

        {/* Action Button */}
        <div className="w-full">
          <button 
            onClick={handleLogin}
            className="w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-3.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-sm"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[380px] p-6 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10 mx-4">
      
      {/* Header */}
      <div className="text-center mb-6 mt-1">
        <h1 className="text-3xl md:text-[34px] font-black text-white tracking-wide neon-text mb-2">
          GUILD GLORY
        </h1>
        <p className="text-[#00e5ff] text-[10px] font-bold tracking-[0.15em] uppercase">
          DEVELOPED BY ADIXO
        </p>
      </div>

      {/* Status Box */}
      <div className="w-full bg-[#050205] border border-gray-800/60 rounded p-3 mb-5 font-mono text-xs">
        <div className="mb-3">
          <span className="text-gray-300">Access Status: </span>
          <span className="text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.5)]">VERIFIED</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[#00e5ff] text-[10px]">ACTIVITY LOG:</div>
          <span className="text-[#00ffcc] text-[10px] drop-shadow-[0_0_3px_rgba(0,255,204,0.4)]">Online</span>
        </div>
        <div className="border-t border-dashed border-gray-700/50 w-full mb-2"></div>
        <div className="text-gray-400 text-[10px] min-h-[15px] flex flex-col gap-1.5">
          <span>For any issue contact owner <a href="https://t.me/AdiXO_TV" target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:text-white transition-colors underline decoration-[#00e5ff]/50 hover:decoration-white">@AdiXO_TV</a></span>
        </div>
      </div>

      {/* Inputs */}
      <div className="w-full space-y-3 mb-5">
        <input 
          type="text" 
          placeholder="ENTER GUILD ID" 
          className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] input-glow transition-all placeholder-gray-600"
        />

        <div className="relative">
          <select 
            defaultValue=""
            className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-[#00e5ff] font-mono text-xs appearance-none focus:border-[#aa00ff] input-glow transition-all cursor-pointer"
          >
            <option value="" disabled hidden>SELECT SERVER</option>
            <option value="bangladesh">BANGLADESH</option>
            <option value="pakistan">PAKISTAN</option>
            <option value="india">INDIA</option>
            <option value="singapore">SINGAPORE</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#00e5ff]">
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="relative">
          <select 
            value={botCount}
            onChange={(e) => setBotCount(e.target.value)}
            className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-[#00e5ff] font-mono text-xs appearance-none focus:border-[#aa00ff] input-glow transition-all cursor-pointer"
          >
            <option value="" disabled hidden>SELECT BOT AMOUNT</option>
            <option value="4">4 BOTS</option>
            <option value="8">8 BOTS</option>
            <option value="12">12 BOTS</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#00e5ff]">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button className="w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-2.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-xs">
          LAUNCH BOTS
        </button>
        <button className="w-full bg-[#15082a] hover:bg-[#1d0b3a] border border-[#7000ff]/70 rounded py-2.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#aa00ff] hover:shadow-[0_0_15px_rgba(170,0,255,0.3)] text-xs">
          FREE GLORY TASKS
        </button>
      </div>

    </div>
  );
}
