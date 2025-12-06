// TODO: THIS SHOULD BE REMOVED!

import { type Workout, type WorkoutItem } from '@/modules/training-plan/schema';

// const MOCK_WORKOUTS: Workout[] = [
// 	{
// 		id: 1,
// 		userId: 1,
// 		trainingPlanId: 5,
// 		name: 'Upper Body Power',
// 		date: new Date().toISOString(),
// 		isCompleted: false,
// 		estimatedDurationMin: 60
// 	},
// 	{
// 		id: 2,
// 		userId: 1,
// 		trainingPlanId: 5,
// 		name: 'Active Recovery',
// 		date: new Date(Date.now() - 86400000).toISOString(), // Tomorrow
// 		isCompleted: true,
// 		estimatedDurationMin: 30
// 	}
// ];
//
// const MOCK_ITEMS: WorkoutItem[] = [
// 	// Items for Workout 1 (Upper Body)
// 	{
// 		id: 101,
// 		workoutId: 1,
// 		name: 'Barbell Bench Press',
// 		type: 'volumeBased',
// 		sets: 5,
// 		reps: 5,
// 		weight: 100,
// 		isCompleted: false
// 	},
// 	{
// 		id: 102,
// 		workoutId: 1,
// 		name: 'Bent Over Row',
// 		type: 'volumeBased',
// 		sets: 4,
// 		reps: 10,
// 		weight: 80,
// 		isCompleted: false
// 	},
// 	{
// 		id: 103,
// 		workoutId: 1,
// 		name: 'Overhead Press',
// 		type: 'volumeBased',
// 		sets: 3,
// 		reps: 12,
// 		weight: 50,
// 		isCompleted: false
// 	},
//
// 	// Items for Workout 2 (Active Recovery)
// 	{
// 		id: 104,
// 		workoutId: 2,
// 		name: 'Light Jog',
// 		type: 'timeBased',
// 		sets: 1,
// 		time: 1200, // 20 mins in seconds
// 		isCompleted: true
// 	},
// 	{
// 		id: 105,
// 		workoutId: 2,
// 		name: 'Dynamic Stretching',
// 		type: 'timeBased',
// 		sets: 1,
// 		time: 600, // 10 mins in seconds
// 		isCompleted: true
// 	}
// ];

const MOCK_WORKOUTS: Workout[] = [
	// --- Existing Workouts ---
	{
		id: 1,
		userId: 1,
		trainingPlanId: 5,
		name: 'Upper Body Power',
		date: new Date().toISOString(), // Today
		isCompleted: false,
		estimatedDurationMin: 60
	},
	{
		id: 2,
		userId: 1,
		trainingPlanId: 5,
		name: 'Active Recovery',
		date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
		isCompleted: true,
		estimatedDurationMin: 30
	},
	// --- New Workouts ---
	{
		id: 3,
		userId: 1,
		trainingPlanId: 5,
		name: 'Legs Hypertrophy',
		date: new Date(Date.now() - 172800000).toISOString(), // 2 Days ago
		isCompleted: true,
		estimatedDurationMin: 75
	},
	{
		id: 4,
		userId: 1,
		trainingPlanId: 5,
		name: 'HIIT & Core',
		date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow (Future)
		isCompleted: false,
		estimatedDurationMin: 45
	},
	{
		id: 5,
		userId: 1,
		trainingPlanId: 5,
		name: 'Heavy Deadlift Session',
		date: new Date(Date.now() + 86400000).toISOString(), // In 2 Days (Future)
		isCompleted: false,
		estimatedDurationMin: 90
	}
];

