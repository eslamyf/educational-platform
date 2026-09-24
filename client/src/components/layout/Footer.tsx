import React from 'react';
import { Link } from 'wouter';
import { Logo } from '@/components/common/Logo';
import { footerColumns, footerCopyright, footerNote, footerTagline, researchDisclaimer } from '@/lib/data';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{footerTagline}</p>
            <span className="small muted">{footerNote}</span>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-links" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    {link === 'كل الكورسات' ? (
                      <Link href="/courses">{link}</Link>
                    ) : link === 'عن المنصة' ? (
                      <Link href="/how-it-works">{link}</Link>
                    ) : (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.info(`صفحة ${link} ستكون متاحة قريبًا`);
                        }}
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>{footerCopyright}</span>
          <span>{researchDisclaimer}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
