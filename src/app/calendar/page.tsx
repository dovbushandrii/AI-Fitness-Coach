import React, { Suspense } from 'react';

import { CalendarSkeleton } from '@/components/calendar/calendar-skeleton';
import { WorkoutCalendarWrapper } from '@/components/calendar/workout-calendar-wrapper';

const TrainingCalendarPage = async () => (
	<div className="min-h-screen bg-white p-4 font-sans text-slate-900 md:p-8">
		<div className="mx-auto max-w-6xl">
			<Suspense fallback={<CalendarSkeleton />}>
				<WorkoutCalendarWrapper />
			</Suspense>
		</div>
	</div>
);

export default TrainingCalendarPage;
