import Image from "next/image";
import { useEffect, useState } from "react";
import { Connector } from "wagmi";
import { ETH_WALLETS_ICONS } from "./icons";

export default function WalletOptions({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className="flex flex-row w-full gap-x-2 items-center py-4 px-8 backdrop-blur bg-[#ffffff0d] bg-opacity-[0.05] transform hover:scale-95 hover:shadow-xl transition-all duration-200"
    >
      <Image
        src={
          connector.icon ||
          ETH_WALLETS_ICONS[connector.id as keyof typeof ETH_WALLETS_ICONS]
        }
        alt={connector.name}
        width={30}
        height={30}
      />
      <p className="text-sm font-semibold break-words whitespace-pre-line">
        {connector.name}
      </p>
    </button>
  );
}
