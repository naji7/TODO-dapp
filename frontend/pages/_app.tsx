import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// import {
//   useAccount,
//   useConnect,
//   useDisconnect,
//   WagmiConfig,
//   createClient,
// } from "wagmi";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { getDefaultProvider } from "ethers";

import {
  useAccount,
  useConnect,
  useDisconnect,
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  createConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
// import { configureChains } from "wagmi/dist";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
