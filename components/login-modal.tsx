"use client";

import { Dialog, Transition } from "@headlessui/react";
import { WalletMenu } from "./ethereum/wallet";
import { useModal } from "@/hooks/use-store";
import { X } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

export default function ConnectWallet() {
  const isOpen = useModal((state) => state.isOpen && state.type === "login");
  const onClose = useModal((state) => state.onClose);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-[2000]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-200 ease-out"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="scale-100"
            leaveTo="scale-0"
          >
            <Dialog.Panel className="mx-auto rounded bg-[#171C21] backdrop-blur-sm relative flex flex-col py-10">
              <div className="w-full h-full bg-[url(/gradient-mesh-mint.png)] bg-cover bg-no-repeat p-11 pb-12 relative overflow-hidden">
                <div className="text-center">
                  <h2 className="text-lg font-bold uppercase">
                    Connect Wallet
                  </h2>
                  <button
                    className="bg-transparent border-none outline-none h-[45px] w-[45px] absolute right-0 top-0 overflow-hidden"
                    onClick={onClose}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-center space-y-8">
                  <p className="text-zinc-400 text-sm">
                    Please select a wallet to connect for start minting
                  </p>
                  <WalletMenu chainId={11155111} />
                  <h6 className="text-xs text-zinc-400">
                    By connecting your wallet, you agree to our terms
                  </h6>
                </div>
                <div>
                  <div className="absolute bottom-2 left-2">
                    <div className="relative w-3 h-3 -rotate-90">
                      <Image src="/hov_shape_s.svg" alt="Logo" fill />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rotate-180">
                    <div className="relative w-3 h-3">
                      <Image src="/hov_shape_s.svg" alt="Logo" fill />
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
