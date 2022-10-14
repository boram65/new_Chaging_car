import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
