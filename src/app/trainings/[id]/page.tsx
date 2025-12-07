"use client";
import { WeekSeparator } from '@/components/trainings/week-separator';
import { usePathname } from 'next/navigation';
import { findTrainingPlanById } from '@/modules/training-plan/server';
import { useEffect, useState } from 'react';
import { TrainingPlan } from '@/modules/training-plan/schema';

const Page = () => {
	const path = usePathname();
	const [plan, setPlan] = useState<TrainingPlan>();

	useEffect(() => {
		const segments = path.split('/');
		const idString = segments[2];
		const planId = parseInt(idString);
		if (isNaN(planId)) {
			throw Error("Invalid planId found in path:", segments[2]);
		}

		// 1. Fetch the data
		findTrainingPlanById(planId)
			.then((value: TrainingPlan | null) => {
				if (value === null) { throw Error('Invalid planId found in path:", segments[2]); ')}
				setPlan(value);
			})
			.catch(error => {
				throw Error(error);
			});
	}, []);
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Training: </h1>
			<WeekSeparator label="Week 1" />
		</>
	);
};

export default Page;
