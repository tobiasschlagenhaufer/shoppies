import { Flex, Box } from '@chakra-ui/react';
import React from 'react'


interface ConstrainedBoxProps {
	bg?: string;
}

export const ConstrainedBox: React.FC<ConstrainedBoxProps> = (props) => {
		return (
				<Box
					bg={props.bg ? props.bg : ""}
					maxW={{ xl: "1200px" }}
					m="0 auto"
					{...props}
				>
					{props.children}
				</Box>
		);
}