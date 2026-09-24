import React from 'react';
import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { LearningProvider } from '@/contexts/LearningContext';

// Modular Pages
import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import LoginPage from '@/pages/LoginPage';
import WelcomePage from '@/pages/WelcomePage';
import ProfilePage from '@/pages/ProfilePage';
import StudentDashboardPage from '@/pages/StudentDashboardPage';
import LearnCoursePage from '@/pages/LearnCoursePage';
import InstructorDashboardPage from '@/pages/InstructorDashboardPage';
import NotFound from '@/pages/NotFound';

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:id" component={CourseDetailPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/welcome" component={WelcomePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/dashboard" component={StudentDashboardPage} />
      <Route path="/learn/:id" component={LearnCoursePage} />
      <Route path="/instructor" component={InstructorDashboardPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <CartProvider>
            <LearningProvider>
              <TooltipProvider>
                <Toaster position="bottom-left" richColors />
                <AppRoutes />
              </TooltipProvider>
            </LearningProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
