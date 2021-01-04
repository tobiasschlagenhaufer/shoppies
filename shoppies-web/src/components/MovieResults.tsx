import { Box } from '@chakra-ui/react';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ImdbMovie } from "../custom"
import { Movie } from './Movie';

type MovieResultsProps = {
    movies: ImdbMovie[];
}

export class MovieResults extends Component<{}, MovieResultsProps> {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        };
    }


    handleResultUpdate(newMovies: ImdbMovie[]) {
        this.setState({movies: newMovies});
    }

    render() {
        const result = (
            this.state.movies.map(movie => (
                // <Movie 
                // {...movie}
                // />
                <></>
            ))
        );
        return (
            <Box>
                {result} 
            </Box>
        );
    }
}