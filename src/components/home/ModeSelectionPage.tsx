"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FilePlus, FileEdit, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

interface ModeSelectionPageProps {
  onCreateNew: () => void;
  onImproveExisting: () => void;
}

export const ModeSelectionPage = ({ onCreateNew, onImproveExisting }: ModeSelectionPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 tracking-tight text-black">
            {t.modeSelection.howToStart} <span className="text-blue-600">{t.modeSelection.start}</span>?
          </h1>
          <p className="text-xl text-black">{t.modeSelection.chooseOption}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create New CV Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FilePlus className="w-8 h-8 text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold mb-4 text-black">{t.modeSelection.createNewCv}</h2>
              <p className="text-gray-600 text-lg mb-8 flex-1">
                {t.modeSelection.createNewDesc}
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.stepByStep}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.realTimePreview}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.professionalTemplates}</span>
                </li>
              </ul>

              <Button
                onClick={onCreateNew}
                className="w-full h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-lg shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 group/btn"
              >
                {t.modeSelection.startBuilding}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* Improve Existing CV Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <FileEdit className="w-8 h-8 text-emerald-600" />
              </div>

              <h2 className="text-3xl font-bold mb-4 text-black">{t.modeSelection.improveExisting}</h2>
              <p className="text-gray-600 text-lg mb-8 flex-1">
                {t.modeSelection.improveDesc}
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.aiAnalysis}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.atsOptimization}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.modeSelection.contentEnhancement}</span>
                </li>
              </ul>

              <Button
                onClick={onImproveExisting}
                variant="outline"
                className="w-full h-14 rounded-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg transition-all hover:scale-105 active:scale-95 group/btn"
              >
                {t.modeSelection.reviewImprove}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 mt-10 text-sm"
        >
          {t.modeSelection.notSure}
        </motion.p>
      </div>
    </div>
  );
};
