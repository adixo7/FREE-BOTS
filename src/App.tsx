import React, { useState, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [botCount, setBotCount] = useState('4');
  const [guildId, setGuildId] = useState('');
  const [region, setRegion] = useState('');

  const handleLogin = () => {
    if (username === 'ADIXO' && password === 'PRIMEADIXO7') {
      setError('');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
      }, 2000);
    } else {
      setError('INVALID CREDENTIALS');
    }
  };

  const handleLaunch = () => {
    if (!guildId || !region) return;
    
    setIsProcessing(true);
    setLogs([]);
    
    const possibleLogs = [
      'AUTHENTICATING TERMINAL...',
      'ESTABLISHING SECURE CONNECTION...',
      `TARGET ACQUIRED: GUILD [${guildId}]`,
      `REGION DETECTED: ${region.toUpperCase()}`,
      'BYPASSING MAINFRAME ENCRYPTION...',
      'INJECTING ZEXISTEY_V3.BOT SCRIPTS...',
      'SYNCING WITH SERVER PACKETS...',
      'INITIALIZING BOT PROTOCOLS...',
      'BYPASSING FIREWALL...',
      'CONNECTING TO ADB SERVER...',
      'SENDING BOT REQUESTS...',
      'VALIDATING HANDSHAKE...',
      'ENCRYPTING DATA TUNNEL...',
      'AUTHORIZING ACCESS...',
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < possibleLogs.length) {
        setLogs(prev => [...prev, `> ${possibleLogs[currentLogIndex]}`]);
        currentLogIndex++;
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setLogs(prev => [...prev, `> ${botCount} BOTS SUCCESSFULLY ADDED.`]);
    }, 10000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050205] overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="w-12 h-12 text-[#ff00aa] animate-spin" />
            <p className="text-[#00e5ff] font-mono text-xs tracking-widest animate-pulse">
              INITIALIZING TERMINAL...
            </p>
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-[420px] p-8 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10 mx-4"
          >
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
                className="w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-3.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-sm cursor-pointer"
              >
                LOGIN
              </button>
            </div>
          </motion.div>
        ) : isProcessing ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[450px] p-6 rounded-lg bg-[#050205] border border-[#00ff41]/30 shadow-[0_0_20px_rgba(0,255,65,0.1)] flex flex-col relative z-10 mx-4 min-h-[400px]"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-[#00ff41]/20 pb-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-[#00ff41] font-mono text-[10px] opacity-70">terminal.sh — 80x24</span>
            </div>
            
            <div className="font-mono text-[11px] space-y-1.5 overflow-y-auto max-h-[350px] scrollbar-hide">
              <div className="text-[#00ff41] mb-2">$ ./initialize_guild_bot.sh --target={guildId} --count={botCount}</div>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${log.includes('SUCCESSFULLY') ? 'text-[#00ff41] font-bold mt-4' : 'text-[#00ff41]/90'}`}
                >
                  {log}
                </motion.div>
              ))}
              {logs.length < 15 && (
                <div className="flex items-center gap-1 text-[#00ff41]">
                  <span>_</span>
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-[#00ff41]"
                  />
                </div>
              )}
            </div>
            
            {logs.some(log => log.includes('SUCCESSFULLY')) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsProcessing(false)}
                className="mt-auto pt-6 text-[#00ff41] hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                [ RETURN TO DASHBOARD ]
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[380px] p-6 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10 mx-4"
          >
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
                value={guildId}
                onChange={(e) => setGuildId(e.target.value)}
                className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] input-glow transition-all placeholder-gray-600"
              />

              <div className="relative">
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
            <div className="w-full">
              <button 
                onClick={handleLaunch}
                disabled={!guildId || !region}
                className={`w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-2.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-xs cursor-pointer ${(!guildId || !region) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                LAUNCH BOTS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
