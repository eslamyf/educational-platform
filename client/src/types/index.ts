export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export type Lesson = {
  title: string;
  duration: string;
  free?: boolean;
  video?: string;
  files?: string[];
  quiz?: QuizQuestion;
};

export type Module = {
  title: string;
  count: number;
  duration: string;
  lessons: Lesson[];
};

export type Review = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

export type Course = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  level: string;
  price: number;
  oldPrice: number;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  accent: string;
  image: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  tags: string[];
  outcomes: string[];
  requirements: string[];
  audience: string[];
  modules: Module[];
  reviews: Review[];
};

export type CartItem = Course & {
  quantity: number;
};

export type UserRole = 'student' | 'instructor';

export type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  governorate?: string;
  stage?: string;
  grade?: string;
  year?: string;
  track?: string;
  guardian?: string;
  nationalId?: string;
  avatar?: string;
};

export type UserSession = {
  role: UserRole;
  mode: 'login' | 'register';
  profile: UserProfile;
};

export type LessonNote = {
  id: string;
  courseId?: string;
  lesson: string;
  time: number;
  body: string;
  createdAt?: string;
};

export type ProgressCourse = Course & {
  progress: number;
  nextLesson: string;
  lastSeen: string;
};
