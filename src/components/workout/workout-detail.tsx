'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
	CheckSquare,
	ChevronLeft,
	Dumbbell,
	Save,
	Square,
	Timer
} from 'lucide-react';

import { type Workout, type WorkoutItem } from '@/modules/training-plan/schema';
import { Badge, Button, Card } from '@/components/common';

type WorkoutDetailClientProps = {
	workout: Workout;
	initialItems: WorkoutItem[];
};

export const WorkoutDetail = ({
	workout,
	initialItems
}: WorkoutDetailClientProps) => {
	const router = useRouter();
	const [items, setItems] = useState<WorkoutItem[]>(initialItems);
	const [isPending, startTransition] = useTransition();

	const handleToggleItem = (itemId: number) => {
		setItems(prev =>
			prev.map(item =>
				item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
			)
		);
	};

	const handleSave = () => {
		startTransition(async () => {
			// await saveWorkoutProgress(workout.id, items);
			// Optional: Add toast notification here
			console.log('Progress saved');
		});
	};

	return (
		<div className="animate-in fade-in space-y-6 duration-500">
			{/* --- Top Navigation --- */}
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={() => router.push('/calendar')}
					className="gap-1 text-slate-500 transition-all hover:text-slate-900"
				>
					<ChevronLeft className="h-5 w-5" />
					Back to Calendar
				</Button>
			</div>

			{/* --- Header Section --- */}
			<div className="flex flex-col gap-2 border-b border-slate-100 pb-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-slate-900">{workout.name}</h1>
					<Badge variant={workout.isCompleted ? 'success' : 'secondary'}>
						{workout.isCompleted ? 'Completed' : 'In Progress'}
					</Badge>
				</div>
				<p className="text-lg text-slate-500">
					{format(new Date(workout.date), 'EEEE, MMMM do, yyyy')}
				</p>
			</div>

			{/* --- Items List --- */}
			<div className="grid gap-4">
				{items.map(item => (
					<Card
						key={item.id}
						className={`p-4 transition-colors ${item.isCompleted ? 'border-emerald-100 bg-emerald-50/50' : 'bg-white'}`}
					>
						<div className="flex items-center justify-between">
							{/* Left: Icon & Details */}
							<div className="flex items-center gap-4">
								<div
									className={`rounded-lg p-3 ${item.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}
								>
									{item.type === 'volumeBased' ? (
										<Dumbbell className="h-6 w-6" />
									) : (
										<Timer className="h-6 w-6" />
									)}
								</div>

								<div>
									<h3
										className={`text-lg font-semibold ${item.isCompleted ? 'text-emerald-900' : 'text-slate-900'}`}
									>
										{item.name}
									</h3>

									<div className="mt-1 flex items-center gap-3 text-sm font-medium text-slate-500">
										<span>
											{item.sets} {item.sets === 1 ? 'set' : 'sets'}
										</span>
										{item.type === 'volumeBased' && (
											<>
												<span>
													{item.reps} {item.reps === 1 ? 'rep' : 'reps'}
												</span>
												{item.weight !== undefined && (
													<span>{item.weight} kg</span>
												)}
											</>
										)}
										{item.type === 'timeBased' && <span>{item.time} sec</span>}
									</div>
								</div>
							</div>

							<button
								type="button"
								onClick={() => handleToggleItem(item.id)}
								className="flex cursor-pointer items-center justify-center rounded border-none bg-transparent p-0"
								aria-label={
									item.isCompleted ? 'Mark as incomplete' : 'Mark as complete'
								}
								aria-pressed={item.isCompleted}
							>
								{item.isCompleted ? (
									<CheckSquare className="h-8 w-8 text-emerald-500 transition-colors hover:text-emerald-600" />
								) : (
									<Square className="h-8 w-8 text-slate-300 transition-colors hover:text-indigo-500" />
								)}
							</button>
						</div>
					</Card>
				))}
			</div>

			{/* --- Footer Action --- */}
			<div className="fixed right-0 bottom-0 left-0 mt-8 border-t border-slate-200 bg-white p-4 md:relative md:border-t-0 md:bg-transparent md:p-0">
				<div className="mx-auto flex max-w-6xl justify-end">
					<Button
						onClick={handleSave}
						disabled={isPending}
						className="flex w-full items-center gap-2 shadow-lg shadow-indigo-200 md:w-auto"
					>
						{isPending ? (
							<>
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Saving...
							</>
						) : (
							<>
								<Save className="h-4 w-4" />
								Save Progress
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};
