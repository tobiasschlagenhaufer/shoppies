import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";
import { MyContainer } from "../components/MyContainer";
import { Box, Button } from "@chakra-ui/react";
import { useLoginMutation, FieldError } from "../generated/graphql";
import { useRouter } from "next/router";

interface registerProps {

}

const Login: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	// Use generated register graphql hook; for typesafe queries (opposed to raw graphql)
	const [, login] = useLoginMutation();
	return (
		<MyContainer variant="small">
			<Formik 
				initialValues={{ username: "", password: ""}} 
				onSubmit={ async (values, { setErrors }) => {
					const response = await login(values);
					// use optional chaining so it doesn't crash when data is undefined
					if (response.data?.login.errors) {
						// we have some errors, show them to the user in the correct input field
						setErrors(errorToMap(response.data.login.errors))
					} else if (response.data?.login.user) {
						// login worked
						router.push('/');
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Box mt={4}>
							<InputField
								name="username"
								placeholder="username"
								label="Username"	
							/>
						</Box>

						<Box mt={4}>
						<PasswordField
							name="password"
							placeholder="password"
							label="Password"
							type="password"
						/>
						</Box>

						<Button
							mt={4}
							colorScheme="teal"
							isLoading={isSubmitting}
							type="submit"
						>
							Sign in
          				</Button>

					</Form>
				)}
			</Formik>
		</MyContainer>
	);
}

export default Login;

const errorToMap = (errors: FieldError[]) => {
	const errorsDeconstructed = {};
	errors.forEach(({ field, message }) => {
		errorsDeconstructed[field] = message;
	});

	return errorsDeconstructed;
}