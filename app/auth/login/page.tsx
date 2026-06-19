import { LoginForm } from "@/components/auth/login-form";
import { Wordmark } from "@/components/layout/wordmark";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const authError = params.error === "auth";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Wordmark />
      </div>
      {authError && (
        <p className="mb-4 max-w-md rounded-md border border-error/20 bg-error/5 px-4 py-3 text-center text-sm text-error">
          Sign-in link expired or was invalid. Please request a new magic link.
        </p>
      )}
      <LoginForm />
    </div>
  );
}
