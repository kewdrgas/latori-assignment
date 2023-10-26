import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';
import styles from './tailwind.css';
import { CartProvider } from './contexts/CartContext';
import Header from './components/header';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider>
          <Header></Header>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </CartProvider>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
