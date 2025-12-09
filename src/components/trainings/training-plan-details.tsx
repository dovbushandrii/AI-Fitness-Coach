import React, { Suspense } from 'react';

import {
	type TrainingPlan,
	type Workout
} from '@/modules/training-plan/schema';
import { WeekSeparator } from '@/components/trainings/week-separator';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';
import { calculateFrequency } from '@/components/trainings/training-plan-card';
import { WorkoutListItemSkeleton } from '@/components/trainings/workout-list-item-skeleton';

type TrainingPlanDetailsProps = {
	plan: TrainingPlan;
	workouts: Workout[];
};

export const TrainingPlanDetails = async ({
	plan,
	workouts
}: TrainingPlanDetailsProps) => {
	const workoutsPerWeek = calculateFrequency(workouts);

	return (
		<>
			<h2 className="mb-8 text-3xl font-bold">{plan.name}</h2>
			<p className="mb-6 text-gray-700">{plan.description}</p>

			{workouts.map((workout, index) => {
				let separator = null;

				if (workoutsPerWeek > 0 && index % workoutsPerWeek === 0) {
					separator = (
						<WeekSeparator
							key={`separator-${index}`}
							label={`Week ${Math.floor(index / workoutsPerWeek) + 1}`}
						/>
					);
				}

				return (
					<div key={`workout-container-${workout.id}`}>
						{separator}
						<Suspense fallback={<WorkoutListItemSkeleton />}>
							<WorkoutListItem key={workout.id} workout={workout} />
						</Suspense>
					</div>
				);
			})}
		</>
	);
};
