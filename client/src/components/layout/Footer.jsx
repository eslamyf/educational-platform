import React from 'react';
import { Link } from 'wouter';
import { Logo } from '@/components/common/Logo';
import { footerColumns, footerCopyright, footerNote, footerTagline, researchDisclaimer } from '@/lib/data';
import { toast } from 'sonner';
export const Footer = () => {
    const handleFooterLinkClick = (e, link) => {
        if (link.includes('تواصل') || link.includes('الدعم')) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('open-whatsapp'));
            return;
        }

        if (link === 'كيفية الاشتراك في الكورس' || link === 'كيفية الاشتراك') {
            e.preventDefault();
            const howEl = document.getElementById('how');
            if (howEl) {
                howEl.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#how');
            } else {
                window.location.href = '/#how';
            }
            return;
        }

        if (link === 'المعلمون والخبراء') {
            return; // handled by Link
        }

        e.preventDefault();
        toast.info(`صفحة ${link} ستكون متاحة قريبًا`);
    };

    return (
        <footer className="footer" dir="rtl">
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
                                        {link === 'كل الكورسات' || link === 'المناهج الدراسية' ? (
                                            <Link href="/courses">{link}</Link>
                                        ) : link === 'عن المنصة' ? (
                                            <Link href="/about">{link}</Link>
                                        ) : link === 'المعلمون والخبراء' ? (
                                            <Link href="/courses">{link}</Link>
                                        ) : link.includes('تواصل') || link.includes('الدعم') ? (
                                            <button
                                                type="button"
                                                className="footer-action-link"
                                                onClick={(e) => handleFooterLinkClick(e, link)}
                                            >
                                                {link}
                                            </button>
                                        ) : (
                                            <a
                                                href="#"
                                                onClick={(e) => handleFooterLinkClick(e, link)}
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
