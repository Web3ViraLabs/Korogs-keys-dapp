import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, polygon, sepolia } from "viem/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { createClient } from "viem";
import { APPNAME } from "@/config/global";

export const config = createConfig({
  chains: [sepolia],
  syncConnectedChain: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({ appName: APPNAME }),
    injected({
      target: "metaMask",
    }),
  ],
  client({ chain }: { chain: any }) {
    return createClient({ chain, transport: http() });
  },
});

// console.log(config.connectors);
