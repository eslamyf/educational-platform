import { Route, Switch } from 'wouter';
import CartPage from '@/features/cart/pages/CartPage';
import CheckoutPage from '@/features/checkout/pages/CheckoutPage';
import CourseDetailPage from '@/features/catalog/pages/CourseDetailPage';
import CoursesPage from '@/features/catalog/pages/CoursesPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import WelcomePage from '@/features/auth/pages/WelcomePage';
import InstructorDashboardPage from '@/features/instructor-dashboard/pages/InstructorDashboardPage';
import LearnCoursePage from '@/features/learning/pages/LearnCoursePage';
import HomePage from '@/features/marketing/pages/HomePage';
import NotFound from '@/features/marketing/pages/NotFound';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import StudentDashboardPage from '@/features/student-dashboard/pages/StudentDashboardPage';

export function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/course/:id" component={CourseDetailPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
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

export default AppRouter;
