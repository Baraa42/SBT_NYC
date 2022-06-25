import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useShowConnectWalletModal } from "@/jotai"
import { shortenStr } from "@/utils/tools";
import { Button } from "react-daisyui"

export const ConnectWalletBtn = () => {

    const [_, setShow] = useShowConnectWalletModal()
    const { account, disconnectWallet} = useWalletAccount();

    if (account) {
        const buttons =
        <>
          <div>
            <button className="text-sm" onClick={() => disconnectWallet()}>
                <p className="text-sm">Disconnect</p>
            </button>
        </div>
        </>
    
        const content = (
          <div className="bg-card text-oncard p-4">
            <div className="rounded-lg space-y-2">{buttons}</div>
          </div>
        );
    
        return (
          <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                  <Button className="rounded-lg px-2 py-1.5 text-xs sm:px-4 sm:text-base text-white bg-primary">{shortenStr(account, 12)}</Button>
              </label>
              <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                  {content}
              </div>
          </div>
        );
      }
    
      return (
        <Button
            className="rounded-lg px-2 py-1.5 text-xs sm:px-4 sm:text-base text-white bg-primary"
            onClick={() => setShow(true)}
        >
            {" "}
            Connect Wallet
        </Button>
      )
}