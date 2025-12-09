import React from 'react';

import { WorkoutListItemSkeleton } from '@/components/trainings/workout-list-item-skeleton';

export const TrainingPageSkeleton: React.FC = () => (
	<div className="p-4">
		<div className="mb-8 h-8 w-2/3 animate-pulse rounded bg-gray-300" />

		<div className="mb-8 h-4 w-full animate-pulse rounded bg-gray-200" />

		<h3 className="mb-4 text-xl font-semibold text-gray-700">
			Workouts Loading:
		</h3>

		{Array(5)
			.fill(0)
			.map((_, index) => (
				<React.Fragment key={index}>
					{index % 5 === 0 && (
						<div className="my-6 h-5 w-1/4 animate-pulse rounded-full bg-gray-400" />
					)}
					<WorkoutListItemSkeleton />
				</React.Fragment>
			))}
	</div>
);
