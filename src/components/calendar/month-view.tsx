import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	isSameDay,
	isSameMonth,
	isToday,
	startOfMonth,
	startOfWeek
} from 'date-fns';
import React from 'react';

import { type Workout } from '@/modules/training-plan/schema';
import { CalendarDay } from '@/components/calendar/calendar-day';

export const MonthView = ({
	currentDate,
	workouts
}: {
	currentDate: Date;
	workouts: Workout[];
}) => {
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
	const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

	// Shorten names for mobile if needed, but CSS truncation is better
	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
				{weekDays.map(d => (
					<div
						key={d}
						className="py-2 text-center text-[10px] font-semibold tracking-wider text-slate-500 uppercase md:py-3 md:text-xs"
					>
						{d}
					</div>
				))}
			</div>

			<div className="grid auto-rows-fr grid-cols-7">
				{calendarDays.map(dayItem => {
					const daysWorkouts = workouts.filter(w => isSameDay(w.date, dayItem));
					return (
						<CalendarDay
							key={dayItem.toISOString()}
							date={dayItem}
							workouts={daysWorkouts}
							isCurrentMonth={isSameMonth(dayItem, monthStart)}
							isTodayDate={isToday(dayItem)}
						/>
					);
				})}
			</div>
		</div>
	);
};
