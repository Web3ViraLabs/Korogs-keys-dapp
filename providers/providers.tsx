import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { ModalProvider } from "./modal-provider";
import WagmiProviders from "./ethereum/wagmi-provider";
import { config } from "./ethereum/config";

export default function Providers({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <>
      <WagmiProviders initialState={initialState!}>{children}</WagmiProviders>
    </>
  );
}
