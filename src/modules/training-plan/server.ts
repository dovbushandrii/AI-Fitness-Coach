'use server';

import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import {
	type TrainingPlan,
	type Workout,
	type WorkoutItem
} from '@/modules/training-plan/schema';
import { trainingPlans, workoutItems, workouts } from '@/db/schema';
import { db } from '@/db';

export const createTrainingPlan = async (
	data: Omit<TrainingPlan, 'id'>
): Promise<TrainingPlan> => {
	const [result] = await db
		.insert(trainingPlans)
		.values({
			id: randomUUID(),
			name: data.name,
			description: data.description ?? null,
			isActive: data.isActive,
			durationWeeks: data.durationWeeks,
			startDate: data.startDate,
			endDate: data.endDate ?? null,
			userId: data.userId
		})
		.returning();

	revalidatePath(`/calendar`);
	return {
		...result,
		isActive: Boolean(result.isActive),
		description: result.description ?? undefined,
		startDate: result.startDate,
		endDate: result.endDate ?? undefined
	};
};

export const findTrainingPlanById = async (
	id: string
): Promise<TrainingPlan | null> => {
	const [result] = await db
		.select()
		.from(trainingPlans)
		.where(eq(trainingPlans.id, id));

	if (!result) return null;

	return {
		...result,
		isActive: Boolean(result.isActive),
		description: result.description ?? undefined,
		startDate: result.startDate,
		endDate: result.endDate ?? undefined
	};
};

export const findTrainingPlansByUserId = async (
	userId: string
): Promise<TrainingPlan[]> => {
	const results = await db
		.select()
		.from(trainingPlans)
		.where(eq(trainingPlans.userId, userId));

	return results.map(result => ({
		...result,
		isActive: Boolean(result.isActive),
		description: result.description ?? undefined,
		startDate: result.startDate,
		endDate: result.endDate ?? undefined
	}));
};

export const createWorkout = async (
	data: Omit<Workout, 'id'>
): Promise<Workout> => {
	const [result] = await db
		.insert(workouts)
		.values({
			id: randomUUID(),
			name: data.name,
			date: data.date,
			isCompleted: data.isCompleted,
			dateCompleted: data.dateCompleted ?? null,
			estimatedDurationMin: data.estimatedDurationMin ?? null,
			trainingPlanId: data.trainingPlanId,
			userId: data.userId
		})
		.returning();

	return {
		...result,
		isCompleted: Boolean(result.isCompleted),
		dateCompleted: result.dateCompleted ?? undefined,
		estimatedDurationMin: result.estimatedDurationMin ?? undefined
	};
};

export const findWorkoutById = async (id: string): Promise<Workout | null> => {
	const [result] = await db.select().from(workouts).where(eq(workouts.id, id));

	if (!result) return null;

	return {
		...result,
		isCompleted: Boolean(result.isCompleted),
		dateCompleted: result.dateCompleted ?? undefined,
		estimatedDurationMin: result.estimatedDurationMin ?? undefined
	};
};

export const findWorkoutsByTrainingPlanId = async (
	trainingPlanId: string
): Promise<Workout[]> => {
	const results = await db
		.select()
		.from(workouts)
		.where(eq(workouts.trainingPlanId, trainingPlanId));

	return results.map(result => ({
		...result,
		isCompleted: Boolean(result.isCompleted),
		dateCompleted: result.dateCompleted ?? undefined,
		estimatedDurationMin: result.estimatedDurationMin ?? undefined
	}));
};

export const findWorkoutsByUserId = async (
	userId: string
): Promise<Workout[]> => {
	const results = await db
		.select()
		.from(workouts)
		.where(eq(workouts.userId, userId));

	return results.map(result => ({
		...result,
		isCompleted: Boolean(result.isCompleted),
		dateCompleted: result.dateCompleted ?? undefined,
		estimatedDurationMin: result.estimatedDurationMin ?? undefined
	}));
};

