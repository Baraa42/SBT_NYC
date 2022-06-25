import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useShowConnectWalletModal } from "@/jotai/ui";
import { FC } from "react";
import { Modal,Button } from "react-daisyui";

export const ConnectWalletModal: FC = () => {

    const [isShow, setShow] = useShowConnectWalletModal()
    const { connectWallet, connectWalletWithWC } = useWalletAccount();

    const metaMask = <img src={"/metamask.svg"} width={48} height={48} alt="metamask" />
    const walletConnect = <img src={"/wallet_connect.svg"} width={48} height={48} alt="metamask" />

    const connect = async (type: "metamask" | "walletconnect") => {
        if(type==="metamask") await connectWallet()
        if(type==="walletconnect") await connectWalletWithWC()
        setShow(false)
    }

    return (
        <>
            <Modal open={isShow}>
                <Modal.Header>Connect Wallet</Modal.Header>

                <Modal.Body className="text-center w-full space-y-2">
                    <Button className="w-full" onClick={() => connect("metamask")} startIcon={metaMask} >Metamask</Button>
                    <Button className="w-full" onClick={() => connect("walletconnect")} startIcon={walletConnect} >Wallet Connect</Button>
                </Modal.Body>

                <Modal.Actions>
                    <Button onClick={() => setShow(false)} color="primary">
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}