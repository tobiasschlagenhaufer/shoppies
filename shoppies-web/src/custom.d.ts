declare module "*.svg" {
	const content: any;
	export default content;
}

export interface ImdbMovie {
	id: number;
	title: string;
	year: number;
	imdbId: string;
	poster: string;	
}