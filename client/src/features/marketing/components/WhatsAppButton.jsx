import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppButton = ({
    phoneNumber = '201028103634',
    defaultMessage = 'مرحبًا منصة نَوَى، أود الاستفسار عن الكورسات والاشتراكات ومناهج الثانوية العامة.',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setIsPulsing(true);
            const widget = document.getElementById('nawa-whatsapp-widget');
            if (widget) {
                widget.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
            setTimeout(() => setIsPulsing(false), 2000);
        };

        window.addEventListener('open-whatsapp', handleOpen);
        return () => window.removeEventListener('open-whatsapp', handleOpen);
    }, []);

    const handleSend = (e) => {
        e?.preventDefault();
        const textToSend = message.trim() || defaultMessage;
        const encodedText = encodeURIComponent(textToSend);
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        const url = `https://wa.me/${cleanNumber}?text=${encodedText}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
    };

    return (
        <div id="nawa-whatsapp-widget" className={`whatsapp-widget ${isPulsing ? 'pulse-highlight' : ''}`} dir="rtl">
            {/* Popover Card */}
            {isOpen && (
                <div className="whatsapp-popover animate-in">
                    <div className="whatsapp-header">
                        <div className="whatsapp-header-avatar">
                            <div className="whatsapp-avatar-icon">
                                <MessageCircle size={20} />
                            </div>
                            <span className="whatsapp-online-dot" />
                        </div>
                        <div className="whatsapp-header-info">
                            <strong>مستشار نَوَى التعليمي</strong>
                            <small>متواجد الآن لمساعدتك (01028103634)</small>
                        </div>
                        <button
                            type="button"
                            className="whatsapp-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="إغلاق المحادثة"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="whatsapp-body">
                        <div className="whatsapp-message-bubble">
                            <p>أهلاً بك في منصة نَوَى! 👋</p>
                            <p>محتاج مساعدة في اختيار المنهج أو الاستفسار عن الاشتراكات؟ يسعدنا التواصل معك مباشرة.</p>
                            <span className="whatsapp-time">الآن</span>
                        </div>
                    </div>

                    <form className="whatsapp-footer" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="whatsapp-input"
                            placeholder="اكتب استفسارك هنا..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="whatsapp-send-btn" aria-label="إرسال عبر واتساب">
                            <Send size={15} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </form>
                </div>
            )}

            {/* Trigger Floating Button */}
            <div className="whatsapp-trigger-wrap">
                <button
                    type="button"
                    className={`whatsapp-btn ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="تواصل عبر واتساب 01028103634"
                    title="تواصل معنا عبر واتساب 01028103634"
                >
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.529 1.954.81 2.796.81h.005c3.18 0 5.767-2.586 5.768-5.766 0-1.54-.6-2.988-1.688-4.077-1.089-1.09-2.538-1.689-4.085-1.689zm3.437 8.163c-.144.405-.837.774-1.17.824-.311.045-.698.069-2.228-.564-1.78-.737-2.92-2.548-3.008-2.666-.089-.118-.718-.956-.718-1.822 0-.866.452-1.293.613-1.468.161-.176.353-.22.47-.22.118 0 .235.002.338.007.108.006.252-.041.396.305.148.356.505 1.233.549 1.323.044.089.073.193.015.311-.059.118-.088.192-.176.295-.088.103-.186.23-.266.309-.088.088-.18.184-.078.36.103.176.458.756.984 1.224.678.604 1.25.791 1.427.879.176.088.279.073.382-.044.103-.118.441-.515.558-.691.118-.176.235-.147.397-.088.161.059 1.028.485 1.205.573.176.088.294.132.338.206.044.073.044.426-.1 1.235z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.393A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.153-.497-4.421-1.353l-.317-.213-3.284.918.928-3.21-.235-.337A8.164 8.164 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2s8.2 3.679 8.2 8.2-3.679 8.2-8.2 8.2z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default WhatsAppButton;
