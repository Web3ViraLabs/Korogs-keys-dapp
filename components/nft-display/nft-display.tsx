"use client";

import abi from "@/app/mint/components/abi";
import { CONTRACT_ADDRESS } from "@/config/global";
import { useModal } from "@/hooks/use-store";
import { cn, convertToHttpUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { hexToNumber } from "viem";
import {
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
} from "wagmi";

interface NftMetadata {
  name: string;
  symbol: string;
  image: string;
}

const NftDisplay = ({ onClose }: { onClose: () => void }) => {
  const hash = useModal((state) => state.data.hash);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [metadata, setMetadata] = useState<NftMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    data: receipt,
    isPending: pendingReceipt,
    isError: isReceiptError,
    error: receiptError,
    isSuccess: isReceiptSuccess,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  useEffect(() => {
    if (isReceiptSuccess && receipt?.logs) {
      const newTokenIds = receipt.logs.map((log) =>
        hexToNumber(log.topics[3]!)
      );

      setTokenIds(newTokenIds);
    }
  }, [isReceiptSuccess, receipt, pendingReceipt, isReceiptError]);

  const {
    data: results,
    isPending,
    isSuccess,
    isError,
    error,
  } = useReadContracts({
    contracts: tokenIds.map((tokenId) => ({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "tokenURI",
      args: [BigInt(tokenId)],
    })),
  });

  useEffect(() => {
    if (isSuccess && results) {
      results.map((result) => {
        if (result && result.result) {
          fetch(convertToHttpUrl(result.result.toString()))
            .then((response) => response.json())
            .then((data) => {
              setMetadata((prevMetadata) => [
                ...prevMetadata,
                {
                  name: data.name,
                  symbol: data.symbol,
                  image: convertToHttpUrl(
                    data.image || data.image_url || data.animation_url || ""
                  ),
                },
              ]);
            });
        }
      });
    }
  }, [results, isSuccess]);

  if (receiptError && isReceiptError) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <p className="text-red-500 font-bold">ERROR</p>
        <p>{receiptError.name}</p>
      </div>
    );
  }

  if (pendingReceipt) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <p>Fetching transaction receipt</p>
        <Loader2 className="w-16 h-16 animate-spin text-green-400" />
      </div>
    );
  }

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <p>Fetching nfts</p>
        <Loader2 className="w-16 h-16 animate-spin text-green-400" />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <p className="text-red-500 font-bold">ERROR</p>
        <p>{error.name}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative grid sm:grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-row-3 w-full p-4 lg:max-h-[600px] max-h-[400px] overflow-y-auto transition-all duration-300",
          metadata.length === 1 ? "flex items-center justify-center" : ""
        )}
      >
        {metadata.map((metadata, index) => (
          <div key={index} className="relative w-full h-full mx-auto">
            {metadata.image.endsWith(".mp4") ? (
              <video
                autoPlay
                loop
                muted
                src={metadata.image}
                className="w-full h-full shadow-sm rounded-lg object-cover"
              />
            ) : (
              <Image src={metadata.image} alt={metadata.name} fill />
            )}
            <p className="absolute w-full text-center bottom-0 left-1/2 translate-x-[-50%] opacity-80 hover:opacity-100">
              {metadata.name} ({metadata.symbol})
            </p>
          </div>
        ))}
        <div className="absolute h-2 bottom-0 backdrop-blur w-full from-zinc-900  to-zinc-800  "></div>
      </div>
      {!isPending && !pendingReceipt && !loading && (
        <div className="pt-8 lg:pt-20 flex items-center justify-center w-full">
          <button
            onClick={onClose}
            className="h-[50px] min-w-[150px] bg-[#28e292] border-none box-border  uppercase text-black font-bold hover:rounded hover:opacity-85 transition-all duration-300"
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
};

export default NftDisplay;
