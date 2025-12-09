import React from 'react';

import { findWorkoutItemsByWorkoutId } from '@/modules/training-plan/server';

type ExerciseProps = {
	workoutId: string;
	duration: number;
	date: Date;
};

const ExerciseCount = async ({ workoutId, duration, date }: ExerciseProps) => {
	const items = await findWorkoutItemsByWorkoutId(workoutId);

	return (
		<p className="mt-0.5 text-sm text-gray-500">
			{date.toDateString()} &bull; {items?.length}{' '}
			{items?.length === 1 ? 'exercise' : 'exercises'} &bull; {duration || '--'}{' '}
			min
		</p>
	);
};

export default ExerciseCount;
