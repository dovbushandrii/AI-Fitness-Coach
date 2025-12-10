import React, { Suspense } from 'react';

import {
	type TrainingPlan,
	type Workout
} from '@/modules/training-plan/schema';
import { WeekSeparator } from '@/components/trainings/week-separator';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';
import { WorkoutListItemSkeleton } from '@/components/trainings/workout-list-item-skeleton';

type TrainingPlanDetailsProps = {
	plan: TrainingPlan;
	workouts: Workout[];
};

const getWeekStart = (dateInput: string | Date) => {
	const date = new Date(dateInput);
	const day = date.getDay(); // 0 is Sunday
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	const monday = new Date(date.setDate(diff));
	monday.setHours(0, 0, 0, 0);
	return monday.getTime();
};

export const TrainingPlanDetails = async ({
	plan,
	workouts
}: TrainingPlanDetailsProps) => {
	const sortedWorkouts = [...workouts].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	let currentWeekNumber = 1;

	return (
		<>
			<h2 className="mb-8 text-3xl font-bold">{plan.name}</h2>
			<p className="mb-6 text-gray-700">{plan.description}</p>

			{sortedWorkouts.map((workout, index) => {
				let separator = null;

				const currentMonday = getWeekStart(workout.date);

				let isNewWeek = false;

				if (index === 0) {
					isNewWeek = true;
				} else {
					const prevMonday = getWeekStart(sortedWorkouts[index - 1].date);
					if (currentMonday !== prevMonday) {
						isNewWeek = true;
						currentWeekNumber++;
					}
				}

				if (isNewWeek) {
					separator = (
						<WeekSeparator
							key={`separator-week-${currentWeekNumber}`}
							label={`Week ${currentWeekNumber}`}
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
