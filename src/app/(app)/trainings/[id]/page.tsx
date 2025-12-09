import { Suspense } from 'react';

import { TrainingPageWrapper } from '@/components/trainings/training-page-wrapper';
import { TrainingPageSkeleton } from '@/components/trainings/training-page-skeleton';

type TrainingPageProps = {
	params: Promise<{ id: string }>;
};

const TrainingPage = async ({ params }: TrainingPageProps) => {
	const { id } = await params;
	return (
		<Suspense fallback={<TrainingPageSkeleton />}>
			<TrainingPageWrapper planId={id} />
		</Suspense>
	);
};

export default TrainingPage;
