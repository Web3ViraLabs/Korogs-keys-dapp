"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { AiOutlineReload } from "react-icons/ai";
import { useModal } from "@/hooks/use-store";
import abi from "./abi";
import { Loader2 } from "lucide-react";
import { CONTRACT_ADDRESS, PRIVILAGED_WALLET } from "@/config/global";
import { cn } from "@/lib/utils";
import { isUserEligible } from "../actions/actions";

const MintNft = ({ quantity }: { quantity: number }) => {
  const { isConnected, address } = useAccount();
  const onOpen = useModal((state) => state.onOpen);
  const [isEligible, setIsEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { writeContract, isPending, error, isSuccess, isError } =
    useWriteContract();

  useEffect(() => {
    try {
      if (address) {
        if (address === PRIVILAGED_WALLET) {
          setIsEligible(true);
        } else {
          (async () => {
            setIsEligible(await isUserEligible(address));
          })();
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [address]);

  const onClick = () => {
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "mint",
        args: [BigInt(quantity)],
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  if (loading) {
    return (
      <button
        disabled
        className="w-full py-4 bg-[#39cb95d4] text-black uppercase font-bold animate-pulse transition flex items-center justify-center"
      >
        <Loader2 className="animate-spin w-6 h-6" />
      </button>
    );
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => onOpen("login")}
        className="w-full py-4 bg-[#39cb95] text-black uppercase font-bold"
      >
        Connect and Mint
      </button>
    );
  }

  if (!isEligible && !loading) {
    return (
      <button
        disabled
        onClick={() => onClick()}
        className="w-full py-4 bg-[#00FFA3] text-black uppercase font-normal disabled:bg-green-700"
      >
        You are not eligible
      </button>
    );
  }

  if (isError && error) {
    return (
      <div className="w-full py-4 bg-[#db4d31] text-white uppercase font-normal flex gap-x-2 inset-0 items-center justify-around ">
        <p className="font-bold text-white break-words whitespace-pre-line px-2">
          Error{" "}
          {error?.name === "TransactionExecutionError" &&
            error.message.includes("User rejected the request") &&
            ": User Rejected Request"}
          {error?.name === "ContractFunctionExecutionError" &&
            error.message.includes("Already minted") &&
            ": You have already minted"}
        </p>
        <button onClick={() => onClick()} className="border-l px-4 ">
          <AiOutlineReload
            className={cn(
              "hover:transform hover:rotate-90 transition-transform duration-300",
              isPending && "animate-spin"
            )}
            size={20}
          />
        </button>
      </div>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={() => onClick()}
      className={cn(
        "w-full py-4 bg-[#00FFA3] text-black uppercase  flex items-center justify-center disabled:bg-green-700 font-bold hover:bg-green-500 transition-all duration-300",
        error && "bg-red-500"
      )}
    >
      {isPending && <Loader2 className="animate-spin w-6 h-6" />}
      {!isPending &&
        !isSuccess &&
        `Mint ${quantity} NFT${quantity > 1 ? "s" : ""}`}
      {!isPending &&
        isSuccess &&
        `Successfully Minted ${quantity} NFT${quantity > 1 ? "s" : ""}`}
    </button>
  );
};

export default MintNft;
