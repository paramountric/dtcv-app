'use client';

import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';
import LoginForm from '../_components/login-form';
import { useAppContext } from '@/context/app-context';
import Viewport from './_components/viewport';

export default function ProjectsPage() {
  const { user } = useAppContext();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      {user ? (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-transparent text-black dark:text-white pointer-events-none">
          <Viewport />
        </div>
      ) : (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-transparent text-black dark:text-white">
          <div className="flex items-center justify-center h-full">
            <LoginForm />
          </div>
        </div>
      )}
    </Suspense>
  );
}
