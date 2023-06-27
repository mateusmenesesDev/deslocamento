import { Roboto } from 'next/font/google';

import './globals.css';
// import './globals.css';
import DrawerMenu from '@components/DrawerMenu/';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: 'Deslocamento Naty',
  description: 'Sistema de Deslocamento da Secretária Naty'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={roboto.className} lang="pt-br">
      <body>
        <DrawerMenu>{children}</DrawerMenu>
      </body>
    </html>
  );
}
