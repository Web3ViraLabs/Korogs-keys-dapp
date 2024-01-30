"use client";

import ConnectWallet from "@/components/login-modal";
import NftDisplayModal from "@/components/nft-modal";
import NftDisplay from "@/components/nft-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NftDisplayModal />
      <ConnectWallet />
    </>
  );
};
