"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { scroll } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Constants
const METADATA = {
  name: "a+",
  description: "Admanager",
  url: "https://admanager.interchangeably.xyz/",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
} as const;

const WEB3_MODAL_THEME = {
  themeMode: 'dark' as const,
  themeVariables: {
    
    '--wcm-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '--wcm-accent-color': '#D365E3',
    '--wcm-accent-fill-color': '#000000',
    '--wcm-background-color': '#000000',
    '--wcm-overlay-background-color': 'rgba(0, 0, 0, 0.7)',
    '--wcm-overlay-backdrop-filter': 'blur(6px)',

    // Border radius
    '--wcm-background-border-radius': '24px',
    '--wcm-container-border-radius': '20px',
    '--wcm-wallet-icon-border-radius': '16px',
    '--wcm-button-border-radius': '9999px',
    '--wcm-secondary-button-border-radius': '9999px',
    '--wcm-icon-button-border-radius': '50%',
    '--wcm-button-hover-highlight-border-radius': '9999px',

    // Text styles
    '--wcm-text-big-bold-size': '20px',
    '--wcm-text-big-bold-weight': '600',
    '--wcm-text-medium-regular-size': '16px',
    '--wcm-text-medium-regular-weight': '500',
    '--wcm-text-small-regular-size': '14px',
    '--wcm-text-small-thin-size': '13px',
    '--wcm-text-small-thin-weight': '400',
    '--wcm-text-xsmall-bold-size': '12px',
    '--wcm-text-xsmall-regular-size': '12px',

    // Custom gradients and effects
    '--wcm-gradient-1': 'linear-gradient(to right, #D365E3, #9AEDEF)',
    '--wcm-gradient-2': 'linear-gradient(to bottom right, #D365E3, #9AEDEF)',

    // Button styles
    '--wcm-button-background': 'var(--wcm-gradient-1)',
    '--wcm-button-hover-background': 'brightness(1.1)',
    '--wcm-button-active-background': 'brightness(0.9)',

    // Z-index
    '--wcm-z-index': '999',
  }
} as const;


const queryClient = new QueryClient();


if (!projectId) {
  throw new Error("Project ID is not defined");
}


const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [scroll],
  defaultNetwork: scroll,
  metadata: METADATA,
  features: {
    analytics: true,
  },
  theme: {
    mode: WEB3_MODAL_THEME.themeMode,
    variables: WEB3_MODAL_THEME.themeVariables,
  },
});

interface ContextProviderProps {
  children: ReactNode;
  cookies: string | null;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children, cookies }) => {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};


export { appKit };
export default ContextProvider;