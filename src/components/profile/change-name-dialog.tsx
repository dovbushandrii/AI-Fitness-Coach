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
import { changeNameAction } from '@/app/actions/auth';

type ChangeNameDialogProps = {
	currentName: string;
};

const ChangeNameDialog: React.FC<ChangeNameDialogProps> = ({ currentName }) => {
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

		setError(null);
		setPending(true);

		const formData = new FormData(event.currentTarget);
		const result = await changeNameAction(formData);

		setPending(false);

		if (!result.ok) {
			setError(result.message ?? 'Failed to change name.');
		} else {
			toast.success('Name changed successfully');
			setOpen(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild>
				<Button className="mt-2 w-full bg-white/20 text-white hover:bg-white/30">
					Change name
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Change name</AlertDialogTitle>
					<AlertDialogDescription>
						Update the display name associated with your account.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">New name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							defaultValue={currentName}
							required
						/>
					</div>

					{error && <p className="text-sm text-red-600">{error}</p>}

					<AlertDialogFooter>
						<AlertDialogCancel type="button">Cancel</AlertDialogCancel>
						<Button type="submit" disabled={pending}>
							{pending ? 'Saving...' : 'Save name'}
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ChangeNameDialog;
