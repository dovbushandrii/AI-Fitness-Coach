'use client';

import * as React from 'react';

import { signUpAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage = () => {
	const formRef = React.useRef<HTMLFormElement | null>(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const formAction = async (formData: FormData) => {
		setError(null);
		setIsSubmitting(true);
		try {
			await signUpAction(formData);
		} catch (e) {
			setError('Failed to sign up. Please try again.');
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto max-w-md">
			<div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 p-6 text-center text-white shadow-lg">
				<h2 className="text-2xl font-bold">Create Your Account</h2>
				<p className="text-sm opacity-80">
					Join your AI-powered fitness journey
				</p>
			</div>

			<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_5px_25px_rgba(0,0,0,0.15)]">
				<form ref={formRef} action={formAction} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name" className="font-semibold text-gray-700">
							Name
						</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="John Doe"
							required
							className="rounded-xl border-2 border-gray-200 p-3 focus:border-indigo-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email" className="font-semibold text-gray-700">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
							className="rounded-xl border-2 border-gray-200 p-3 focus:border-indigo-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="font-semibold text-gray-700">
							Password
						</Label>
						<Input
							id="password"
							name="password"
							type="password"
							minLength={6}
							required
							className="rounded-xl border-2 border-gray-200 p-3 focus:border-indigo-400"
						/>
						<p className="text-xs text-gray-500">Minimum 6 characters.</p>
					</div>

					{error && (
						<p className="text-sm font-medium text-red-600" aria-live="polite">
							{error}
						</p>
					)}

					<Button
						type="submit"
						className="w-full rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 py-6 font-semibold text-white shadow-lg transition hover:opacity-90"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Signing up...' : 'Sign up'}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
