import {
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NextUIProvider } from "@nextui-org/react";
import { ACCOUNT_FACTORY_ADDRESS } from "../const/addresses";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={PolygonAmoyTestnet}
        // supportedWallets={[
        //   smartWallet(embeddedWallet(), {
        //     factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        //     gasless: true,
        //   }),
        //   smartWallet(metamaskWallet(), {
        //     factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        //     gasless: true,
        //   }),
        // ]}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </NextUIProvider>
  );
}

export default MyApp;
