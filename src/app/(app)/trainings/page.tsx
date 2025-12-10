import Link from 'next/link';
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';

import TrainingListWrapper from '@/components/trainings/training-list-wrapper';
import { getLoggedInUserId } from '@/app/actions/auth';
import { TrainingListSkeleton } from '@/components/trainings/tranining-list-skeleton';

const TrainingListPage = async () => {
	const userId = await getLoggedInUserId();
	if (!userId) {
		notFound();
	}
	return (
		<>
			<div className="mb-2 flex items-center justify-between bg-white p-4 md:p-8">
				<h1 className="text-3xl font-bold text-gray-900">My Training Plans</h1>
				<Link href="/trainings/new" passHref>
					<div className="text-md inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-[#7b52b9] p-3 font-medium text-white shadow-sm transition-colors hover:bg-[#6a46a5] md:px-4 md:py-2">
						<Plus className="h-5 w-5" />
						<span className="ml-2 hidden md:inline">New Plan</span>
					</div>
				</Link>
			</div>
			<Suspense fallback={<TrainingListSkeleton />}>
				<TrainingListWrapper userId={userId} />
			</Suspense>
		</>
	);
};

export default TrainingListPage;
