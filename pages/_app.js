import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PolygonZkevmCardonaTestnet } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NextUIProvider } from "@nextui-org/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ThirdwebProvider
        activeChain={PolygonAmoyTestnet}
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </NextUIProvider>
  );
}

export default MyApp;
