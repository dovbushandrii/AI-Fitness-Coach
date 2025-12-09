import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	LayoutGrid,
	Rows
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui';

export const CalendarHeader = ({
	currentDate,
	view,
	onNext,
	onPrevious,
	setToday,
	onViewChange
}: {
	currentDate: Date;
	view: 'month' | 'week';
	onNext: () => void;
	onPrevious: () => void;
	setToday: () => void;
	onViewChange: (v: 'month' | 'week') => void;
}) => (
	<div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-indigo-50 p-2">
				<CalendarIcon className="h-6 w-6 text-indigo-600" />
			</div>
			<h1 className="text-xl font-bold text-slate-900 md:text-2xl">
				Training Calendar
			</h1>
		</div>

		<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
			{/* View Toggles */}
			<div className="flex rounded-lg bg-slate-100 p-1">
				<button
					onClick={() => onViewChange('month')}
					className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all sm:flex-none ${view === 'month' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
				>
					<div className="flex items-center justify-center gap-2">
						<LayoutGrid className="h-4 w-4" />
						<span>Month</span>
					</div>
				</button>
				<button
					onClick={() => onViewChange('week')}
					className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all sm:flex-none ${view === 'week' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
				>
					<div className="flex items-center justify-center gap-2">
						<Rows className="h-4 w-4" />
						<span>Week</span>
					</div>
				</button>
			</div>

			<div className="flex items-center justify-between gap-2 sm:justify-end">
				<Button variant="outline" size="icon" onClick={onPrevious}>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				<div className="min-w-[140px] text-center font-semibold text-slate-700 select-none">
					{format(
						currentDate,
						view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d"
					)}
				</div>

				<Button variant="outline" size="icon" onClick={onNext}>
					<ChevronRight className="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					size="sm"
					onClick={setToday}
					className="ml-1 bg-slate-100 text-slate-700"
				>
					Today
				</Button>
			</div>
		</div>
	</div>
);
