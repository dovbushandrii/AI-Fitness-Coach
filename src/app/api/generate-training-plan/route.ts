import { type NextRequest, NextResponse } from 'next/server';
import { unauthorized } from 'next/navigation';

import { generateTrainingPlan } from '@/app/actions/generateTrainingPlan';
import { getLoggedInUserId } from '@/app/actions/auth';

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const userId = await getLoggedInUserId();
	if (!userId) {
		unauthorized();
	}
	const result = await generateTrainingPlan(data, userId);
	return NextResponse.json(result);
};
