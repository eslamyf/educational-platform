import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';
const CART_STORAGE_KEY = 'nawa-cart';
const VALID_COUPONS = {
    NAWA10: 10,
    SPRING25: 25,
    EGYPT2026: 20,
};
const CartContext = createContext(undefined);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = window.localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }
        catch {
            return [];
        }
    });
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
    useEffect(() => {
        try {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
        catch {
            // ignore
        }
    }, [cart]);
    const addToCart = (course) => {
        if (cart.some((item) => item.id === course.id)) {
            toast.info('المسار موجود بالفعل في سلتك');
            return false;
        }
        const newItem = { ...course, quantity: 1 };
        setCart((prev) => [...prev, newItem]);
        toast.success('تمت إضافة المسار إلى السلة بنجاح');
        return true;
    };
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
        toast.success('تمت إزالة المسار من السلة');
    };
    const clearCart = () => {
        setCart([]);
        setCouponCode('');
        setCouponApplied(false);
        setCouponDiscountPercent(0);
    };
    const isCourseInCart = (id) => cart.some((item) => item.id === id);
    const applyCoupon = (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (VALID_COUPONS[cleanCode]) {
            const discount = VALID_COUPONS[cleanCode];
            setCouponCode(cleanCode);
            setCouponApplied(true);
            setCouponDiscountPercent(discount);
            toast.success(`تم تفعيل كوبون الخصم ${cleanCode} بنسبة ${discount}٪`);
            return true;
        }
        else {
            toast.error('كوبون الخصم غير صالح أو منتهي الصلاحية');
            return false;
        }
    };
    const removeCoupon = () => {
        setCouponCode('');
        setCouponApplied(false);
        setCouponDiscountPercent(0);
        toast.info('تمت إزالة الكوبون');
    };
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0), [cart]);
    const oldTotal = useMemo(() => cart.reduce((sum, item) => sum + item.oldPrice * (item.quantity || 1), 0), [cart]);
    const baseSavings = oldTotal - subtotal;
    const couponDiscountAmount = couponApplied ? Math.round((subtotal * couponDiscountPercent) / 100) : 0;
    const finalTotal = Math.max(0, subtotal - couponDiscountAmount);
    const totalSavings = baseSavings + couponDiscountAmount;
    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount: cart.length,
        subtotal,
        oldTotal,
        savings: totalSavings,
        couponCode,
        couponApplied,
        couponDiscountPercent,
        finalTotal,
        applyCoupon,
        removeCoupon,
        isCourseInCart,
    }), [cart, subtotal, oldTotal, totalSavings, couponCode, couponApplied, couponDiscountPercent, finalTotal]);
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
