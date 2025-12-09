'use client';

import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button, Input, Label } from '@/components/ui';
import { changePasswordAction } from '@/app/actions/auth';

const ChangePasswordDialog: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);

		if (isOpen) {
			setError(null);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setPending(true);
		setError(null);

		const formData = new FormData(event.currentTarget);
		const result = await changePasswordAction(formData);

		setPending(false);

		if (!result.ok) {
			setError(result.message ?? 'Failed to change password.');
		} else {
			toast.success('Password changed successfully');
			setOpen(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild>
				<Button className="mt-2 w-full bg-white/20 text-white hover:bg-white/30">
					Change password
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Change password</AlertDialogTitle>
					<AlertDialogDescription>
						Enter your current password and choose a new one.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="currentPassword">Current password</Label>
						<Input
							id="currentPassword"
							name="currentPassword"
							type="password"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="newPassword">New password</Label>
						<Input
							id="newPassword"
							name="newPassword"
							type="password"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm new password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
						/>
					</div>

					{error && <p className="text-sm text-red-600">{error}</p>}

					<AlertDialogFooter>
						<AlertDialogCancel type="button">Cancel</AlertDialogCancel>
						<Button type="submit" disabled={pending}>
							{pending ? 'Saving...' : 'Save password'}
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ChangePasswordDialog;
