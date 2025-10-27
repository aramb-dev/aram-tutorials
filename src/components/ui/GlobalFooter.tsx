'use client';

import {
    BookOpen,
    Home,
    Mail,
    MessageCircle,
    User,
    Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/aram-tutorials-logo.png"
                  alt="Aram Tutorials Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-brand-primary">
                Aram Tutorials
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Comprehensive development tutorials and guides to help you master
              modern web technologies and build amazing applications.
            </p>
            <div className="flex gap-3">
              <a
                href="https://YouTube.com/@AramTutorials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:aramtutorials@gmail.com"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <User className="h-4 w-4" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Popular Topics</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tutorials?category=javascript"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  JavaScript
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials?category=react"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials?category=nextjs"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials?category=typescript"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials?category=css"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  CSS & Styling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:aramtutorials@gmail.com"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  aramtutorials@gmail.com
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-sm"
                >
                  Send a Message
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 text-sm mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-500 hover:text-gray-700 transition-colors text-xs"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-500 hover:text-gray-700 transition-colors text-xs"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Aram Tutorials. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with ❤️ for the developer community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
