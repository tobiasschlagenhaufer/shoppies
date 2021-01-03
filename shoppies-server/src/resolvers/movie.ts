import { Movie } from "../entities/Movie";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class MovieResolver {
	@Query(() => [Movie])
	movies( @Ctx() ctx: MyContext ): Promise<Movie[]> {
		return ctx.em.find(Movie, {}, ['users']);
	}

	@Query(() => Movie, { nullable: true })
	movie( 
		@Arg("id", () => Int) id: number,
		@Ctx() ctx: MyContext 
	): Promise<Movie | null> {
		return ctx.em.findOne(Movie, { id }, ['users']);
	}

	@Query(() => [Movie], {nullable: true})
	async topNominations( @Ctx() ctx: MyContext ) {
		const movies = await ctx.em.find(Movie, {}, ['users']);
		return movies.sort((a,b) => b.users.length - a.users.length).filter(movie => movie.users.length > 0).slice(0,5);
	}

	@Mutation(() => Movie)
	async createMovie( 
		@Arg("imdbId", () => String) imdbId: string,
		@Arg("title", () => String) title: string,
		@Arg("year", () => Int) year: number,
		@Ctx() ctx: MyContext 
	): Promise<Movie> {
		const movie = ctx.em.create(Movie, { imdbId, title, year });
		await ctx.em.persistAndFlush(movie);
		return movie;
	}
}