"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  Globe,
  Zap,
  Check,
  FileText
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

interface LandingPageProps {
  onStart: () => void;
  onCreateCoverLetter: () => void;
}

export const LandingPage = ({ onStart, onCreateCoverLetter }: LandingPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 font-sans overflow-x-hidden relative">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 border border-blue-50">
              <img src="/favicon-brand.ico" alt="CVCraft Icon" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-blue-900 to-gray-900">
              CVCraft
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onCreateCoverLetter(); }}
              className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              {t.landing.createCoverLetter}
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-32 text-center md:text-left flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Badges & Benefits Section */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
                  <Zap className="w-4 h-4 fill-blue-700" /> {t.landing.buildCareerPath}
                </span>
              </div>

              {/* Benefits Pills */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-medium">
                  <Check className="w-3.5 h-3.5" /> {t.landing.atsFriendly}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs md:text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" /> {t.landing.aiSuggestions}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs md:text-sm font-medium">
                  <FileText className="w-3.5 h-3.5" /> {t.landing.instantPdf}
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] pt-4">
                {t.landing.heroTitle1} <br />
                <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">{t.landing.heroTitle2}</span> {t.landing.heroTitle3} <br />
                {t.landing.heroTitle4}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-medium"
            >
              {t.landing.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-6"
            >
              <Button
                onClick={onStart}
                className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95 group"
              >
                {t.landing.startBuildingNow}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            className="w-full md:flex-1 relative flex justify-center md:justify-end px-4 sm:px-0"
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-400/20 via-indigo-400/10 to-transparent blur-3xl -z-5 pointer-events-none" />

            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white w-full max-w-sm group transform-gpu"
              style={{
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(99, 102, 241, 0.15), 0 0 120px rgba(59, 130, 246, 0.1)',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                transformStyle: 'preserve-3d'
              }}>
              {/* Shine effect overlay */}
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                  transform: 'translateZ(10px)'
                }} />

              {/* 3D Frame effect */}
              <div className="absolute inset-0 border-2 border-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-2xl sm:rounded-3xl pointer-events-none"
                style={{
                  transform: 'translateZ(5px)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }} />

              <div className="bg-white aspect-4/5 p-0 relative">
                {/* Score Badge */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-linear-to-br from-blue-500 to-indigo-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/40 flex items-center gap-1 sm:gap-2 ring-2 ring-white/50 backdrop-blur-sm"
                  style={{
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35), inset 0 1px 2px rgba(255,255,255,0.2)'
                  }}>
                  <span className="hidden sm:inline text-xs">{t.landing.cvScore}</span>
                  <span className="text-base sm:text-xl font-black">92%</span>
                </div>

                {/* Sample CV Content */}
                <div className="h-full overflow-hidden flex flex-col bg-white p-3 sm:p-6 text-xs sm:text-sm relative">
                  {/* 3D Background Pattern */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                      linear-gradient(45deg, #3B82F6 25%, transparent 25%),
                      linear-gradient(-45deg, #3B82F6 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #3B82F6 75%),
                      linear-gradient(-45deg, transparent 75%, #3B82F6 75%)
                    `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }} />
                  </div>

                  {/* Header */}
                  <div className="border-b pb-3 sm:pb-4 mb-2 sm:mb-4 relative z-10">
                    <h2 className="text-base sm:text-xl font-black text-gray-900 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">Sarah Anderson</h2>
                    <p className="text-blue-600 font-bold text-xs sm:text-base">Senior Product Manager</p>
                    <div className="text-xs text-gray-500 mt-1 sm:mt-2 space-y-0.5 leading-tight">
                      <div className="flex items-center gap-1">📧 sarah@example.com</div>
                      <div className="flex items-center gap-1">📱 +1 (555) 123-4567</div>
                      <div className="flex items-center gap-1">📍 San Francisco, CA</div>
                      <div className="flex items-center gap-1">💼 linkedin.com/in/sarahanderson</div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="mb-2 sm:mb-3 relative z-10">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider border-b pb-1 mb-1 sm:mb-1.5 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">Summary</h3>
                    <p className="text-xs text-gray-700 leading-tight">Results-driven product manager with 7+ years experience in SaaS products. Led cross-functional teams to launch 5+ products generating $10M+ revenue.</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-2 sm:mb-3 relative z-10">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider border-b pb-1 mb-1 sm:mb-1.5 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">Experience</h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="bg-gradient-to-r from-blue-50/50 to-transparent p-2 rounded-lg">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="font-bold text-xs text-gray-900">Senior Product Manager</p>
                            <p className="text-xs text-gray-600">TechCorp, San Francisco</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap bg-blue-100 px-2 py-1 rounded-full">2022 - Now</span>
                        </div>
                        <ul className="text-xs text-gray-700 mt-0.5 space-y-0.5">
                          <li>• Led product roadmap increasing user retention 35%</li>
                          <li>• Managed $2M budget for product development</li>
                          <li>• Launched AI features adopted by 50K+ users</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-50/50 to-transparent p-2 rounded-lg">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="font-bold text-xs text-gray-900">Product Manager</p>
                            <p className="text-xs text-gray-600">StartupXYZ, Remote</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap bg-indigo-100 px-2 py-1 rounded-full">2019 - 2022</span>
                        </div>
                        <ul className="text-xs text-gray-700 mt-0.5 space-y-0.5">
                          <li>• Grew user base from 10K to 100K</li>
                          <li>• Reduced churn rate by 40%</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-2 sm:mb-3 relative z-10">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider border-b pb-1 mb-1 sm:mb-1.5 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">Education</h3>
                    <div className="space-y-1">
                      <div className="bg-gradient-to-r from-green-50/50 to-transparent p-2 rounded-lg">
                        <p className="font-bold text-xs text-gray-900">MBA, Business Administration</p>
                        <p className="text-xs text-gray-600">Stanford University • 2019</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50/50 to-transparent p-2 rounded-lg">
                        <p className="font-bold text-xs text-gray-900">BS, Computer Science</p>
                        <p className="text-xs text-gray-600">UC Berkeley • 2017</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider border-b pb-1 mb-1 sm:mb-1.5 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">Product Strategy</span>
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200">Analytics</span>
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded text-xs font-medium border border-green-200">Leadership</span>
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded text-xs font-medium border border-orange-200">Agile</span>
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 rounded text-xs font-medium border border-pink-200">User Research</span>
                    </div>
                  </div>

                  {/* 3D Decorative Elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-md" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-sm" />
                </div>
              </div>
            </div>

            {/* Decorative elements with enhanced 3D styling */}
            <motion.div
              animate={{
                rotateY: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="hidden sm:block absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-3xl -z-10 shadow-2xl shadow-indigo-400/50 blur-sm"
              style={{
                transform: 'perspective(1000px) rotateX(45deg) translateZ(-20px)',
                transformStyle: 'preserve-3d'
              }}
            />
            <motion.div
              animate={{
                rotateY: [0, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="hidden sm:block absolute -top-12 -right-6 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full -z-10 shadow-2xl shadow-yellow-400/40"
              style={{
                transform: 'perspective(1000px) translateZ(-15px)',
                transformStyle: 'preserve-3d'
              }}
            />

            {/* Enhanced floating accent dots with 3D effects */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                z: [0, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="hidden lg:block absolute -bottom-20 left-1/4 w-3 h-3 bg-blue-500 rounded-full blur-sm shadow-lg shadow-blue-500/50"
              style={{
                transform: 'perspective(1000px) translateZ(20px)',
                transformStyle: 'preserve-3d'
              }}
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                z: [0, -10, 0],
                rotateZ: [0, 180, 360]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="hidden lg:block absolute top-20 -right-20 w-2 h-2 bg-indigo-400 rounded-full blur-sm shadow-lg shadow-indigo-400/50"
              style={{
                transform: 'perspective(1000px) translateZ(15px)',
                transformStyle: 'preserve-3d'
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden lg:block absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full blur-md shadow-lg shadow-purple-400/30"
              style={{
                transform: 'perspective(1000px) translateZ(25px)',
                transformStyle: 'preserve-3d'
              }}
            />
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-blue-50">
                <img src="/favicon-brand.ico" alt="CVCraft Icon" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-bold text-gray-900">CVCraft</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} CVCraft. {t.landing.footerBuiltFor}
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
