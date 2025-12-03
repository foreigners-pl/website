'use client';

import Link from 'next/link';
import { useState } from 'react';
import { theme } from '@/lib/theme';
import Button from '../ui/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/offices', label: 'Offices' },
    { href: '/consultation', label: 'Consultation' },
    { href: '/for-companies', label: 'For Companies' },
  ];

  return (
    <nav className={`bg-white ${theme.shadow.sm} sticky top-0 z-50`}>
      <div className={theme.spacing.container}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-[${theme.colors.primary}] ${theme.radius.full} flex items-center justify-center text-white ${theme.fontWeight.bold} ${theme.fontSize.sm}`}>
                F
              </div>
              <span className={`${theme.fontSize.xl} ${theme.fontWeight.bold} text-gray-800`}>FOREIGNERS.pl</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-[${theme.colors.primary}] px-3 py-2 ${theme.fontSize.sm} ${theme.fontWeight.medium} ${theme.transition.default}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* WhatsApp Button - Desktop */}
          <div className="hidden md:flex">
            <Button href="https://wa.me/1234567890" variant="primary" size="md">
              <div className={`w-5 h-5 bg-white ${theme.radius.full} flex items-center justify-center`}>
                <span className={`text-[${theme.colors.primary}] ${theme.fontSize.xs} ${theme.fontWeight.bold}`}>W</span>
              </div>
              WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button href="https://wa.me/1234567890" variant="primary" size="sm">
              <div className={`w-4 h-4 bg-white ${theme.radius.full} flex items-center justify-center`}>
                <span className={`text-[${theme.colors.primary}] ${theme.fontSize.xs} ${theme.fontWeight.bold}`}>W</span>
              </div>
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`text-gray-700 hover:text-[${theme.colors.primary}] focus:outline-none`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-gray-700 hover:text-[${theme.colors.primary}] hover:bg-gray-50 px-3 py-2 ${theme.radius.md} ${theme.fontSize.base} ${theme.fontWeight.medium}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
