import React from 'react'
import { Box } from "@chakra-ui/core"

interface MyContainerProps {
	variant?: "small" | "regular"
}

export const MyContainer: React.FC<MyContainerProps> = ({children, variant="regular" }) => {
		return (
			<Box
				mt={8}
				maxW={variant === "regular" ? "50%" : "30%" }
				w="100%"
				mx="auto"
			>
			{children}
			</Box>
		);
}