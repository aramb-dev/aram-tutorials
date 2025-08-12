'use client';

import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Cpu, Database, Globe } from 'lucide-react';
import { TutorialsSearch } from './TutorialsSearch';

const popularTopics = [
  {
    name: 'React',
    icon: Code,
    color: 'bg-brand-primary/20 text-brand-primary border-brand-primary/30',
  },
  {
    name: 'Next.js',
    icon: Globe,
    color: 'bg-brand-light/20 text-brand-light border-brand-light/30',
  },
  {
    name: 'Node.js',
    icon: Cpu,
    color: 'bg-brand-lighter/20 text-brand-lighter border-brand-lighter/30',
  },
  {
    name: 'Database',
    icon: Database,
    color: 'bg-brand-lightest/20 text-brand-lightest border-brand-lightest/30',
  },
];

export function TutorialsHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker text-white">
      {/* Dynamic Brand Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-brand-primary/30 rounded-lg transform rotate-12"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-brand-primary/30 rounded-lg transform -rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-brand-primary/30 rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-brand-primary/30 rounded-lg transform -rotate-45"></div>

        {/* Circuit-like connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400">
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="#2E5E15"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M100,300 Q400,200 700,300"
            stroke="#2E5E15"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-brand-primary/30 rounded-xl flex items-center justify-center border border-brand-primary/50 backdrop-blur-sm">
                <BookOpen className="h-8 w-8 text-brand-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary rounded-full animate-pulse"></div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Tutorials
              </h1>
              <p className="text-brand-lighter font-medium text-lg">
                Tech Made Simple
              </p>
            </div>
          </div>

          <p className="text-xl text-slate-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover our curated collection of programming tutorials and web
            development guides. From beginner-friendly introductions to advanced
            techniques, find exactly what you need to level up your skills.
          </p>

          {/* Enhanced Search Experience */}
          <div className="max-w-2xl mx-auto mb-12">
            <TutorialsSearch />
          </div>

          {/* Interactive Topic Tags */}
          <div className="mb-8">
            <p className="text-sm text-slate-200 mb-4">
              Popular topics to get you started:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {popularTopics.map(topic => {
                const IconComponent = topic.icon;
                return (
                  <button
                    key={topic.name}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${topic.color}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Authentic Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge
              variant="secondary"
              className="bg-brand-primary/30 text-white border-brand-primary/50 px-4 py-2 text-sm"
            >
              21 Tutorials
            </Badge>
            <Badge
              variant="secondary"
              className="bg-brand-primary/30 text-white border-brand-primary/50 px-4 py-2 text-sm"
            >
              5,700+ Views
            </Badge>
            <Badge
              variant="secondary"
              className="bg-brand-primary/30 text-white border-brand-primary/50 px-4 py-2 text-sm"
            >
              Always Free
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
