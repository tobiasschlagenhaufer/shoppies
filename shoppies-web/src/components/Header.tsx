import React from 'react'
import { Box, Flex, Text, Button, Stack, Heading, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react"
import NextLink from "next/link"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Logo } from './Logo';
import { CloseIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { ConstrainedBox } from './ConstrainedBox';
import { useRouter } from 'next/router';

interface HeaderProps {

}

const MenuItems = (props) => {
	const { children, isLast, to = "/", ...rest } = props
	return (
		<NextLink href={to}>
			{props.myvariant === "Button" ? 
				<Button
					display="block"
					{...rest}
				>
					{children}
				</Button>
			:
				<Link mt={1} mr={4} {...rest}>
					<Text fontSize="xl">
						{children}
					</Text>
				</Link>
			}	
		</NextLink>
	)
}

export const Header: React.FC<HeaderProps> = (props) => {
	const [show, setShow] = React.useState(false)
  	const toggleMenu = () => setShow(!show)
	const [{fetching: logoutFetching}, logout] = useLogoutMutation();
	const [{data, fetching}] = useMeQuery({requestPolicy: 'network-only'});
	const router = useRouter();

	if (fetching) {
		// data is loading
	} 

	return (
		<Box bg={"teal.300"}>
			<ConstrainedBox><Flex
				// @ts-ignore
				as="nav" // types issue causing ConstrainedBox to not recognize flex attributes... need to look into it
				align="center"
				justify="space-between"
				wrap="wrap"
				w="100%"
				mb={8}
				pt={2}
				pb={2}
			>
				<NextLink href={"/"}><Link>
					<Flex align="center">
						<Logo />
						<Text fontSize="4xl" color="white" fontFamily={"Trebuchet MS"} fontStyle="italic">hoppies</Text>
					</Flex>
				</Link></NextLink>

				<Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
					{show ? <CloseIcon /> : <ChevronDownIcon />}
				</Box>

				<Box
					display={{ base: show ? "block" : "none", md: "block" }}
					flexBasis={{ base: "100%", md: "auto" }}
				>
				{/* is user is logged in */}
				{data?.me ?
					<Flex
						align={["center", "center", "center", "center"]}
						justify={["center", "space-between", "flex-end", "flex-end"]}
						direction={["column", "row", "row", "row"]}
						pt={[4, 4, 0, 0]}
					>
						{!router.pathname.includes("nominees") ? 
							<MenuItems to="nominees" myvariant="link">Top Nominees</MenuItems>
						:
							<MenuItems to="/" myvariant="link">Home</MenuItems>
						}
						<Menu>
							<MenuButton border="thin solid white" mr={2} as={Button} colorScheme="pink">
								Hi, {data.me.username}!
							</MenuButton>
							<MenuList>
								<MenuGroup title="Profile">
									<MenuItem disabled={true}>My Account</MenuItem>
									<MenuItem disabled={true}>Payments </MenuItem>
								</MenuGroup>
									<MenuDivider />
								<MenuGroup title="Help">
									<MenuItem disabled={true}>FAQ</MenuItem>
								</MenuGroup>
							</MenuList>
						</Menu>
						<MenuItems 
							to="/"
							colorScheme="teal"
							border="thin white solid"
							myvariant="Button"
							isLoading={logoutFetching}
							onClick={() => {logout()}}
						>
							Logout
						</MenuItems>
					</Flex>
				:
					<Flex>
						{!router.pathname.includes("nominees") ? 
							<MenuItems to="nominees" myvariant="link">Top Nominees</MenuItems>
						:
							<MenuItems to="/" myvariant="link">Home</MenuItems>
						}
						<MenuItems to="login" colorScheme="teal" border="thin white solid" mr={2} myvariant="Button">Sign In</MenuItems>
						<MenuItems to="register" colorScheme="teal" border="thin white solid" myvariant="Button">Register</MenuItems>
					</Flex>
				}
				</Box>
			</Flex></ConstrainedBox>
		</Box>
	);
}