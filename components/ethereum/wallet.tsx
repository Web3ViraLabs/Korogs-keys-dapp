"use client";

import * as React from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import WalletOptions from "./ui/wallet-button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ETH_WALLETS_ICONS } from "./ui/icons";
import SignMessage from "./sign-message";

type ChainId = 1 | 137 | 11155111;

export function WalletMenu({ chainId }: { chainId: ChainId }) {
  const { connectors, connect, status, variables, error } = useConnect();
  const { isConnected, chainId: connectedChainId, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const wallet = variables?.connector as Connector;

  React.useEffect(() => {
    console.log(chainId, isConnected, connectedChainId);
    if (isConnected && connectedChainId !== chainId) {
      if (connector) {
        console.log("disconnecting from connector");
        disconnect({ connector });
      } else {
        console.log("disconnecting from provider");
        disconnect();
      }
    }
  }, [isConnected, connectedChainId, chainId, disconnect, connector]);

  if (isConnected && connectedChainId === chainId) {
    return <SignMessage />;
  }

  if (status === "error") {
    return (
      <div className="flex space-y-4 flex-col items-center justify-center">
        {wallet && (
          <Image
            src={ETH_WALLETS_ICONS[wallet.id as keyof typeof ETH_WALLETS_ICONS]}
            alt="Icon of wallet"
            width={100}
            height={100}
          />
        )}
        <p className="text-red-500">An error occured </p>
        <span>
          {error?.name === "UserRejectedRequestError" &&
            "User rejected request"}
          {error?.name === "ConnectorAlreadyConnectedError" &&
            "Wallet is already connected"}
        </span>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex space-y-4 flex-col items-center justify-center">
        {wallet && (
          <Image
            src={ETH_WALLETS_ICONS[wallet.id as keyof typeof ETH_WALLETS_ICONS]}
            alt="Icon of wallet"
            width={100}
            height={100}
          />
        )}
        <Loader2 className="animate-spin w-6 h-6 text-green" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 items-center">
      {connectors.map((connector: Connector) => (
        <WalletOptions
          key={connector.id}
          connector={connector}
          onClick={() => connect({ connector, chainId })}
        />
      ))}
    </div>
  );
}
