import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from '@/app/errors/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { LearningProvider } from '@/contexts/LearningContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <CartProvider>
            <LearningProvider>
              <TooltipProvider>
                <Toaster position="bottom-left" richColors />
                {children}
              </TooltipProvider>
            </LearningProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
