import React from 'react'
import { ChakraProvider, ColorModeProvider, useColorMode } from "@chakra-ui/react"
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql"
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import theme from '../theme'

function updateQuery2<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => any
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "include",
    // mode: 'no-cors'
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
  },
  // hardset graphql query values after hook call to update cache
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          updateQuery2<LoginMutation, MeQuery>(cache, {query: MeDocument}, _result, 
            (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return { me: result.login.user, };
              }
            }
          )
        },
        register: (_result, args, cache, info) => {
          updateQuery2<RegisterMutation, MeQuery>(cache, {query: MeDocument}, _result, 
            (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return { me: result.register.user, };
              }
            }
          )
        },
        logout: (_result, args, cache, info) => {
          updateQuery2<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({ me: null })
          );
        },
      }
    }
  }), fetchExchange]
});

function MyApp({ Component, pageProps }) {

  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
            initialColorMode: "dark",
          }}
        >
            <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
