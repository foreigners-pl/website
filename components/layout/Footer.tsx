import Link from 'next/link';
import { theme } from '@/lib/theme';
import SocialIcon from '../ui/SocialIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { href: '/', label: 'Home' },
    { href: '/services/immigration', label: 'Immigration' },
    { href: '/services/driving', label: 'Driving' },
    { href: '/services/business', label: 'Business' },
    { href: '/services/language', label: 'Language' },
    { href: '/services/studies', label: 'Studies' },
    { href: '/for-companies', label: 'For Companies' },
  ];

  const usefulLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/news', label: 'News' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms and Conditions of Service' },
    { href: '/faq', label: 'FAQ' },
    { href: '/documents', label: 'Documents' },
  ];

  const socialLinks = [
    {
      name: 'TikTok',
      href: 'https://tiktok.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className={`${theme.spacing.container} py-12 md:py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Service Links */}
          <div>
            <h3 className={`${theme.fontSize.lg} ${theme.fontWeight.bold} text-gray-900 mb-4`}>Service Links</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`text-gray-600 hover:text-[${theme.colors.primary}] ${theme.transition.default}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className={`${theme.fontSize.lg} ${theme.fontWeight.bold} text-gray-900 mb-4`}>Useful Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`text-gray-600 hover:text-[${theme.colors.primary}] ${theme.transition.default}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className={`${theme.fontSize.lg} ${theme.fontWeight.bold} text-gray-900 mb-4`}>Need help? Contact us</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${theme.radius.full} bg-[${theme.colors.primary}] flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:connect@foreigners.pl" className={`text-gray-600 hover:text-[${theme.colors.primary}] ${theme.transition.default}`}>
                  connect@foreigners.pl
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <span className={`text-white ${theme.fontSize.xs} ${theme.fontWeight.bold}`}>W</span>
                </div>
                <a href="https://wa.me/48123456789" className={`text-gray-600 hover:text-[${theme.colors.primary}] ${theme.transition.default}`}>
                  +48 123 456 789
                </a>
              </div>
            </div>

            <div>
              <h4 className={`${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-900 mb-3`}>Follow us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <SocialIcon key={social.name} href={social.href} label={social.name} icon={social.icon} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className={`${theme.fontSize.sm} text-gray-500`}>
            &copy; {currentYear} FOREIGNERS.pl Sp. z o.o. | NIP: 1234567890 | KRS: 0000123456 | REGON: 123456789
            <br className="md:hidden" />
            <span className="hidden md:inline"> | </span>
            ul. Marszałkowska 123, 00-001 Warsaw, Poland
          </p>
        </div>
      </div>
    </footer>
  );
}
