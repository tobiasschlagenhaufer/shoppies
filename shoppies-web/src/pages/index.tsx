import {
  Box, ChakraProvider, Text, Heading
} from '@chakra-ui/react'
import { useMeQuery, useMyMoviesQuery } from '../generated/graphql';
import { PageLayout } from "../components/PageLayout"
import React from "react";
import { NominationBody } from '../components/NominationBody';
import FrontPage from '../components/FrontPage';
  
interface IndexProps{}

const Index = (IndexProps) => {
  const [{data, fetching}] = useMeQuery({requestPolicy: 'network-only'});
  const [{data: moviesData, fetching: fetchingMovies}, refreshMovies] = useMyMoviesQuery({requestPolicy: "network-only"}); 
  const movies = moviesData?.myMovies;

  let body = null;

  if (fetching) {
    // data is loading, do some animations...
	} else if (!data?.me) {
    // user is not logged in
    body = (
      <FrontPage />
    );
  } else if (movies){
    // user is logged in and movies are loaded
      body = (
        <NominationBody movies={movies? movies : []} refreshMovies={refreshMovies}/>
      );
  }

  return (
    <ChakraProvider>
      <PageLayout>
        <Box>
          { body }
        </Box>
      </PageLayout>
    </ChakraProvider>
  )
}

export default Index;
