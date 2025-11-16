import React from 'react';
import { PageProps } from '../types';
import { BriefcaseIcon, HomeIcon, LogoIcon, ArrowRightIcon, BrainCircuitIcon, GlobeAltIcon, ScaleIcon, UsersIcon } from '../components/icons';
import Header from '../components/Header';

const LandingPage: React.FC<PageProps> = ({ setActivePage }) => {

  const scrollToSelection = () => {
    document.getElementById('portal-selection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setActivePage={setActivePage} isAuthenticated={false} user={null} onLogout={() => {}} />
      
      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center p-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop')"}}></div>
         <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/50 via-brand-blue-dark/80 to-brand-blue-dark"></div>

        <div className="relative z-10 max-w-4xl mt-16 mb-16">
          <LogoIcon className="w-24 h-24 text-brand-gold mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold font-jura text-white">
            Build<span className="text-brand-gold">Link</span>
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Revolutionizing Architecture Through Artificial Intelligence. Your bridge between vision and reality.
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            An advanced architecture and home design platform that transforms how we create, collaborate, and construct living spaces through intelligent automation and seamless professional integration.
          </p>
          <div className="mt-10">
            <button
              onClick={scrollToSelection}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-brand-gold px-8 py-4 text-xl font-bold text-brand-blue-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold-light focus:ring-offset-2 focus:ring-offset-brand-blue-dark hover:shadow-lg hover:shadow-brand-gold/20"
            >
              <span className="absolute -inset-full top-0 block -translate-y-full transform bg-brand-gold-light opacity-40 transition-all duration-500 group-hover:translate-y-0" />
              <span className="relative flex items-center gap-3">
                Get Started <ArrowRightIcon className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"/>
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Problem Section */}
      <section className="py-20 bg-brand-blue-dark/40">
          <div className="container mx-auto px-8">
              <h2 className="text-4xl font-bold font-jura text-center text-white mb-12">The Architecture Industry's Critical Challenge</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light/50 p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300">
                      <h3 className="text-2xl font-jura text-brand-gold mb-3">High Financial Barriers</h3>
                      <p className="text-slate-300">Personalized services cost $15,000-$50,000, making professional design inaccessible to middle-income families who comprise 70% of the housing market.</p>
                  </div>
                  <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light/50 p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300">
                      <h3 className="text-2xl font-jura text-brand-gold mb-3">Visualization Disconnect</h3>
                      <p className="text-slate-300">Homeowners struggle to interpret 2D blueprints, leading to costly mid-construction changes that increase project costs by 20-40%.</p>
                  </div>
                  <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light/50 p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300">
                      <h3 className="text-2xl font-jura text-brand-gold mb-3">Fragmented Workflows</h3>
                      <p className="text-slate-300">Architects, designers, and engineers operate in silos with incompatible software, causing communication gaps, errors, and delays.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-4xl font-bold font-jura text-white mb-6">A Complete Ecosystem Solution</h2>
              <p className="text-slate-400 mb-8">BuildLink integrates cutting-edge AI to overcome traditional barriers, creating a unified and intelligent platform for everyone involved in the building process.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-brand-gold/10 rounded-full mt-1"><BrainCircuitIcon className="w-6 h-6 text-brand-gold" /></div>
                  <div>
                    <h4 className="font-bold text-lg text-white">AI-Powered Design Generation</h4>
                    <p className="text-slate-400">Creates comprehensive floor plans, 3D models, and styled interiors in real-time, optimizing for site data and environmental conditions.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <div className="p-2 bg-brand-gold/10 rounded-full mt-1"><UsersIcon className="w-6 h-6 text-brand-gold" /></div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Integrated Professional Platform</h4>
                    <p className="text-slate-400">Connects clients with verified architects and engineers in a unified workspace with real-time collaboration tools.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="Architects collaborating" className="rounded-lg shadow-2xl shadow-brand-blue-dark" />
            </div>
          </div>
        </div>
      </section>

       {/* Core Capabilities Section */}
      <section className="py-20 bg-brand-blue-dark/40">
          <div className="container mx-auto px-8">
              <h2 className="text-4xl font-bold font-jura text-center text-white mb-12">Core Platform Capabilities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  <div className="bg-brand-blue-dark/50 backdrop-blur-lg p-6 rounded-xl border border-transparent hover:border-brand-gold/20 transition-colors">
                      <BrainCircuitIcon className="w-10 h-10 text-brand-gold mb-4" />
                      <h3 className="text-xl font-jura text-white mb-2">Intelligent Design Automation</h3>
                      <p className="text-slate-400 text-sm">Generate optimized layouts considering topography, climate, and local codes.</p>
                  </div>
                   <div className="bg-brand-blue-dark/50 backdrop-blur-lg p-6 rounded-xl border border-transparent hover:border-brand-gold/20 transition-colors">
                      <UsersIcon className="w-10 h-10 text-brand-gold mb-4" />
                      <h3 className="text-xl font-jura text-white mb-2">Licensed Professional Network</h3>
                      <p className="text-slate-400 text-sm">Connect with verified architects who showcase portfolios and provide expert validation.</p>
                  </div>
                   <div className="bg-brand-blue-dark/50 backdrop-blur-lg p-6 rounded-xl border border-transparent hover:border-brand-gold/20 transition-colors">
                      <ScaleIcon className="w-10 h-10 text-brand-gold mb-4" />
                      <h3 className="text-xl font-jura text-white mb-2">Site Analysis & Material Intelligence</h3>
                      <p className="text-slate-400 text-sm">Comprehensive evaluation of soil, slope, and climate to recommend optimal materials.</p>
                  </div>
                   <div className="bg-brand-blue-dark/50 backdrop-blur-lg p-6 rounded-xl border border-transparent hover:border-brand-gold/20 transition-colors">
                      <GlobeAltIcon className="w-10 h-10 text-brand-gold mb-4" />
                      <h3 className="text-xl font-jura text-white mb-2">Multilingual Global Accessibility</h3>
                      <p className="text-slate-400 text-sm">Cloud-based platform with multi-language support breaks down geographic barriers.</p>
                  </div>
              </div>
          </div>
      </section>

       {/* Portal Selection Section */}
      <section id="portal-selection" className="py-20">
        <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold font-jura text-white mb-4">Join as a Client or Architect</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">Whether you're bringing a dream home to life or offering your professional expertise, your journey starts here.</p>
            <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
              {/* User Portal Card */}
              <div className="flex-1 bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col hover:border-brand-gold/50">
                <HomeIcon className="w-16 h-16 mx-auto text-brand-gold mb-4" />
                <h3 className="text-3xl font-jura text-white mb-4">For Clients</h3>
                <p className="text-slate-300 mb-8 flex-grow">Access AI-powered design tools, visualize your project in 3D, and connect with licensed professionals to turn your vision into reality.</p>
                <button
                  onClick={() => setActivePage('register')}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-brand-gold px-8 py-3 text-lg font-bold text-brand-blue-dark hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300"
                >
                   <span className="absolute -inset-full top-0 block -translate-y-full transform bg-brand-gold-light opacity-40 transition-all duration-500 group-hover:translate-y-0" />
                   <span className="relative">
                    Get Started as a Client
                   </span>
                </button>
              </div>

              {/* Architect Portal Card */}
               <div className="flex-1 bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col hover:border-brand-gold/50">
                <BriefcaseIcon className="w-16 h-16 mx-auto text-brand-gold mb-4" />
                <h3 className="text-3xl font-jura text-white mb-4">For Architects</h3>
                <p className="text-slate-300 mb-8 flex-grow">Showcase your portfolio, connect with a global client base, and utilize our integrated platform to streamline your workflow and collaboration.</p>
                <button
                  onClick={() => setActivePage('register')}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-brand-gold px-8 py-3 text-lg font-bold text-brand-blue-dark hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300"
                >
                   <span className="absolute -inset-full top-0 block -translate-y-full transform bg-brand-gold-light opacity-40 transition-all duration-500 group-hover:translate-y-0" />
                   <span className="relative">
                     Get Started as an Architect
                   </span>
                </button>
              </div>
            </div>
        </div>
      </section>

      <footer className="bg-brand-blue-dark/50 border-t border-brand-gold/20 py-6">
        <div className="container mx-auto px-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} BuildLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;