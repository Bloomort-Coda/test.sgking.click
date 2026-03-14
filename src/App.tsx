import { motion } from "motion/react";
import { Github, Globe, Rocket, Code2, LogOut, User } from "lucide-react";
import { useState } from "react";
import GoogleLogin from "./components/GoogleLogin";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "process" | "about">("home");

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "process":
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
          <>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
                Simple Web Learning Project
              </h1>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Testing the workflow from local development to GitHub, and finally to production hosting.
              </p>
            </motion.div>

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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="p-8 rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                >
                  <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Status Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-zinc-900 text-white p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
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
            </motion.div>
          </>
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
            <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-500">
              <button 
                onClick={() => setCurrentPage("home")}
                className={`hover:text-emerald-600 transition-colors ${currentPage === 'home' ? 'text-emerald-600' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage("process")}
                className={`hover:text-emerald-600 transition-colors ${currentPage === 'process' ? 'text-emerald-600' : ''}`}
              >
                Process
              </button>
              <button 
                onClick={() => setCurrentPage("about")}
                className={`hover:text-emerald-600 transition-colors ${currentPage === 'about' ? 'text-emerald-600' : ''}`}
              >
                About
              </button>
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
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

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
