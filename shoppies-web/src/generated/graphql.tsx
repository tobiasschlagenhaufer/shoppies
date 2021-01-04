import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  movies: Array<Movie>;
  movie?: Maybe<Movie>;
  topNominations?: Maybe<Array<Movie>>;
  users: Array<User>;
  me?: Maybe<User>;
  myMovies?: Maybe<Array<Movie>>;
};


export type QueryMovieArgs = {
  id: Scalars['Int'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  imdbId: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['Float'];
  poster: Scalars['String'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  movies: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  refreshMovies?: Maybe<Array<Movie>>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addMovieToUser: MovieCrudResponse;
  removeMovieFromUser: MovieCrudResponse;
};


export type MutationCreateMovieArgs = {
  year: Scalars['Int'];
  title: Scalars['String'];
  imdbId: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationAddMovieToUserArgs = {
  poster: Scalars['String'];
  year: Scalars['Int'];
  title: Scalars['String'];
  imdbId: Scalars['String'];
};


export type MutationRemoveMovieFromUserArgs = {
  imdbId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MovieCrudResponse = {
  __typename?: 'MovieCrudResponse';
  movie?: Maybe<Movie>;
  error?: Maybe<Scalars['String']>;
};

export type MovieInfoFragment = (
  { __typename?: 'Movie' }
  & Pick<Movie, 'id' | 'imdbId' | 'title' | 'year' | 'poster'>
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type AddMovieToUserMutationVariables = Exact<{
  imdbId: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['Int'];
  poster: Scalars['String'];
}>;


export type AddMovieToUserMutation = (
  { __typename?: 'Mutation' }
  & { addMovieToUser: (
    { __typename?: 'MovieCrudResponse' }
    & Pick<MovieCrudResponse, 'error'>
    & { movie?: Maybe<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RefreshMoviesMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMoviesMutation = (
  { __typename?: 'Mutation' }
  & { refreshMovies?: Maybe<Array<(
    { __typename?: 'Movie' }
    & MovieInfoFragment
  )>> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RemoveMovieFromUserMutationVariables = Exact<{
  imdbId: Scalars['String'];
}>;


export type RemoveMovieFromUserMutation = (
  { __typename?: 'Mutation' }
  & { removeMovieFromUser: (
    { __typename?: 'MovieCrudResponse' }
    & Pick<MovieCrudResponse, 'error'>
    & { movie?: Maybe<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type MyMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyMoviesQuery = (
  { __typename?: 'Query' }
  & { myMovies?: Maybe<Array<(
    { __typename?: 'Movie' }
    & MovieInfoFragment
  )>> }
);

export type TopNominationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopNominationsQuery = (
  { __typename?: 'Query' }
  & { topNominations?: Maybe<Array<(
    { __typename?: 'Movie' }
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
    & MovieInfoFragment
  )>> }
);

export const MovieInfoFragmentDoc = gql`
    fragment MovieInfo on Movie {
  id
  imdbId
  title
  year
  poster
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  username
}
    `;
export const AddMovieToUserDocument = gql`
    mutation AddMovieToUser($imdbId: String!, $title: String!, $year: Int!, $poster: String!) {
  addMovieToUser(imdbId: $imdbId, title: $title, year: $year, poster: $poster) {
    movie {
      ...MovieInfo
    }
    error
  }
}
    ${MovieInfoFragmentDoc}`;

export function useAddMovieToUserMutation() {
  return Urql.useMutation<AddMovieToUserMutation, AddMovieToUserMutationVariables>(AddMovieToUserDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    user {
      ...UserInfo
    }
    errors {
      field
      message
    }
  }
}
    ${UserInfoFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RefreshMoviesDocument = gql`
    mutation RefreshMovies {
  refreshMovies {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

export function useRefreshMoviesMutation() {
  return Urql.useMutation<RefreshMoviesMutation, RefreshMoviesMutationVariables>(RefreshMoviesDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    user {
      ...UserInfo
    }
    errors {
      field
      message
    }
  }
}
    ${UserInfoFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RemoveMovieFromUserDocument = gql`
    mutation RemoveMovieFromUser($imdbId: String!) {
  removeMovieFromUser(imdbId: $imdbId) {
    movie {
      ...MovieInfo
    }
    error
  }
}
    ${MovieInfoFragmentDoc}`;

export function useRemoveMovieFromUserMutation() {
  return Urql.useMutation<RemoveMovieFromUserMutation, RemoveMovieFromUserMutationVariables>(RemoveMovieFromUserDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyMoviesDocument = gql`
    query MyMovies {
  myMovies {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

export function useMyMoviesQuery(options: Omit<Urql.UseQueryArgs<MyMoviesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyMoviesQuery>({ query: MyMoviesDocument, ...options });
};
export const TopNominationsDocument = gql`
    query TopNominations {
  topNominations {
    ...MovieInfo
    users {
      id
    }
  }
}
    ${MovieInfoFragmentDoc}`;

export function useTopNominationsQuery(options: Omit<Urql.UseQueryArgs<TopNominationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TopNominationsQuery>({ query: TopNominationsDocument, ...options });
};