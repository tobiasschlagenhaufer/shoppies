import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Query, Resolver, Ctx, Arg, Mutation, InputType, Field, ObjectType, Int } from "type-graphql";
import argon2 from "argon2"
import { Movie } from "../entities/Movie";
import { UniqueConstraintViolationException } from "@mikro-orm/core/exceptions";
import { Collection } from "@mikro-orm/core";

@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;

	@Field()
	password: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], {nullable: true})
	errors?: FieldError[];

	@Field(() => User, {nullable: true})
	user?: User;
}

@ObjectType()
class MovieCrudResponse {
	@Field(() => Movie, {nullable: true})
	movie?: Movie;

	@Field(() => String, {nullable: true})
	error?: string;
}

@ObjectType()
class FieldError {
	@Field()
	field: string;

	@Field()
	message: string;
}

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async users ( @Ctx() ctx: MyContext): Promise<User[]> {
		return ctx.em.find(User, {}, ['movies'])
	}
	
	// resolver to fetch the current logged in user
	@Query(() => User, {nullable: true})
	async me (
		@Ctx() ctx: MyContext
	) {
		// check if the user is logged in
		if (!ctx.req.session.userId) {
			return null;
		}

		const user = await ctx.em.findOne(User, { id: ctx.req.session.userId })
		return user;
	}

	@Query(() => [Movie], {nullable: true})
	async myMovies (@Ctx() ctx: MyContext) {
		// check if the user is logged in
		if (!ctx.req.session.userId) {
			return null;
		}

		const user = await ctx.em.findOne(User, { id: ctx.req.session.userId }, ['movies']);

		return user?.movies;

	}

	@Mutation(() => [Movie], {nullable: true})
	async refreshMovies (@Ctx() ctx: MyContext) {
		// check if the user is logged in
		if (!ctx.req.session.userId) {
			return null;
		}

		const user = await ctx.em.findOne(User, { id: ctx.req.session.userId }, ['movies']);

		return user?.movies;

	}

	// resolver to register new users
	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() ctx: MyContext
	) {
		if (options.username.length <= 2) {
			return {
				errors: [{
					field: "username",
					message: "Username must be at least 3 characters."
				}]
			}
		}

		if (options.password.length <= 3) {
			return {
				errors: [{
					field: "password",
					message: "Password must be at least 4 characters."
				}]
			}
		}

		const hashedPassword = await argon2.hash(options.password);
		const user =  ctx.em.create(User, {
			username: options.username, 
			password: hashedPassword,
			movies: new Collection<Movie>(this)
		});

		try {
			await ctx.em.persistAndFlush(user);
		} catch (err) {
			if (err.detail.includes("already exists")) {
				return {
					errors: [{
						field: "username",
						message: "Username is already taken."
					}]
				}
			}
		}

		// save their user id in the session on successful registration
		ctx.req.session.userId = user.id;

		return { user };
	}

	// resolver for logging in a user. 
	// Returns a UserResponse object, which has possible errors or a user
	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() ctx: MyContext
	) {
		const user =  await ctx.em.findOne(User, {
			username: options.username.toLowerCase()
		}, ['movies']);

		if (!user){
			return {
				errors: [{
					field: "username",
					message: "Username does not exist."
				}]
			};
		}

		const validate = await argon2.verify(user!.password, options.password)

		if (!validate) {
			return {
				errors: [{
					field: "password",
					message: "Incorrect password."
				}]
			}
		}

		// save their user id in the session
		ctx.req.session.userId = user.id;

		return { user };
	}

	@Mutation(() => Boolean)
	logout(
		@Ctx() {req, res}: MyContext
	) {
		return new Promise(resolve => 
			req.session.destroy((err: any) => {
				// destroy the cookie whether logout is successful or not
				res.clearCookie("qid");
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}

				resolve(true);
			})
		);
	}

	@Mutation(() => MovieCrudResponse)
	async addMovieToUser(
		@Ctx() ctx: MyContext,
		@Arg("imdbId", () => String) imdbId: string,
		@Arg("title", () => String) title: string,
		@Arg("year", () => Int) year: number,
		@Arg("poster", () => String) poster: string
	) {
		if (!ctx.req.session.userId) {
			return {
				error: "Must be signed in to nominate movies"
			}
		}

		const user = await ctx.em.findOne(User, ctx.req.session.userId, ['movies']);
		let movie = await ctx.em.findOne(Movie, { imdbId });

		if (!movie) {
			// movie doesn't exist, we need to create it
			movie = ctx.em.create(Movie, {
				imdbId,
				title,
				year,
				poster
			});
			await ctx.em.persistAndFlush(movie);
		}

		try{
			// does the user already have the movie nominated?
			if (user.movies.contains(movie)) {
				return { error: "You have already nominated this movie." }
			}

			// does this user already have 5 movies nominated?
			if (user.movies.count() >= 5) {
				return { error: "You can only nominate a maximum of 5 movies." };
			}

			// add the movie to the user's movie collection
			movie.users.add(user);
			user.movies.add(movie);

			await ctx.em.flush();

		} catch(err) {
			if (err instanceof UniqueConstraintViolationException) {
				// already in relation db
				return { error: "You have already nominated this movie." }
			} else {
				console.log(err)
				return { error: "Unexepected server error" }
			}
		}

		return { movie };
	}

	@Mutation(() => MovieCrudResponse)
	async removeMovieFromUser(
		@Ctx() ctx: MyContext,
		@Arg("imdbId", () => String) imdbId: string
	) {
		if (!ctx.req.session.userId) {
			return {
				error: "Must be signed in to nominate movies"
			}
		}

		const user = await ctx.em.findOne(User, ctx.req.session.userId, ['movies']);
		let movie: Movie = await user.movies.getItems().find((m: Movie) => m.imdbId == imdbId);

		if (!movie) {
			// they don't have the movie
			return { error: "You do not have this movie nominated." };
		}

		// get the movie's users
		await movie.users.init();
		movie.users.remove(user);
		user.movies.remove(movie);

		// save changes
		await ctx.em.flush();

		return { movie };
	}
	
}