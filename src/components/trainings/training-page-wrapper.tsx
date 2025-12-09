import React from 'react';

import {
	findTrainingPlanById,
	findWorkoutsByTrainingPlanId
} from '@/modules/training-plan/server';
import { TrainingPlanDetails } from '@/components/trainings/training-plan-details';

type TrainingProps = {
	planId: string;
};

export const TrainingPageWrapper = async ({ planId }: TrainingProps) => {
	const [plan, workouts] = await Promise.all([
		findTrainingPlanById(planId),
		findWorkoutsByTrainingPlanId(planId)
	]);

	if (!plan) {
		return (
			<div className="rounded-md bg-red-50 p-4 text-red-600">
				Training plan not found.
			</div>
		);
	}

	return <TrainingPlanDetails plan={plan} workouts={workouts || []} />;
};
