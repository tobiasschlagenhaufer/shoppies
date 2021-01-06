import { StarIcon } from '@chakra-ui/icons';
import { Box, Button, Image, Spinner, useToast } from '@chakra-ui/react';
import React from 'react';
import { useAddMovieToUserMutation, useMeQuery, useRefreshMoviesMutation, useRemoveMovieFromUserMutation } from '../generated/graphql';

type MovieProps = {
	title: string;
	year: number;
	imdbId: string;
	isNominated?: boolean;
	poster?: string;
	updateMe?: Function;
	variant: "Result" | "Nomination";
}

export const Movie: React.FC<MovieProps> = (movie) => {
	const [{fetching: addMovieFetching}, addMovieToUser] = useAddMovieToUserMutation();
	const [{fetching: removeMovieFetching}, removeMovieFromUser] = useRemoveMovieFromUserMutation();
	const [, refreshMutation] = useRefreshMoviesMutation();
	const toast = useToast();

	let src = ""
	if (movie.poster == "N/A" ) {
		src = "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
	}
	else {
		src = movie.poster
	}

	return (
		<Box
			bg="gray.700"
			minW="100px"
			// h=""
			// maxW={movie.variant == "Result" ? "9%" : "15%"}
			
			maxW={movie.variant == "Result" ? "138px" : "165px"}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			mr={2}
			_hover={{
				boxShadow: "0 2px 5px rgba(255, 255, 255, 0.4)"
			}}
		>
			<Image 
				h={movie.variant == "Result" ? "200px" : "250px"}
				src={src}
				fallback={
					<Spinner 
						right= "50%"
					/>
				}
				objectFit="cover"
			/>

			<Box p="2">
				<Box
					mt="1"
					fontWeight="semibold"
					as="h4"
					lineHeight="tight"
					isTruncated
				>
					{movie.title}
				</Box>

				<Box>
					{movie.year}
				</Box>
			</Box>
			<Box>
				<Button
					border="1px solid white"
					colorScheme={movie.variant === "Nomination" ? "pink" : "green"}
					left="50%"
					transform="translate(-50%, 0)"
					mb={2}
					size={movie.variant == "Result" ? "sm" : "md"}
					isLoading={movie.isNominated ? removeMovieFetching : addMovieFetching }
					disabled={movie.variant == "Result" && movie.isNominated}
					onClick={() => {
						if (movie.variant == "Nomination") {
							removeMovieFromUser({ imdbId: movie.imdbId })
								.then(function() { 
									movie.updateMe() 
								})
						} else if (movie.variant == "Result" && !movie.isNominated) {
							toast.closeAll()
							addMovieToUser({ imdbId: movie.imdbId, title: movie.title, year: movie.year, poster: movie.poster })
								.then(result => {
									if (result.data.addMovieToUser.error) {
										toast.closeAll();
										toast({
											title: "Error adding movie.",
											description: result.data.addMovieToUser.error,
											status: "error",
											duration: 5000,
											isClosable: true,
											position: 'top',
										});
										movie.updateMe()
									} else {
										movie.updateMe()
										refreshMutation().then(result => {
											if (result.data.refreshMovies.length == 5) {
												toast({
													title: "All done!",
													description: "You've nominated 5 movies.\nThey are now added and will count towards the Shoppies.",
													status: "success",
													duration: 9000,
													isClosable: true,
													position: "top",
												})
											}
										});
									}
								});
						} else {
							// already nominated
						}
					}}
				>
					{ movie.variant == "Result" ?
						movie.isNominated? "Nominated" : "Nominate"
					:
						"Remove"
					}
				</Button>
			</Box>
		</Box>
	);
}