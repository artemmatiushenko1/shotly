import { Logo } from '@shotly/ui/components/logo';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-white border-gray-200 py-12 mt-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Logo className="h-10" variant="contrast" />
          <p className="mt-4 text-gray-500 text-sm max-w-xs">
            The easiest way to find and book professional photographers for any
            occasion. Built for quality and trust.
          </p>
          <div className="pt-8 text-left text-sm text-muted-foreground">
            &copy; 2025 Shotly Inc. All rights reserved.
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="#">Help Center</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
