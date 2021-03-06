import { Box, Heading, Text, Image, Link, Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { FaGithub, FaReact } from 'react-icons/fa'
import { SiGraphql, SiNodeDotJs, SiPostgresql, SiTypescript } from 'react-icons/si'
import { Cover } from './Cover'

interface FrontPageProps {

}

const FrontPage: React.FC<FrontPageProps> = ({}) => {
    return (
        <Box pt={0} textAlign="left">
            
            {/* <Heading fontSize="4xl">Welcome </Heading> */}
            <Cover w="100%"/>
            <Box mt={4} borderRadius="lg" bg="gray.900" p="10">
                <HStack>
                    <Heading fontSize="4xl" alignSelf="center">Welcome to the Shoppies!</Heading>
                    <Link href="https://github.com/tobiasschlagenhaufer/shoppies/tree/master" target="_blank">
                        <Button colorScheme="facebook" leftIcon={<FaGithub />}>
                            Code Available on Github
                        </Button>
                    </Link>
                </HStack>
                <Text fontSize="xl" fontWeight="thin" mt={10}>
                    <NextLink href="/login"><Link fontWeight="bold">Login</Link></NextLink>
                    {" "}or{" "}
                    <NextLink href="/register"><Link fontWeight="bold">Register</Link></NextLink> 
                    {" "}an account to get started!
                </Text>
                <Box mt={20}>
                    <Heading  mb={2} fontSize="md">Made using</Heading>
                    <ul>
                        <li>
                            <HStack>
                                <Text>TypeScript React</Text>
                                <SiTypescript />
                                <FaReact/>
                            </HStack>
                        </li>
                        <li>
                            <HStack>
                                <Text>GraphQL</Text>
                                <SiGraphql/> 
                            </HStack>
                        </li>
                        <li>
                            <HStack>
                                <Text>Node.JS</Text>
                                <SiNodeDotJs/> 
                            </HStack>
                        </li>
                        <li>
                            <HStack>
                                <Text>Postgresql</Text>
                                <SiPostgresql/> 
                            </HStack>
                        </li>
                    </ul>
                    <Text mt={3}>By Tobias Schlagenhaufer.</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default FrontPage;