import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const supportedChainIds = [31337, 80001];

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
  // supportedChainIds: [1],
});

export const WalletConnect = new WalletConnectConnector({
  infuraId: `${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  supportedChainIds: supportedChainIds,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
