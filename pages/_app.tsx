import "home/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "../src/utils";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

