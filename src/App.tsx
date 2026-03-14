import { motion } from "motion/react";
import { Github, Globe, Rocket, Code2 } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-emerald-600">
            <Code2 size={24} />
            <span>DevLab</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Process</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
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
              icon: <Code2 className="text-emerald-500" size={32} />,
              color: "bg-emerald-50"
            },
            {
              title: "2. Push",
              desc: "Upload the code to a GitHub repository for version control.",
              icon: <Github className="text-blue-500" size={32} />,
              color: "bg-blue-50"
            },
            {
              title: "3. Deploy",
              desc: "Connect the repository to a hosting service for live access.",
              icon: <Rocket className="text-purple-500" size={32} />,
              color: "bg-purple-50"
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow"
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
      </main>

      <footer className="border-t border-zinc-200 py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2026 Web Dev Learning Lab. Built for testing and learning.</p>
        </div>
      </footer>
    </div>
  );
}
