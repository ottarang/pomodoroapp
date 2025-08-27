export interface FormData {
  name: string;
  email: string;
  password: string;
  newsletterConsent: boolean;
}

export interface OnboardingStep {
  id: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}
