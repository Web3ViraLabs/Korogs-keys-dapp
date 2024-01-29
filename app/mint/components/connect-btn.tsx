"use client";

import { useModal } from "@/hooks/use-store";
import Image from "next/image";

const ConnectBtn = () => {
  const onOpen = useModal((state) => state.onOpen);

  return (
    <button
      onClick={() => onOpen("login")}
      className="h-[50px] min-w-[150px] bg-[#ffffff33] border-none box-border font-[400] uppercase text-white flex items-center justify-center gap-x-2 relative transition-all hover:bg-slate-400/40"
    >
      <div className="relative w-4 h-4">
        <Image src={"/connect_wallet.svg"} alt="Logo" fill />
      </div>
      <div>
        <span>CONNECT</span>
      </div>
      <div className="absolute top-2 left-2">
        <div className="relative w-3 h-3">
          <Image src="/hov_shape_s.svg" alt="Logo" fill />
        </div>
      </div>
    </button>
  );
};

export default ConnectBtn;
