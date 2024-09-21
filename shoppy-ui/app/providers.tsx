"use client"

import { ThemeProvider } from '@emotion/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ReactElement } from "react";
import darkTheme from './dark.theme';
import { AuthContext } from './[auth]/auth-context';

interface ProviderProps {
  children: ReactElement[],
  authenticated: boolean;
}
export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}