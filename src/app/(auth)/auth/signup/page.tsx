'use client';

import * as React from 'react';
import { Suspense } from 'react';

import { SignupForm } from '@/components/auth/signup-form';
import { SignupFormSkeleton } from '@/components/auth/signup-form-skeleton';

const SignupPage: React.FC = () => (
	<div className="mx-auto max-w-md">
		<div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 p-6 text-center text-white shadow-lg">
			<h2 className="text-3xl font-bold">Create your account</h2>
			<p className="text-sm opacity-80">Join your AI-powered fitness journey</p>
		</div>

		<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_5px_25px_rgba(0,0,0,0.15)]">
			<Suspense fallback={<SignupFormSkeleton />}>
				<SignupForm />
			</Suspense>
		</div>
	</div>
);

export default SignupPage;
