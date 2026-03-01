import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2, ArrowLeft, Trophy, Youtube, Gamepad2, Timer, Users, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBotSent, setIsBotSent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [botCount, setBotCount] = useState('4');
  const [guildId, setGuildId] = useState('');
  const [region, setRegion] = useState('');
  const [launchError, setLaunchError] = useState('');
  const [timer, setTimer] = useState(4270);
  const [botBatchOffset, setBotBatchOffset] = useState(0);
  
  // Stats for the final page
  const [matches, setMatches] = useState(1);
  const [glory, setGlory] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Timer logic
  useEffect(() => {
    if (isSuccess && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isSuccess, timer]);

  // Logic for increasing matches every 2 minutes
  useEffect(() => {
    if (isSuccess) {
      const matchInterval = setInterval(() => {
        setMatches(prev => prev + 1);
      }, 120000); // 2 minutes
      return () => clearInterval(matchInterval);
    }
  }, [isSuccess]);

  // Logic for increasing glory
  useEffect(() => {
    if (isSuccess && startTime) {
      const checkInterval = setInterval(() => {
        const now = Date.now();
        const diffMinutes = (now - startTime) / 60000;
        
        if (diffMinutes >= 5) {
          if (glory === 0) {
            setGlory(Math.floor(Math.random() * (630 - 340 + 1)) + 340);
          } else {
            // After initial glory, add more every 40s to 60s
            // We use a separate state or logic to handle the random interval
          }
        }
      }, 1000);
      return () => clearInterval(checkInterval);
    }
  }, [isSuccess, startTime, glory]);

  // Glory increment logic after initial 5 mins
  useEffect(() => {
    if (isSuccess && glory > 0) {
      const scheduleNext = () => {
        const randomTime = Math.floor(Math.random() * (60000 - 40000 + 1)) + 40000;
        return setTimeout(() => {
          setGlory(prev => prev + Math.floor(Math.random() * (600 - 200 + 1)) + 200);
          timeoutId = scheduleNext();
        }, randomTime);
      };
      
      let timeoutId = scheduleNext();
      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess, glory > 0]);

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
    if (!/^\d+$/.test(guildId)) {
      setLaunchError('INVALID GUILD ID');
      setTimeout(() => setLaunchError(''), 3000);
      return;
    }
    if (guildId.length !== 10) return;
    if (!region) return;

    // Check last launch for this guild
    const lastLaunch = localStorage.getItem(`last_launch_${guildId}`);
    if (lastLaunch) {
      const lastTime = parseInt(lastLaunch);
      const diff = Date.now() - lastTime;
      if (diff < 1800000) { // 30 minutes in ms
        const remainingMins = Math.ceil((1800000 - diff) / 60000);
        setLaunchError(`COOLDOWN ACTIVE: PLEASE WAIT ${remainingMins} MINUTES FOR THIS GUILD.`);
        setTimeout(() => setLaunchError(''), 5000);
        return;
      }
    }
    
    setIsProcessing(true);
    setLogs([]);
    setLaunchError('');
    
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
      localStorage.setItem(`last_launch_${guildId}`, Date.now().toString());
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsBotSent(true);
        // Increase offset for next time
        setBotBatchOffset(prev => prev + 4);
      }, 1500);
    }, 10000);
  };

  const handleAccepted = () => {
    setIsBotSent(false);
    setIsSuccess(true);
    setStartTime(Date.now());
  };

  const handleRejoin = () => {
    setIsResent(true);
    setTimeout(() => setIsResent(false), 5000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050205] overflow-hidden p-4">
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
            className="w-full max-w-[420px] p-8 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10"
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
                className="w-full bg-black border border-[#7000ff] rounded p-3.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] transition-all placeholder-gray-600 outline-none"
              />
              <input 
                type="password" 
                placeholder="PASSWORD" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#7000ff] rounded p-3.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] transition-all placeholder-gray-600 outline-none"
              />
              {error && <div className="text-[#ff0055] font-mono text-[10px] text-center uppercase tracking-tighter">{error}</div>}
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
            className="w-full max-w-[450px] p-6 rounded-lg bg-[#050205] border border-[#00ff41]/30 shadow-[0_0_20px_rgba(0,255,65,0.1)] flex flex-col relative z-10 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-4 border-b border-[#00ff41]/20 pb-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsProcessing(false)}
                  className="p-1 hover:bg-[#00ff41]/10 rounded transition-colors text-[#00ff41]"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[#00ff41] font-mono text-[10px] opacity-70">terminal.sh — 80x24</span>
            </div>
            
            <div className="font-mono text-[11px] space-y-1.5 overflow-y-auto max-h-[350px] scrollbar-hide flex-grow">
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
              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        ) : isBotSent ? (
          <motion.div
            key="bot-sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[450px] p-8 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10"
          >
            <h2 className="text-3xl font-black text-white tracking-wider mb-2 text-center neon-text uppercase">
              CONGRATULATIONS!
            </h2>
            <p className="text-[#00e5ff] text-xl font-black text-center mb-6 neon-text uppercase">
              {botCount} BOTS HAVE BEEN SENT TO YOUR GUILD
            </p>
            
            <p className="text-white/70 text-sm font-mono mb-6 text-center">
              ACCEPT THE REQUEST OF THE BOTS
            </p>

            <div className="w-full bg-black/50 border border-[#7000ff]/30 rounded-lg p-4 mb-8 font-mono text-sm space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-[#00e5ff]">
                  {i + 1}. adixoglory{botBatchOffset - 4 + i + 1}
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col gap-4">
              <button 
                onClick={handleAccepted}
                className="w-full bg-[#0a2a15] hover:bg-[#0e3a1d] border border-[#00ff41]/70 rounded py-3.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] text-sm cursor-pointer"
              >
                ACCEPTED
              </button>
              <button 
                onClick={handleRejoin}
                className="w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-3.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-sm cursor-pointer"
              >
                REJOIN
              </button>
            </div>

            {isResent && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-[#ff0055] text-[10px] font-bold text-center uppercase tracking-wider"
              >
                BOTS HAVE BEEN RESENT TO YOUR GUILD! PLEASE CHECK AND APPROVE
              </motion.p>
            )}
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[450px] p-6 rounded-xl bg-[#0a050a] border border-[#00ffcc]/30 neon-box flex flex-col items-center relative z-10"
          >
            <Trophy className="text-[#00ffcc] w-16 h-16 mb-4 animate-bounce" />
            <h2 className="text-2xl font-black text-white tracking-wider mb-2 text-center neon-text">
              CONGRATULATIONS!
            </h2>
            <p className="text-[#00e5ff] text-xs font-mono text-center mb-6">
              {botCount} BOTS HAVE BEEN SUCCESSFULLY ADDED TO YOUR GUILD.
            </p>

            <div className="w-full bg-[#050205] border border-[#00e5ff]/20 rounded-lg p-4 mb-8 flex flex-col items-center gap-3">
              <p className="text-white text-[10px] font-bold tracking-widest uppercase">Support the Creator</p>
              <a 
                href="https://www.youtube.com/@adixo_ff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 py-2 rounded font-black text-xs transition-all shadow-lg"
              >
                <Youtube size={16} />
                SUBSCRIBE TO ADIXO TV
              </a>
            </div>

            {/* Match Progress Box */}
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-[#050205] border border-[#ffbd2e]/30 rounded p-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ffbd2e]/50" />
                <h3 className="text-[#ffbd2e] text-[9px] font-black tracking-widest mb-3 uppercase flex items-center gap-1">
                  <Gamepad2 size={10} /> ACTIVE MATCH
                </h3>
                <div className="space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-white">MATCH:</span>
                    <span className="text-[#ffbd2e]">#{matches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">MODE:</span>
                    <span className="text-[#ffbd2e]">BR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">PLAYERS:</span>
                    <span className="text-[#ffbd2e]">4/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">REMAINING:</span>
                    <span className="text-[#ffbd2e]">{timer}s</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#050205] border border-[#00e5ff]/30 rounded p-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00e5ff]/50" />
                <h3 className="text-[#00e5ff] text-[9px] font-black tracking-widest mb-3 uppercase flex items-center gap-1">
                   ENGINE STATUS
                </h3>
                <div className="space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-white">RUNNING:</span>
                    <span className="text-[#00e5ff]">{matches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">TOTAL:</span>
                    <span className="text-[#00e5ff]">{matches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">GLORY:</span>
                    <span className="text-[#00e5ff]">{glory}</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsSuccess(false);
                setGuildId('');
                setRegion('');
                setTimer(4270);
                setGlory(0);
                setMatches(1);
              }}
              className="mt-8 text-white/40 hover:text-white text-[9px] font-mono uppercase tracking-widest transition-colors"
            >
              [ BACK TO HOME ]
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[380px] p-6 rounded-xl bg-[#0a050a] border border-[#ff00aa]/30 neon-box flex flex-col items-center relative z-10"
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
                onChange={(e) => {
                  setGuildId(e.target.value);
                  setLaunchError('');
                }}
                className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-gray-300 font-mono text-xs focus:border-[#aa00ff] transition-all placeholder-gray-600 outline-none"
              />

              <div className="relative">
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-[#00e5ff] font-mono text-xs appearance-none focus:border-[#aa00ff] transition-all cursor-pointer outline-none"
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
                  className="w-full bg-black border border-[#7000ff] rounded p-2.5 text-[#00e5ff] font-mono text-xs appearance-none focus:border-[#aa00ff] transition-all cursor-pointer outline-none"
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
              
              {launchError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-[#ff0055]/10 border border-[#ff0055]/30 rounded p-2 text-[#ff0055] text-[9px] font-mono text-center uppercase"
                >
                  {launchError}
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full">
              <button 
                onClick={handleLaunch}
                disabled={guildId.length !== 10 || !region}
                className={`w-full bg-[#2a0815] hover:bg-[#3a0b1d] border border-[#ff0055]/70 rounded py-2.5 text-white font-black tracking-widest uppercase transition-all hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] text-xs cursor-pointer ${(guildId.length !== 10 || !region) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
