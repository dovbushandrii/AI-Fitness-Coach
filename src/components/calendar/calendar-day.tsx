import Link from 'next/link';
import { format } from 'date-fns';

import { type Workout } from '@/modules/training-plan/schema';
import { WorkoutItem } from '@/components/calendar/workout-item';

export const CalendarDay = ({
	date,
	workouts,
	isCurrentMonth,
	isTodayDate
}: {
	date: Date;
	workouts: Workout[];
	isCurrentMonth: boolean;
	isTodayDate: boolean;
}) => (
	<div
		className={`flex min-h-[80px] flex-col gap-1 border-r border-b border-slate-100 p-1.5 transition-colors md:min-h-[120px] md:gap-2 md:p-2 ${!isCurrentMonth ? 'bg-slate-50/50' : 'bg-white'} ${isTodayDate ? 'bg-indigo-50/30' : ''}`}
	>
		<div className="flex items-start justify-center md:justify-between">
			<span
				className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium md:h-7 md:w-7 md:text-sm ${isTodayDate ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'} ${!isCurrentMonth ? 'opacity-40' : ''}`}
			>
				{format(date, 'd')}
			</span>

			{workouts.length > 0 && (
				<span className="hidden text-[10px] font-medium text-slate-400 md:inline">
					{workouts.length} {workouts.length === 1 ? 'item' : 'items'}
				</span>
			)}
		</div>

		<div className="flex flex-wrap justify-center gap-1 md:hidden">
			{workouts.map(workout => (
				<Link
					key={workout.id}
					href={`/calendar/workout/${workout.id}`}
					aria-label={`View workout: ${workout.name}`}
					className="group relative flex cursor-pointer items-center justify-center p-1"
				>
					<div
						className={`h-2 w-2 rounded-full transition-transform group-active:scale-90 ${
							workout.isCompleted
								? 'bg-emerald-500 ring-emerald-200 group-hover:ring-2'
								: 'bg-indigo-400 ring-indigo-200 group-hover:ring-2'
						}`}
					/>
				</Link>
			))}
		</div>

		<div className="hidden flex-col gap-1 overflow-y-auto md:flex">
			{workouts.map(workout => (
				<WorkoutItem key={workout.id} workout={workout} />
			))}
		</div>
	</div>
);
