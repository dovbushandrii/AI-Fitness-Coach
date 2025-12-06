import { notFound } from 'next/navigation';
import React from 'react';

import {
	findWorkoutById,
	findWorkoutItemsByWorkoutId
} from '@/components/workout/mock-data-service';
import { WorkoutDetail } from '@/components/workout/workout-detail';

type WorkoutDetailWrapperProps = {
	workoutId: number;
};

export const WorkoutDetailWrapper = async ({
	workoutId
}: WorkoutDetailWrapperProps) => {
	const [userId, workout] = await Promise.all([
		//getUserId(),
		1,
		findWorkoutById(workoutId)
	]);

	if (!workout || !userId || workout.userId !== userId) {
		notFound();
	}

	const items = await findWorkoutItemsByWorkoutId(workoutId);

	return <WorkoutDetail workout={workout} initialItems={items} />;
};
