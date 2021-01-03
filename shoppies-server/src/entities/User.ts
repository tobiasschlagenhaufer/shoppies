import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Movie } from "./Movie";

@ObjectType()
@Entity()
export class User {
	@Field(() => Int)              // expose to graphql schema
	@PrimaryKey()
	id!: number;

	@Field()
	@Property({ type: "text", unique: true})
	username!: string;

	@Property({ type: "text"})
	password!: string;

	@Field(() => [Movie])
	@ManyToMany(() => Movie)
	movies: Collection<Movie> = new Collection<Movie>(this);
}