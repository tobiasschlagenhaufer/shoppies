import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { ConstrainedBox } from './ConstrainedBox';
import { Header } from './Header';


interface PageLayoutProps {

}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	React.useEffect(
	  () => {
		if (colorMode === 'light') {
		  toggleColorMode();
		}
	  },
	  [colorMode, toggleColorMode],
	)

		return (
			<Box>
				<Header />
					<ConstrainedBox>
						{props.children}
					</ConstrainedBox>
			</Box>
		);
}