"use client";

import { useAccount, useReadContract } from "wagmi";
import MintNft from "./mint-nft-btn";
import {
  CONTRACT_ADDRESS,
  PRICE_IN_ETH,
  PRIVILAGED_WALLET,
  TOTAL_NFTS,
} from "@/config/global";
import abi from "./abi";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const FormNft = () => {
  const [remainingNFTs, setRemainingNFTs] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { address } = useAccount();
  const { data, isPending } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (data && typeof data === "bigint") {
      setRemainingNFTs(TOTAL_NFTS - Number(data));
    }
  }, [data]);

  const MINT_DETAILS = [
    {
      title: "Remaining",
      value: isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        `${remainingNFTs} / ${TOTAL_NFTS}`
      ),
    },
    {
      title: "price",
      value: `${PRICE_IN_ETH} ETH`,
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > remainingNFTs) {
      setQuantity(remainingNFTs);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        {MINT_DETAILS.map((item, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between py-4 border-b border-white/10"
          >
            <div className="text-white capitalize">{item.title}</div>
            <div className="text-white">{item.value}</div>
          </div>
        ))}
        <div className="flex w-full items-center justify-between py-4 border-b border-white/10">
          <div className="text-white capitalize">Quantity</div>
          {address && address === PRIVILAGED_WALLET ? (
            <input
              disabled={isPending}
              type="number"
              className="text-white bg-transparent border border-white text-center w-max"
              min={0}
              onChange={onChange}
              value={quantity}
              max={TOTAL_NFTS}
            />
          ) : (
            <div className="text-white">1</div>
          )}
        </div>
      </div>
      <div className="w-full space-y-6">
        <MintNft quantity={quantity} />
        <p className="font-semibold text-zinc-400 text-sm">
          By clicking “MINT”, You agree to our{" "}
          <a className="font-bold text-white" href="#">
            Terms of Service
          </a>{" "}
          and our{" "}
          <a className="font-bold text-white" href="#">
            Privacy Policy.
          </a>
        </p>
      </div>
    </>
  );
};

export default FormNft;
