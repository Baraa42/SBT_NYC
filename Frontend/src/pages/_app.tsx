import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "jotai";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { BaseLayout } from '@/components/layout/BaseLayout';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
        </Web3ReactProvider>
      </Provider>
    </>
  )
}

export default MyApp