const MOCK_ITEMS: WorkoutItem[] = [
	// --- Workout 1 (Upper Body) ---
	{
		id: 101,
		workoutId: 1,
		name: 'Barbell Bench Press',
		type: 'volumeBased',
		sets: 5,
		reps: 5,
		weight: 100,
		isCompleted: false
	},
	{
		id: 102,
		workoutId: 1,
		name: 'Bent Over Row',
		type: 'volumeBased',
		sets: 4,
		reps: 10,
		weight: 80,
		isCompleted: false
	},
	{
		id: 103,
		workoutId: 1,
		name: 'Overhead Press',
		type: 'volumeBased',
		sets: 3,
		reps: 12,
		weight: 50,
		isCompleted: false
	},

	// --- Workout 2 (Active Recovery) ---
	{
		id: 104,
		workoutId: 2,
		name: 'Light Jog',
		type: 'timeBased',
		sets: 1,
		time: 1200, // 20 mins
		isCompleted: true
	},
	{
		id: 105,
		workoutId: 2,
		name: 'Dynamic Stretching',
		type: 'timeBased',
		sets: 1,
		time: 600, // 10 mins
		isCompleted: true
	},

	// --- Workout 3 (Legs Hypertrophy - Completed) ---
	{
		id: 106,
		workoutId: 3,
		name: 'Back Squat',
		type: 'volumeBased',
		sets: 4,
		reps: 8,
		weight: 120,
		isCompleted: true
	},
	{
		id: 107,
		workoutId: 3,
		name: 'Bulgarian Split Squat',
		type: 'volumeBased',
		sets: 3,
		reps: 12,
		weight: 20,
		isCompleted: true
	},
	{
		id: 108,
		workoutId: 3,
		name: 'Romanian Deadlift',
		type: 'volumeBased',
		sets: 3,
		reps: 10,
		weight: 100,
		isCompleted: true
	},
	{
		id: 109,
		workoutId: 3,
		name: 'Calf Raises',
		type: 'volumeBased',
		sets: 4,
		reps: 15,
		weight: 0, // Bodyweight
		isCompleted: true
	},

	// --- Workout 4 (HIIT & Core - Future) ---
	{
		id: 110,
		workoutId: 4,
		name: 'Jump Rope',
		type: 'timeBased',
		sets: 3,
		time: 180, // 3 mins per set
		isCompleted: false
	},
	{
		id: 111,
		workoutId: 4,
		name: 'Kettlebell Swings',
		type: 'volumeBased',
		sets: 4,
		reps: 20,
		weight: 24,
		isCompleted: false
	},
	{
		id: 112,
		workoutId: 4,
		name: 'Plank',
		type: 'timeBased',
		sets: 3,
		time: 60, // 1 min per set
		isCompleted: false
	},

	// --- Workout 5 (Heavy Deadlift - Future) ---
	{
		id: 113,
		workoutId: 5,
		name: 'Deadlift (Top Set)',
		type: 'volumeBased',
		sets: 1, // TEST CASE: Should render as "1 set"
		reps: 1, // TEST CASE: Should render as "1 rep"
		weight: 180,
		isCompleted: false
	},
	{
		id: 114,
		workoutId: 5,
		name: 'Deadlift (Back off)',
		type: 'volumeBased',
		sets: 2,
		reps: 3,
		weight: 160,
		isCompleted: false
	},
	{
		id: 115,
		workoutId: 5,
		name: 'Pull Ups',
		type: 'volumeBased',
		sets: 3,
		reps: 8, // weight undefined usually means bodyweight
		isCompleted: false
	}
];

// --- Mock Functions ---

/**
 * Simulates network delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Finds a specific workout by its ID.
 * Simulates a database fetch.
 */
export const findWorkoutById = async (id: number): Promise<Workout | null> => {
	console.log(`[MockDB] Fetching workout: ${id}...`);
	await delay(800); // Simulate 800ms network latency

	const workout = MOCK_WORKOUTS.find(w => w.id === id);

	if (!workout) {
		console.warn(`[MockDB] Workout ${id} not found.`);
		return null;
	}

	return { ...workout }; // Return copy to prevent mutation issues
};

/**
 * Finds all workout items (exercises) associated with a specific workout ID.
 * Sorts them by ID (as a proxy for order since 'order' field was removed).
 */
export const findWorkoutItemsByWorkoutId = async (
	workoutId: number
): Promise<WorkoutItem[]> => {
	console.log(`[MockDB] Fetching items for workout: ${workoutId}...`);
	await delay(600); // Simulate 600ms network latency

	const items = MOCK_ITEMS.filter(item => item.workoutId === workoutId).sort(
		(a, b) => a.id - b.id
	);

	return items.map(item => ({ ...item })); // Return copies
};

export const findWorkoutsByUserId = async (
	userId: number
): Promise<Workout[]> => {
	await delay(800); // Simulate 800ms network latency

	const workouts = MOCK_WORKOUTS.filter(w => w.userId === userId);

	if (!workouts) {
		console.warn(`[MockDB] Workout for user id ${userId} not found.`);
		return [];
	}

	return workouts; // Return copy to prevent mutation issues
};
