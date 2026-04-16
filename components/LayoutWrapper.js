'use client';

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/lib/cartContext';
import OfferSlider from '@/components/OfferSlider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Return bare minimum for admin (admin will have its own layout)
    return <main>{children}</main>;
  }

  return (
    <CartProvider>
      <OfferSlider />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartSidebar />
      <MobileBottomNav />
    </CartProvider>
  );
}
