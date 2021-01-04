declare module "*.png" {
	const value: any;
	export = value;
  }

export interface ImdbMovie {
	id: number;
	title: string;
	year: number;
	imdbId: string;
	poster: string;	
}