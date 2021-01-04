import React, { useState } from "react";
import { Badge, Box, Button, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { useMyMoviesQuery, useTopNominationsQuery } from "../generated/graphql";
import { ConstrainedBox } from "../components/ConstrainedBox";
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";

interface nomineesProps {

}

interface DetailImdb {
	imdbID: string;
    imdbRating: string;
    Plot: string;
    Response: string;
	Error?: string;
}

const Nominees: React.FC<nomineesProps> = ({}) => {
    const [{data, fetching}, refreshMovies] = useTopNominationsQuery({requestPolicy: 'network-only'});
    const [{data: meData}] = useMyMoviesQuery({requestPolicy: 'network-only'});
    const movies =  data? data.topNominations : [];
    const [details, setDetails] = useState(new Array(5));

	return (
		<Box>
            <Header />
            <ConstrainedBox>
                <Box>
                {movies.length == 0 ? "No nominated movies yet..." : null  }
                {movies.map((movie, i) => (
                    <Box d="flex" ml={3} mt={3} borderRadius="lg" bg="gray.900" key={i}>
                        <Image
                            borderLeftRadius="lg"
                            src={movie.poster != "NA" ? movie.poster : "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"}
                            objectFit="cover"
                            maxHeight="300px"
                            fallback={<Spinner/>}
			            />
                        <Box ml={3}>
                            <Heading>{i+1}. {movie.title} ({movie.year})</Heading>
                            <Text mt={3}><Badge colorScheme="teal">{movie.users.length}</Badge> nomination{movie.users.length > 1 ? "s" : ""}</Text>
                            {details[i]?.imdbID ?  
                                <Box>
                                    <Text mt={10}>Summary: {details[i].Plot}</Text>
                                    <Box d="flex" mt="2" alignItems="center">
                                        {Array(5)
                                            .fill("")
                                            .map((_, j) => (
                                                <StarIcon
                                                    key={j}
                                                    color={j < Math.floor(details[i]?.imdbRating/2) ? "teal.500" : "gray.300"}
                                                />
                                        ))}
                                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                            {details[i]?.imdbVotes} IMDB Reviews
                                        </Box>
                                    </Box>
                                </Box>
                            : 
                                <Button
                                    mt={10}
                                    colorScheme="teal"
                                    onClick={() => {
                                        axios
                                            .get<DetailImdb>("http://www.omdbapi.com/?apikey=8140e84f&page=1&type=movie&i="+movie.imdbId)
                                            .then(response => {
                                                if (response.data.Response === "False") {
                                                    throw new Error(response.data.Error); 
                                                }
                                                details[i] = response.data;
                                                setDetails([...details]);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                        }
                                    }
                                >
                                    Learn more
                                </Button>
                            }
                        </Box>
                        <Box>
                            {meData?.myMovies?.some( myMovie => myMovie.imdbId === movie.imdbId ) ? <Badge colorScheme="purple">You nominated this movie!</Badge> : null}
                        </Box>
                    </Box>
                ))}
                </Box>
            </ConstrainedBox>
        </Box>
	);
}

export default Nominees;