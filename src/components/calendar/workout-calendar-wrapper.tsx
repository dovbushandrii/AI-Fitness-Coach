import React from 'react';

// import { findWorkoutsByUserId } from '@/modules/training-plan/server';
import { WorkoutCalendar } from '@/components/calendar/workout-calendar';
import { findWorkoutsByUserId } from '@/components/workout/mock-data-service';

export const WorkoutCalendarWrapper = async () => {
	const workouts = await findWorkoutsByUserId(1);
	return <WorkoutCalendar initialWorkouts={workouts} />;
};
