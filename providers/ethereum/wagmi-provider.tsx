"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { type ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { config } from "./config";

type Props = {
  children: ReactNode;
  initialState: State;
};

const queryClient = new QueryClient();

export default function WagmiProviders({ children, initialState }: Props) {
  return (
    <WagmiProvider initialState={initialState} config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
