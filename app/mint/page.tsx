import Image from "next/image";
import Link from "next/link";
import ConnectBtn from "./components/connect-btn";
import User from "./components/user";
import MintNft from "./components/mint-nft-btn";
import FormNft from "./components/form";

const MintPage = () => {
  return (
    <>
      <div className="absolute w-full h-full">
        <Image
          src="/mint-bg.png"
          alt="BannerImage"
          quality={100}
          fill
          fetchPriority="high"
          priority
          className="w-full h-full object-cover"
          style={{ position: "absolute", zIndex: "-1" }}
        />
        {/* Dimmed Overlay */}
        <div className="absolute bg-gradient-to-t from-[#000000a6] to-transparent w-full h-full" />

        {/* Glassmorphic Overlay */}
        <div className="absolute bg-black opacity-70 w-full h-full" />
      </div>
      <main className="relative flex flex-col items-center justify-center w-full h-full scroll-smooth overflow-y-auto lg:overflow-hidden">
        <header className="w-full top-0 h-[90px] md:h-[110px] fixed flex items-center justify-between z-[1000] px-2 lg:px-10 backdrop-blur-sm lg:backdrop-blur-none">
          {/* <div className="flex items-center justify-between w-full"> */}
          <div className="relative w-10 h-10">
            <Link href="/">
              <Image src={"/favicon.ico"} alt="Logo" fill />
            </Link>
          </div>
          <div className="flex ml-auto">
            <div className="p-10">
              <User />
            </div>
          </div>
          {/* </div> */}
        </header>
        <section className="z-[100] flex flex-col md:flex-row space-y-10  w-full items-center justify-center  md:py-auto mx-auto md:gap-x-10 sm:mt-[300px] lg:mt-0">
          <div className="w-full flex flex-col space-y-6 p-4 items-center justify-center max-w-[372px] md:w-1/2 pt-[1000px] sm:pt-[500px] md:pt-0 xl:ml-40">
            <div className="relative w-[300px] h-[300px] p-2">
              <Image
                src={"/nft-0.png"}
                alt="NFT"
                fill
                priority
                className="object-cover"
              />
            </div>
            <FormNft />
          </div>
          <div className="w-full flex flex-col md:w-1/2 items-center justify-center relative p-4">
            <div className="-z-10 absolute w-full h-full inset-0">
              <div className="relative w-full h-full">
                <Image
                  src={"/gradient-mesh-mint.png"}
                  alt="NFT"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full space-y-4">
              <div className="flex space-x-2 items-center ">
                <span className="font-bold">WHITELIST : SOLDOUT</span>
                <div className="w-4 h-4 relative">
                  <Image src="/check-mint.svg" alt="Logo" fill />
                </div>
              </div>
              <div className="flex space-x-2 items-center ">
                <span className="font-bold">Presale : SOLDOUT</span>
                <div className="w-4 h-4 relative">
                  <Image src="/check-mint.svg" alt="Logo" fill />
                </div>
              </div>
              <div className="flex flex-col py-10 space-y-10">
                <h5 className="text-white text-[40px] xl:text-[60px] font-bold">
                  PUBLIC MINT LIVE
                </h5>
                <div className="space-y-8">
                  <p className="uppercase font-bold">Public mint ends in</p>
                  <ul className="flex gap-x-1 md:gap-x-4 w-full items-center justify-center">
                    <li className="text-[25px] xl:text-[40px] font-bold">
                      00D
                    </li>
                    <li className="text-[30px] xl:text-[40px] font-bold text-gray-500">
                      :
                    </li>
                    <li className="text-[25px] xl:text-[40px] font-bold">
                      00H
                    </li>
                    <li className="text-[30px] xl:text-[40px] font-bold text-gray-500">
                      :
                    </li>
                    <li className="text-[25px] xl:text-[40px] font-bold">
                      00M
                    </li>
                    <li className="text-[30px] xl:text-[40px] font-bold text-gray-500">
                      :
                    </li>
                    <li className="text-[25px] xl:text-[40px] font-bold">
                      00S
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 font-bold">
                  <p>MAX 5 NFTS PER WALLET</p>
                  <p>PRICE 0.09 ETH + GAS</p>
                  <p>MINT IS LIVE UNTIL 25 APR 04:00H</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:gap-x-4 ">
                  <a
                    href="#"
                    className="h-[60px] w-full min-w-[150px] border border-[#ffffff33]  box-border font-[400] uppercase text-white flex items-center justify-center gap-x-2 relative"
                  >
                    <div className="relative w-4 h-4">
                      <Image src={"/connect_wallet.svg"} alt="Logo" fill />
                    </div>
                    <div>
                      <span>Discord</span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <div className="relative w-3 h-3">
                        <Image src="/hov_shape_s.svg" alt="Logo" fill />
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="h-[60px] w-full min-w-[150px] border border-[#ffffff33] box-border font-[400] uppercase text-white flex items-center justify-center gap-x-2 relative"
                  >
                    <div className="relative w-4 h-4">
                      <Image src={"/connect_wallet.svg"} alt="Logo" fill />
                    </div>
                    <div>
                      <span>TWITTER</span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <div className="relative w-3 h-3">
                        <Image src="/hov_shape_s.svg" alt="Logo" fill />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MintPage;
