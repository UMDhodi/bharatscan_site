import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Smartphone, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  RefreshCcw,
  LayoutDashboard,
  Monitor,
  Loader2
} from 'lucide-react';
import { FrustratedPerson, HappyScanner, FloatingItem } from './components/Doodles.tsx';

// Alias Smartphone to PhoneIcon internally to resolve naming conflict in imports
const PhoneIcon = Smartphone;

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ['#ffffff', '#ffffff', '#B6E3F4', '#f8fafc']);

  // Loading states for download buttons
  const [apkLoading, setApkLoading] = useState(false);
  const [exeLoading, setExeLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const retailers = [
    { name: 'D-Mart', logo: './dmart.png' },
    { name: 'Zudio', logo: './zudio.png' },
    { name: 'Reliance Smart', logo: './reliance.png' },
    { name: 'Westside', logo: './westside.png' }
  ];

  // Track active section for navbar highlighting
  useEffect(() => {
    const sections = ['hero', 'how-it-works', 'benefits', 'retailers', 'download'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is roughly in the center
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Helper function to keep the code clean
  const triggerFileDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  const handleDownload = async (type: 'apk' | 'exe') => {
    if (type === 'apk') {
      setApkLoading(true);
      // Simulate preparation time for the APK
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Trigger the APK download
      triggerFileDownload('/downloads/app-release.apk', 'BharatScan_Mobile.apk');
      
      setApkLoading(false);
    } else {
      setExeLoading(true);
      // Simulate preparation time for the Windows Setup
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Trigger the EXE download (The output from your Inno Setup)
      triggerFileDownload('/downloads/BharatScan_Admin.exe', 'BharatScan_Windows_Setup.exe');
      
      setExeLoading(false);
    }
    console.log(`Started download for ${type}`);
  };

  const navLinks = [
    { name: 'How it Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Benefits', href: '#benefits', id: 'benefits' },
    { name: 'For Retailers', href: '#retailers', id: 'retailers' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div style={{ backgroundColor: bgColor }} className="min-h-screen transition-colors duration-700">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#hero" 
            onClick={(e) => handleScrollTo(e, 'hero')}
            className="flex items-center gap-3 group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 overflow-hidden shadow-lg ${activeSection === 'hero' ? 'bg-brand-deep ring-2 ring-brand-deep/20' : 'bg-slate-400'}`}>
              <img src="./logo.png" alt="BharatScan QR Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-brand-deep">BharatScan</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={link.href} 
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`relative py-2 transition-colors duration-300 hover:text-brand-deep ${activeSection === link.id ? 'text-brand-deep font-bold' : 'text-slate-500 font-medium'}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-deep rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <a 
              href="#download" 
              onClick={(e) => handleScrollTo(e, 'download')}
              className={`px-6 py-2.5 rounded-full font-bold transition-all transform active:scale-95 ${
                activeSection === 'download' 
                ? 'bg-brand-sky text-brand-deep ring-4 ring-brand-sky/30 shadow-lg' 
                : 'bg-brand-deep text-white hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5'
              }`}
            >
              Download Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sky text-brand-deep font-bold text-sm mb-6">
              REVOLUTIONIZING RETAIL
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Skip the Queue, <br />
              <span className="text-brand-deep">Not the Shopping.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              The Pan India Smart Checkout System for the Modern Retailer. Scan items as you shop and pay instantly from your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-brand-deep text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
                onClick={(e) => handleScrollTo(e, 'download')}
              >
                Download Mobile App
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
              <button 
                onClick={(e) => handleScrollTo(e, 'how-it-works')}
                className="px-8 py-4 rounded-2xl font-bold text-lg text-brand-deep border-2 border-brand-sky hover:bg-brand-sky/30 transition-colors"
              >
                Watch Demo
              </button>
            </div>
          </motion.div>

          <div className="relative">
            {/* 3D-ish Phone Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 mx-auto w-full max-w-[320px] aspect-[9/18.5] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800"
            >
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
                <div className="h-6 w-1/3 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>
                <div className="p-6 pt-12 flex-1">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-xl text-brand-deep">Your Cart</span>
                    <ShoppingBag className="text-brand-deep" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { item: 'Milk 1L', price: '₹62', qty: '2' },
                      { item: 'Bread 400g', price: '₹45', qty: '1' },
                      { item: 'Zudio T-Shirt', price: '₹499', qty: '1' }
                    ].map((i, idx) => (
                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + (idx * 0.2) }}
                        key={idx} 
                        className="flex justify-between p-3 bg-slate-50 rounded-xl"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{i.item}</p>
                          <p className="text-xs text-slate-500">Qty: {i.qty}</p>
                        </div>
                        <p className="font-bold text-brand-deep">{i.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500 font-medium">Total</span>
                    <span className="font-black text-2xl text-slate-900">₹668.00</span>
                  </div>
                  <button className="w-full bg-brand-deep text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    Pay Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Parallax Floating Items */}
            <FloatingItems scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </header>

      {/* The Concept Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Traditional vs BharatScan</h2>
            <p className="text-slate-600 text-xl">We didn't just digitize the cashier; we eliminated the wait.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-200"
            >
              <div className="w-full aspect-square mb-8">
                <FrustratedPerson />
              </div>
              <h3 className="text-2xl font-bold mb-4">The Old Way</h3>
              <p className="text-slate-600">Long queues, scanning item by item at a slow counter, and manual bagging while everyone watches.</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-brand-deep text-white shadow-2xl shadow-blue-200"
            >
              <div className="w-full aspect-square mb-8">
                <HappyScanner />
              </div>
              <h3 className="text-2xl font-bold mb-4">The BharatScan Way</h3>
              <p className="text-blue-100">BharatScan turns every smartphone into a private checkout counter. Scan, Pay, and leave no queue required.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Simple as 1-2-3</h2>
            <p className="text-xl text-slate-600">Download the app and start shopping smarter today.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-deep/10 hidden md:block -z-10 -translate-y-1/2"></div>
            
            {[
              { 
                step: 1, 
                title: "Scan", 
                desc: "Point your phone camera at the item barcode. The cart updates in real-time.", 
                icon: <Smartphone className="text-white" size={32} />
              },
              { 
                step: 2, 
                title: "Pay", 
                desc: "Choose your favorite UPI, Card, or Wallet for a one-tap secure checkout.", 
                icon: <CreditCard className="text-white" size={32} />
              },
              { 
                step: 3, 
                title: "Go", 
                desc: "Show your digital receipt QR to the gate assistant and walk right out.", 
                icon: <CheckCircle className="text-white" size={32} />
              }
            ].map((step, idx) => (
              <motion.div 
                variants={stepVariants}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
                key={idx} 
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center flex flex-col items-center group transition-all"
              >
                <div className="w-20 h-20 bg-brand-deep rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20 group-hover:scale-110 group-hover:bg-brand-accent transition-all duration-300">
                  {step.icon}
                </div>
                <div className="bg-brand-sky text-brand-deep w-10 h-10 rounded-full flex items-center justify-center font-black mb-4 group-hover:bg-brand-deep group-hover:text-white transition-colors duration-300">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black mb-4">Smarter. Faster. Private.</h2>
            <p className="text-slate-600 text-lg">Designed for the modern retail experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-1 bg-brand-deep p-10 rounded-[2.5rem] text-white flex flex-col justify-between overflow-hidden relative group">
              <RefreshCcw className="absolute -right-8 -top-8 text-blue-800 w-48 h-48 group-hover:rotate-45 transition-transform duration-700" />
              <div>
                <h3 className="text-3xl font-black mb-4">Real-time Sync</h3>
                <p className="text-blue-100 text-lg max-w-md">Watch your subtotal update instantly as you add or remove items. No budget surprises at the gate.</p>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-12 bg-brand-sky rounded-full"></div>
                <div className="h-2 w-4 bg-blue-700 rounded-full"></div>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-between overflow-hidden group">
              <ShieldCheck className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Total Privacy</h3>
                <p className="text-slate-400">No chatty cashiers or slow manual tallies. Just you and your shop.</p>
              </div>
            </div>

            <div className="bg-brand-sky p-10 rounded-[2.5rem] text-brand-deep flex flex-col justify-between group">
              <Zap className="text-brand-deep fill-brand-deep mb-4 group-hover:scale-125 transition-transform" size={48} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Zero-Wait Speed</h3>
                <p className="text-slate-700">Go from 'In-Store' to 'Out-the-Door' in seconds. The fastest checkout in India.</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white border border-slate-200 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-black mb-4">Universal Coverage</h3>
                <p className="text-slate-600 text-lg">Use BharatScan across major retailers like D-Mart, Zudio, Reliance Smart, and Westside. One app, thousands of stores.</p>
              </div>
              <div className="flex -space-x-4">
                {retailers.map((store, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-16 rounded-full border-4 border-white bg-white shadow-sm flex items-center justify-center overflow-hidden"
                  >
                    <img 
                      src={store.logo} 
                      className="w-10 h-10 object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Retailers */}
      <section id="retailers" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-deep/20 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-sky font-bold mb-4 block">B2B ENTERPRISE</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Empower Your <br />Store Managers</h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Monitor live traffic, active carts, and total sales across your entire retail chain in one unified dashboard. Reduce overhead and eliminate shrinkage.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Live Store Monitor Desktop App",
                "Advanced AI Shrinkage Prevention",
                "Automated Inventory Re-ordering",
                "Customer Heatmap Analytics"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-sky/20 flex items-center justify-center">
                    <CheckCircle className="text-brand-sky" size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/10 transition-all active:scale-95">
              Contact Sales
            </button>
          </div>

          <motion.div 
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 100, opacity: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-4 rounded-3xl border border-slate-700 shadow-3xl"
          >
            <div className="bg-slate-900 rounded-2xl p-6 aspect-video flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="text-brand-sky" />
                  <span className="font-bold">Manager Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-slate-800 rounded-xl p-4 flex flex-col justify-between border border-slate-700/50">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Live Active Carts</span>
                  <span className="text-3xl font-black text-brand-sky">1,248</span>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 flex flex-col justify-between border border-slate-700/50">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Daily Revenue</span>
                  <span className="text-3xl font-black text-emerald-400">₹4.2M</span>
                </div>
                <div className="col-span-2 bg-slate-800/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-brand-sky animate-pulse"></div>
                    <span className="text-sm font-medium">System healthy</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">Uptime: 99.99%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Download Hub */}
      <footer id="download" className="py-24 bg-brand-deep relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-sky/20 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Start Scanning Now</h2>
            <p className="text-xl text-blue-200">The future of retail is in your pocket.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Android Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:bg-white/10"
            >
              {/* ICON CONTAINER */}
              <div className="w-24 h-24 rounded-3xl bg-brand-sky flex items-center justify-center mb-8 shadow-xl shadow-blue-400/20 group-hover:scale-110 transition-transform">
                <PhoneIcon className="text-brand-deep" size={48} />
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-3xl font-black text-white mb-4">Mobile App</h3>
              <p className="text-blue-100 mb-8">Download for Android to start shopping faster instantly.</p>

              {/* DOWNLOAD BUTTON */}
              <button 
                onClick={() => handleDownload('apk')}
                disabled={apkLoading}
                className={`w-full bg-white text-brand-deep py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 
                  ${apkLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-2xl shadow-white/10'}`}
              >
                {apkLoading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    Download APK
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </motion.div>

            {/* Windows Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:bg-white/10"
            >
              <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center mb-8 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform">
                <Monitor className="text-brand-sky" size={48} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Store Dashboard</h3>
              <p className="text-blue-100 mb-8">For retailers looking to integrate our management suite.</p>
              <button 
                onClick={() => handleDownload('exe')}
                disabled={exeLoading}
                className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${exeLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-2xl shadow-black/10'}`}
              >
                {exeLoading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Initialising...
                  </>
                ) : (
                  <>
                    Download (.exe)
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <a 
                href="#hero" 
                onClick={(e) => handleScrollTo(e, 'hero')}
                className="w-9 h-9 bg-brand-sky rounded-lg flex items-center justify-center overflow-hidden shadow-sm"
              >
                <img src="logo.png" alt="BharatScan Logo" className="w-full h-full object-cover" />
              </a>
              <span className="text-xl font-black text-white">BharatScan</span>
            </div>
            <div className="flex gap-10 text-blue-200 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>
            <p className="text-blue-300/60 text-sm">© 2024 BharatScan Technologies Pvt. Ltd.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

const FloatingItems = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // Items move toward the center phone as user scrolls
  const y1 = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const x1 = useTransform(scrollYProgress, [0, 0.3], [-300, -100]);
  const y2 = useTransform(scrollYProgress, [0, 0.3], [-100, 200]);
  const x2 = useTransform(scrollYProgress, [0, 0.3], [300, 150]);
  const y3 = useTransform(scrollYProgress, [0, 0.3], [300, 400]);
  const x3 = useTransform(scrollYProgress, [0, 0.3], [-200, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      <motion.div style={{ y: y1, x: x1 }} className="absolute">
        <FloatingItem type="milk" />
      </motion.div>
      <motion.div style={{ y: y2, x: x2 }} className="absolute">
        <FloatingItem type="shirt" />
      </motion.div>
      <motion.div style={{ y: y3, x: x3 }} className="absolute">
        <FloatingItem type="qr" />
      </motion.div>
    </div>
  );
};

export default App;
