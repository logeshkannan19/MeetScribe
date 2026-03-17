import { Zap, Shield, Clock, CheckCircle, FileText } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MeetScribe AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary-600 transition-colors">Pricing</a>
          <button className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/10 px-4 py-2 rounded-full border border-primary-100 dark:border-primary-900/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Revolutionizing Meetings</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
          Turn meetings into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">clarity in seconds.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          Stop worrying about taking notes. Let AI summarize your meeting audio or transcripts into structured action items and summaries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-xl shadow-primary-500/25">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto glass border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            View Live Demo
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to stay organized</h2>
            <p className="text-slate-500 dark:text-slate-400">Capture every detail without losing focus on the conversation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Audio Transcription', desc: 'Upload MP3/WAV files for near-instant speech-to-text conversion.', icon: Clock },
              { title: 'AI Summaries', desc: 'Get structured bullet points and key discussion highlights.', icon: FileText },
              { title: 'Action Items', desc: 'Automatically detect tasks and responsibilities from the transcript.', icon: CheckCircle },
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                <div className="bg-primary-50 dark:bg-primary-900/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">Simple, transparent pricing</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Free Plan */}
            <div className="glass p-10 rounded-3xl border border-slate-200 dark:border-slate-800 w-full md:w-96 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Perfect for individuals</p>
              <div className="text-4xl font-extrabold mb-8">$0<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="text-left space-y-4 mb-10 flex-grow">
                {['3 meetings / month', 'Basic summarization', 'PDF export', '7-day history'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                Get Started
              </button>
            </div>
            {/* Pro Plan */}
            <div className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 p-10 rounded-3xl w-full md:w-96 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="opacity-60 mb-6 text-sm">For power users and teams</p>
              <div className="text-4xl font-extrabold mb-8">$19<span className="text-base font-normal opacity-60">/mo</span></div>
              <ul className="text-left space-y-4 mb-10 flex-grow">
                {['Unlimited meetings', 'Advanced AI insights', 'Team workspaces', 'Export to all formats', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/25">
                Go Pro Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-600" />
            <span className="text-lg font-bold">MeetScribe AI</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 MeetScribe AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
