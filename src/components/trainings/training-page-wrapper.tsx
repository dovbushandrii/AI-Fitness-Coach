import React from 'react';
import { notFound } from 'next/navigation';

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
		notFound();
	}

	return <TrainingPlanDetails plan={plan} workouts={workouts || []} />;
};
