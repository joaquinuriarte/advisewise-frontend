// _app.js
import '@/styles/globals.css'
import '@/styles/tailwindStyles/tailwindComponents.css';

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}
