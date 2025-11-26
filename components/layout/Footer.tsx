import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/5">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary rounded-full p-2">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M11 18.5V16.5C11 14.29 9.21 12.5 7 12.5C4.79 12.5 3 14.29 3 16.5V18.5M11 18.5H3M21 18.5V16.5C21 14.29 19.21 12.5 17 12.5C14.79 12.5 13 14.29 13 16.5V18.5M21 18.5H13M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-2xl font-display uppercase tracking-wider text-white">
            Smash Burgers
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/menu"
            className="text-white/60 font-medium hover:text-primary transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/locations"
            className="text-white/60 font-medium hover:text-primary transition-colors"
          >
            Locations
          </Link>
          <Link
            href="/contact"
            className="text-white/60 font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-white/60 font-medium hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-white/40">Social Media Coming Soon</p>
          <div className="flex justify-center gap-6 opacity-40">
            <div
              className="text-white/40 cursor-not-allowed"
              aria-label="Instagram (Coming Soon)"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M12.315 2c-4.09.022-5.468.166-7.382.918-1.93.754-3.27 2.08-4.02 4.018C.17 8.84 0 10.21 0 14.3s.17 5.46.91 7.38c.75 1.93 2.09 3.27 4.02 4.02 1.91.75 3.29.9 7.38.91 4.09-.02 5.47-.16 7.38-.91 1.93-.75 3.27-2.09 4.02-4.02.74-1.91.9-3.29.9-7.38s-.16-5.47-.9-7.38c-.75-1.93-2.09-3.27-4.02-4.02C17.785 2.166 16.405 2.022 12.315 2zm-1.01 1.8h2.4c4.14 0 5.28.16 7.1.88 1.48.58 2.5 1.6 3.08 3.08.72 1.82.88 2.96.88 7.1s-.16 5.28-.88 7.1c-.58 1.48-1.6 2.5-3.08 3.08-1.82.72-2.96.88-7.1.88h-2.4c-4.14 0-5.28-.16-7.1-.88-1.48-.58-2.5-1.6-3.08-3.08-.72-1.82-.88-2.96-.88-7.1s.16-5.28.88-7.1c.58-1.48 1.6-2.5 3.08-3.08 1.82-.72 2.96-.88 7.1-.88z"
                  fillRule="evenodd"
                />
                <path d="M11.3 7.725c-2.95 0-5.35 2.4-5.35 5.35s2.4 5.35 5.35 5.35 5.35-2.4 5.35-5.35-2.4-5.35-5.35-5.35zm0 8.9c-1.96 0-3.55-1.59-3.55-3.55s1.59-3.55 3.55-3.55 3.55 1.59 3.55 3.55-1.59 3.55-3.55 3.55z" />
                <circle cx="17.73" cy="6.27" r="1.3" />
              </svg>
            </div>
            <div
              className="text-white/40 cursor-not-allowed"
              aria-label="Facebook (Coming Soon)"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div
              className="text-white/40 cursor-not-allowed"
              aria-label="Twitter (Coming Soon)"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/40">
          © 2024 Smash Burgers. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
