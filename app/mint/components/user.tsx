"use client";

import { useAccount } from "wagmi";
import Profile from "./profile";
import ConnectBtn from "./connect-btn";

const User = () => {
  const { address, isConnected } = useAccount();

  if (address && isConnected) {
    return <Profile address={address} />;
  }

  return <ConnectBtn />;
};

export default User;
