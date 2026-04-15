import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import OfferSlider from '@/components/OfferSlider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata = {
  title: "Maa G's Kitchen | Homemade Sauces, Chutneys, Pickles & Masalas",
  description: "Authentic homemade sauces, chutneys, pickles and masalas made with love. Traditional family recipes with zero preservatives. Order online across Pakistan.",
  keywords: "homemade sauces, chutneys, pickles, achaar, masala, Pakistani food, Maa G's Kitchen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <OfferSlider />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
