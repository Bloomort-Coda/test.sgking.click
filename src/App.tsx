import { motion, AnimatePresence } from "motion/react";
import { Github, Globe, Rocket, Code2, LogOut, User, Clock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import GoogleLogin from "./components/GoogleLogin";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "process" | "about">("home");
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    if (!user) return;

    const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
    let timeoutId: any;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
        setSessionExpired(true);
        // Auto-clear the message after 10 seconds
        setTimeout(() => setSessionExpired(false), 10000);
      }, TIMEOUT_MS);
    };

    // Initial start
    resetTimer();

    // Listen for activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimer();
    
    events.forEach(event => document.addEventListener(event, handleActivity));

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, handleActivity));
    };
  }, [user, handleLogout]);

  const renderContent = () => {
    switch (currentPage) {
      case "process":
        return (
          <motion.div 
            key="process"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">How we take ideas from local development to global production.</p>
            </div>
            <div className="grid gap-8">
              {[
                { step: "01", title: "Local Development", desc: "Writing code in a local environment using React and Tailwind CSS." },
                { step: "02", title: "Version Control", desc: "Pushing code to GitHub to track changes and collaborate." },
                { step: "03", title: "Automated Build", desc: "GitHub Actions triggers a build process to prepare the site for production." },
                { step: "04", title: "FTP Deployment", desc: "The final files are securely transferred to Hostinger servers." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-zinc-200 shadow-md">
                  <span className="text-4xl font-black text-emerald-300/50">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "about":
        return (
          <motion.div 
            key="about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">About DevLab</h2>
              <p className="text-zinc-600">A learning project focused on modern web workflows.</p>
            </div>
            <div className="prose prose-zinc bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-zinc-200 shadow-md">
              <p>
                DevLab was created as a testing ground for full-stack web development workflows. 
                Our goal is to master the tools that power the modern web, from frontend frameworks 
                like React to deployment pipelines and cloud hosting.
              </p>
              <p>
                This project specifically explores the integration of Google OAuth for secure 
                authentication and GitHub Actions for continuous deployment to shared hosting 
                environments like Hostinger.
              </p>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
                Simple Web Learning Project
              </h1>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Testing the workflow from local development to GitHub, and finally to production hosting.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "1. Build",
                  desc: "Create a simple website using modern JavaScript and React.",
                  icon: <Code2 className="text-emerald-600" size={32} />,
                  color: "bg-emerald-100"
                },
                {
                  title: "2. Push",
                  desc: "Upload the code to a GitHub repository for version control.",
                  icon: <Github className="text-blue-600" size={32} />,
                  color: "bg-blue-100"
                },
                {
                  title: "3. Deploy",
                  desc: "Connect the repository to a hosting service for live access.",
                  icon: <Rocket className="text-purple-600" size={32} />,
                  color: "bg-purple-100"
                }
              ].map((step, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                >
                  <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Status Card */}
            <div className="bg-zinc-900 text-white p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Globe size={24} className="text-emerald-400" />
                  Current Status: Live
                </h2>
                <p className="text-zinc-400">The site is successfully deployed and ready for changes.</p>
              </div>
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold rounded-xl transition-all active:scale-95">
                Test Redeploy
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 font-semibold text-emerald-600 hover:opacity-80 transition-opacity"
          >
            <Code2 size={24} />
            <span>DevLab</span>
          </button>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              {[
                { id: "home", label: "Home" },
                { id: "process", label: "Process" },
                { id: "about", label: "About" }
              ].map((page) => (
                <button 
                  key={page.id}
                  onClick={() => setCurrentPage(page.id as any)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-lg ${
                    currentPage === page.id ? 'text-emerald-700' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {currentPage === page.id && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm border border-zinc-200 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{page.label}</span>
                </button>
              ))}
            </div>
            
            {user ? (
              <div className="flex items-center gap-3 pl-6 border-l border-zinc-200">
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-zinc-200" referrerPolicy="no-referrer" />
                <button 
                  onClick={handleLogout}
                  className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="pl-6 border-l border-zinc-200">
                <GoogleLogin 
                  onSuccess={(u) => { setUser(u); setError(null); }} 
                  onError={(err) => setError(err)} 
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          {sessionExpired && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm flex items-center gap-3"
            >
              <Clock size={18} />
              <span>Your session has expired due to 30 minutes of inactivity. Please log in again.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {user && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 text-lg">Welcome back, {user.name}!</h3>
              <p className="text-emerald-700 text-sm">You are successfully logged in via Google.</p>
            </div>
          </motion.div>
        )}

        {renderContent()}
      </main>

      <footer className="border-t border-zinc-200 py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2026 Web Dev Learning Lab. Built for testing and learning.</p>
        </div>
      </footer>
    </div>
  );
}
