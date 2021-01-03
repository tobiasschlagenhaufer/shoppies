import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Movie {
	@Field(() => Int)              // expose to graphql schema
	@PrimaryKey()
	id!: number;

	@Field()
	@Property()
	imdbId!: string;

	@Field()
	@Property()
	title!: string;

	@Field()
	@Property()
	year!: number;

	@Field()
	@Property()
	poster!: string;

	@Field(() => [User])
	@ManyToMany(() => User)
	users: Collection<User> = new Collection<User>(this);
}