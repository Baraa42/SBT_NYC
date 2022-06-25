import { GuildItem } from "@/interfaces/guild";
import { atom, useAtom, useSetAtom } from "jotai";

export const showConnectWalletModal = atom<boolean>(false);

export const useShowConnectWalletModal = () => useAtom(showConnectWalletModal);
export const useSetConnectWalletModal = () =>
  useSetAtom(showConnectWalletModal);

export const selectedGuild = atom<GuildItem | null>(null);

export const useSelectedGuild = () => useAtom(selectedGuild);