export const updateWorkout = async (
	id: string,
	data: Partial<Omit<Workout, 'id' | 'trainingPlanId' | 'userId'>>
): Promise<Workout | null> => {
	const updateData: any = {};

	if (data.name !== undefined) updateData.name = data.name;
	if (data.date !== undefined) updateData.date = data.date;
	if (data.isCompleted !== undefined) updateData.isCompleted = data.isCompleted;
	if (data.dateCompleted !== undefined)
		updateData.dateCompleted = data.dateCompleted ?? null;
	if (data.estimatedDurationMin !== undefined)
		updateData.estimatedDurationMin = data.estimatedDurationMin ?? null;

	const [result] = await db
		.update(workouts)
		.set(updateData)
		.where(eq(workouts.id, id))
		.returning();

	if (!result) return null;

	revalidatePath(`/calendar`);
	return {
		...result,
		isCompleted: Boolean(result.isCompleted),
		dateCompleted: result.dateCompleted ?? undefined,
		estimatedDurationMin: result.estimatedDurationMin ?? undefined
	};
};

export const createWorkoutItem = async (
	data: Omit<WorkoutItem, 'id'>
): Promise<WorkoutItem> => {
	const [result] = await db
		.insert(workoutItems)
		.values({
			id: randomUUID(),
			name: data.name,
			type: data.type,
			sets: data.sets,
			time: data.time ?? null,
			reps: data.reps ?? null,
			isCompleted: data.isCompleted,
			dateCompleted: data.dateCompleted ?? null,
			workoutId: data.workoutId
		})
		.returning();

	return {
		...result,
		type: result.type as 'volumeBased' | 'timeBased',
		isCompleted: Boolean(result.isCompleted),
		time: result.time ?? undefined,
		reps: result.reps ?? undefined,
		dateCompleted: result.dateCompleted ?? undefined
	};
};

export const findWorkoutItemsByWorkoutId = async (
	workoutId: string
): Promise<WorkoutItem[]> => {
	const results = await db
		.select()
		.from(workoutItems)
		.where(eq(workoutItems.workoutId, workoutId));

	return results.map(result => ({
		...result,
		type: result.type as 'volumeBased' | 'timeBased',
		isCompleted: Boolean(result.isCompleted),
		time: result.time ?? undefined,
		reps: result.reps ?? undefined,
		dateCompleted: result.dateCompleted ?? undefined
	}));
};

export const updateWorkoutItems = async (
	items: WorkoutItem[]
): Promise<(WorkoutItem | null)[]> => {
	const updates = items.map(item => {
		const { id, workoutId, ...data } = item;
		return updateWorkoutItem(id, data);
	});

	return Promise.all(updates);
};

export const updateWorkoutItem = async (
	id: string,
	data: Partial<Omit<WorkoutItem, 'id' | 'workoutId'>>
): Promise<WorkoutItem | null> => {
	const updateData: any = {};

	if (data.name !== undefined) updateData.name = data.name;
	if (data.type !== undefined) updateData.type = data.type;
	if (data.sets !== undefined) updateData.sets = data.sets;
	if (data.time !== undefined) updateData.time = data.time ?? null;
	if (data.reps !== undefined) updateData.reps = data.reps ?? null;
	if (data.isCompleted !== undefined) updateData.isCompleted = data.isCompleted;
	if (data.dateCompleted !== undefined)
		updateData.dateCompleted = data.dateCompleted ?? null;

	const [result] = await db
		.update(workoutItems)
		.set(updateData)
		.where(eq(workoutItems.id, id))
		.returning();

	if (!result) return null;

	return {
		...result,
		type: result.type as 'volumeBased' | 'timeBased',
		isCompleted: Boolean(result.isCompleted),
		time: result.time ?? undefined,
		reps: result.reps ?? undefined,
		dateCompleted: result.dateCompleted ?? undefined
	};
};
