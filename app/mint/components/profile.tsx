"use client";

import { Button } from "@/components/ui/button";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { useDisconnect } from "wagmi";

export default function Profile({ address }: { address: `0x${string}` }) {
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        window.location.reload();
      },
    },
  });
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="h-[50px] min-w-[150px] bg-[#ffffff33] border-none box-border font-[400] uppercase text-white flex items-center justify-center gap-x-2 relative transition-all hover:bg-slate-400/40">
            <div className="relative w-4 h-4">
              <Image src={"/connect_wallet.svg"} alt="Logo" fill />
            </div>
            <div>
              <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
            </div>
            <div className="absolute top-2 left-2">
              <div className="relative w-3 h-3">
                <Image src="/hov_shape_s.svg" alt="Logo" fill />
              </div>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-[55px] right-[0px] w-[200px] p-4 bg-[#ffffff33] backdrop-blur-sm rounded">
              <Button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 w-full text-white"
              >
                Disconnect
              </Button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
