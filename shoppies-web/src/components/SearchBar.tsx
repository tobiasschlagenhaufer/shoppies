import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Button, FormErrorMessage, FormControl, Box, Flex} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction';
import React, { useState } from 'react';
import { ImdbMovie } from "../custom"
import { Movie } from './Movie';

interface RawImdb {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

interface ImdbSearch {
	Search: RawImdb[];
	Response: string;
	Error?: string;
}

interface SearchBarProps {
	refreshMovies: Function;
	nominatedMovies: ImdbMovie[];
}

export const SearchBar: React.FC<SearchBarProps> = ({refreshMovies, nominatedMovies}) => {
	const [movies, setMovies] = useState([]);

	return (
		<Box mb={4}>
			<Formik
				initialValues={{ search: ""}} 
				onSubmit={ async (values, {setErrors}) => {
					if (values.search.length < 1) {
						setErrors({search: "Search cannot be empty"});
						setMovies([]);
						return;
					}

					await axios
						.get<ImdbSearch>("http://www.omdbapi.com/?apikey=8140e84f&page=1&type=movie&s=" + values.search)
						.then(response => {
							if (response.data.Response === "False") {
								throw new Error(response.data.Error); 
							}
							const results = rawImdbToMine(response.data.Search)
							setMovies(results)
							// showResults(response.data.Search);
						})
						.catch(err => {
							setMovies([]);
							setErrors({search: err.message});
						})
				}}
			>
				{(props) => (
					<Form>
						<FormControl isInvalid={!!props.errors.search} pb={6} >
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<SearchIcon color="teal.500"/>}
								/>
								<Input 
									id="search"
									name="search" 
									type="text"
									placeholder="Enter the title of the movie" 
									onChange={props.handleChange}
								/>
								<Button
									ml={4}
									colorScheme="teal"
									isLoading={props.isSubmitting}
									type="submit"
								>
									Search
								</Button>
							</InputGroup>
							<FormErrorMessage position="absolute" >{ props.errors.search }</FormErrorMessage> 
						</FormControl>
						{movies.length > 0 ? <Box>Search results for "{props.values.search}"</Box> : null }
					</Form>
				)}
			</Formik>
			<Flex flexWrap="wrap" borderRadius="lg" p={4} bg="gray.900">
				{movies.map((movie: ImdbMovie) => (
					<Movie 
						{...movie}
						key={movie.imdbId}
						updateMe={refreshMovies}
						variant="Result"
						isNominated={nominatedMovies.filter(nMovie => {
							return nMovie.imdbId === movie.imdbId;
						}).length > 0}
					/>
				))}
			</Flex>
		</Box>
	);
}

function rawImdbToMine(rawMovies: RawImdb[]): ImdbMovie[] {
	return rawMovies.map(
		({Title: title, Year: year, imdbID: imdbId, Poster: poster, Type: _ }: RawImdb) => (
			{title, year: parseInt(year), imdbId, poster, id: -1}
		)
	);
}