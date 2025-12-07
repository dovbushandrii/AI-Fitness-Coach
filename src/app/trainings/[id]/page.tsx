"use client";
import { usePathname } from 'next/navigation';
import { findTrainingPlanById, findWorkoutsByTrainingPlanId } from '@/modules/training-plan/server';
import { useEffect, useState } from 'react';
import { TrainingPlan, Workout } from '@/modules/training-plan/schema';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';

const Page = () => {
	const path = usePathname();
	const [plan, setPlan] = useState<TrainingPlan>();
	const [workouts, setWorkouts] = useState<Workout[]>([]);

	useEffect(() => {
		const segments = path.split('/');
		const idString = segments[2];
		const planId = parseInt(idString);
		if (isNaN(planId)) {
			throw Error("Invalid planId found in path:" + path);
		}

		findTrainingPlanById(planId)
			.then((value: TrainingPlan | null) => {
				if (value === null) { throw Error('Invalid planId found in path')}
				setPlan(value);
				console.log(value)
			})
			.catch(error => {
				throw Error(error);
			});

		findWorkoutsByTrainingPlanId(planId).then((value: Workout[]) => {
			setWorkouts(value);
		})


	}, []);

	return (
		<>
			<h2 className="mb-8 text-2xl font-bold">Training: {plan?.name}</h2>
			{workouts.map((workout) => (
				<WorkoutListItem
					key={workout.id}
					workout={workout}
					stats={{
						exerciseCount: 6
					}}
				/>
			))}
		</>
	);
};

export default Page;
