import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { MyContainer } from "../components/MyContainer";
import { Box, Button } from "@chakra-ui/react";
import { useRegisterMutation, FieldError } from "../generated/graphql";
import { useRouter } from "next/router";
import { PasswordField } from "../components/PasswordField";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	// Use generated register graphql hook; for typesafe queries (opposed to raw graphql)
	const [, register] = useRegisterMutation();
	return (
		<MyContainer variant="small">
			<Formik 
				initialValues={{ username: "", password: ""}} 
				onSubmit={ async (values, { setErrors }) => {
					console.log(values)
					const response = await register(values);
					// use optional chaining so it doesn't crash when data is undefined
					if (response.data?.register.errors) {
						// we have some errors, show them to the user in the correct input field
						setErrors(errorToMap(response.data.register.errors))
					} else if (response.data?.register.user) {
						// register worked
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
							Register
          				</Button>

					</Form>
				)}
			</Formik>
		</MyContainer>
	);
}

export default Register;

const errorToMap = (errors: FieldError[]) => {
	const errorsDeconstructed = {};
	errors.forEach(({ field, message }) => {
		errorsDeconstructed[field] = message;
	});

	return errorsDeconstructed;
}