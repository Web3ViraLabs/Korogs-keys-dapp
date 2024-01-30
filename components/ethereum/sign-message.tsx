import { SIGNATURE_MESSAGE } from "@/config/global";
import { Loader2 } from "lucide-react";
import { useAccount, useSignMessage, useVerifyMessage } from "wagmi";

const SignMessage = () => {
  const { signMessageAsync, status, error, data } = useSignMessage();
  const { isConnected, address } = useAccount();

  const verify = useVerifyMessage({
    address,
    message: SIGNATURE_MESSAGE,
    signature: data,
  });

  const onClick = async () => {
    try {
      await signMessageAsync({
        message: SIGNATURE_MESSAGE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "success" && data) {
    if (verify.isPending) {
      return (
        <div className="w-full p-4 items-center justify-center flex flex-col space-y-4">
          <p>Verifying</p>
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      );
    }

    if (verify.isError && verify.error) {
      return (
        <div className="w-full p-4 items-center justify-center flex flex-col space-y-4">
          <span className="text-red-500">{verify.error?.message}</span>
          <button
            onClick={onClick}
            className="border px-4 py-2 rounded-md transition-all hover:opacity-80 bg-slate-500/60"
          >
            Retry
          </button>
        </div>
      );
    }

    if (verify.isSuccess) {
      return "You logged in \n You may close this modal";
    }
  }

  if (status === "error") {
    console.log(error);

    return (
      <div className="w-full p-4 items-center justify-center flex flex-col space-y-4">
        <span className="text-red-500">
          {error?.name === "UserRejectedRequestError"
            ? "User rejected request"
            : error?.message}
        </span>
        <button
          onClick={onClick}
          className="border px-4 py-2 rounded-md transition-all hover:opacity-80 bg-slate-500/60"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="w-full p-4 items-center justify-center flex flex-col space-y-4">
        <p>Signing</p>
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full p-4 items-center justify-center flex flex-col space-y-4">
      <p>Sign message to verify wallet ownership</p>
      <UserAddress address={address!} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        disabled={!signMessageAsync || !isConnected}
        onClick={() => onClick()}
      >
        Sign Message
      </button>
    </div>
  );
};

export default SignMessage;

export const UserAddress = ({ address }: { address: string }) => {
  return (
    <div className="px-3 py-2 border bg-slate-500/60 transition-all hover:shadow-sm hover:bg-slate-500 hover:opacity-90 rounded-lg">
      <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
    </div>
  );
};
