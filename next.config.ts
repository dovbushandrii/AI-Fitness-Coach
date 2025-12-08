import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	redirects: async () => [
		{
			source: '/',
			destination: '/calendar',
			permanent: true
		}
	]
};

export default nextConfig;
