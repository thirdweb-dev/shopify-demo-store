import { Navbar } from "@/components/Navbar";
import {
  APP_NETWORK,
  DOMAIN,
  PAPER_CLIENT_ID,
  RELAYER_URL,
} from "@/lib/environment-variables";
import theme from "@/theme";
import { ChakraProvider, Container } from "@chakra-ui/react";
import {
  ThirdwebAuthConfig,
  metamaskWallet,
  paperWallet,
  SDKOptions,
  ThirdwebProvider,
  Wallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css"

const paperWalletConfig = paperWallet({
  clientId: PAPER_CLIENT_ID,
});
paperWalletConfig.meta.name = "Email";
paperWalletConfig.meta.iconURL = "https://ipfs.thirdwebcdn.com/ipfs/QmUUoZxPuAgxKHeT5cCY4vwmN8sZRiV9ptzBhuM47Y24NY/email%20wallet%20shopify.png";

export default function App({ Component, pageProps }: AppProps) {
  const supportedWallets: Wallet[] = [
    ...(PAPER_CLIENT_ID
      ? [
        paperWalletConfig,
      ]
      : []),
    metamaskWallet(),
  ];

  const authConfig: ThirdwebAuthConfig = {
    domain: DOMAIN,
    authUrl: "/api/auth",
  };

  const sdkOptions: SDKOptions | undefined = RELAYER_URL
    ? {
      gasless: {
        openzeppelin: { relayerUrl: RELAYER_URL },
      },
    }
    : undefined;

  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider
        supportedWallets={supportedWallets}
        authConfig={authConfig}
        sdkOptions={sdkOptions}
        activeChain={APP_NETWORK || "mumbai"}
      >
        <Head>
          <title>Your Store</title>
        </Head>
        <Navbar />
        <Container maxW="container.page">
          <Component {...pageProps} />
        </Container>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}