import { ImdbMovie } from "../custom";
import React, { useState } from 'react'
import { Box, Button } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { Movie } from "./Movie";
import { FaTwitter } from "react-icons/fa";
import { Heading } from "@chakra-ui/core";

type NominationBodyProps = {
    movies: ImdbMovie[]
    refreshMovies: Function;
}

export const NominationBody: React.FC<NominationBodyProps> = ({movies, refreshMovies}) => {

    const shareTwitter = () => {
         // Opens a pop-up with twitter sharing dialog
         var shareURL = "http://twitter.com/share?"; //url base
         //params
         var params = {
             url: "", //update when site is published
             text: "My Shoppies Nominations are in! \n" + movies.map(movie => {return "- " + movie.title}).join('\n') + "\n"
         }
         for(var prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
         window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    }

    return (
        <Box>
            <SearchBar 
                refreshMovies={refreshMovies}
                nominatedMovies={movies}
            />
          <Heading fontSize="xl">Your Nominations</Heading>
          <Box p={4} d="flex" flexWrap="wrap"  borderRadius="lg" bg="gray.900">
            {movies.map(movie => (
                <Movie
                    {...movie}
                    key={movie.id}
                    updateMe={refreshMovies}
                    variant="Nomination"
                />
            ))}
            {movies.length == 0 ? 
                "Nominate 5 movies for the Shoppies :)" 
            :
                <Button 
                    colorScheme="twitter"
                    leftIcon={<FaTwitter />}
                    onClick={shareTwitter}
                >
                    Share
                </Button>
            }
            </Box>
        </Box>
    );
}
