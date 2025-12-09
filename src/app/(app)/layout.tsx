import '../globals.css';

import { Poppins } from 'next/font/google';
import React from 'react';

import { Providers } from '@/components/providers';
import { Header } from '@/components/header';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<div className={`flex min-h-screen flex-col bg-white ${poppins.className}`}>
		<div className="overflow-hidden xl:min-w-[1200px]">
			<Header />
			<main className="container">
				<Providers>{children}</Providers>
			</main>
		</div>
	</div>
);

export default RootLayout;
