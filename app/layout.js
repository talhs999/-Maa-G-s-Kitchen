import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: "Maa G's Kitchen | Homemade Sauces, Chutneys, Pickles & Masalas",
  description: "Authentic homemade sauces, chutneys, pickles and masalas made with love. Traditional family recipes with zero preservatives. Order online across Pakistan.",
  keywords: "homemade sauces, chutneys, pickles, achaar, masala, Pakistani food, Maa G's Kitchen",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
