import React, { useState } from "react";
import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Box
	} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
		alert("Passwords do not match");
		return;
    }

    try {
		const res = await axios.post("/users/register", {
        username,
        password,
        confirmPassword
		});
		console.log(res.data);
    } catch (err) {
		console.error(err);
    }
	
    setUsername("");
    setPassword("");
    setConfirmPassword("");
	setIsSubmitted(true);
	};

	const isUsernameEmpty = username.trim() === "";
	const isPasswordEmpty = password.trim() === "";
	const isConfirmPasswordEmpty = confirmPassword.trim() === "";

	return (
    <>
		<form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={isUsernameEmpty}>
			<FormLabel>Username</FormLabel>
				<Input
				placeholder="username"
				variant="outline"
				sx={{ borderWidth: "1px", borderColor: isUsernameEmpty ? "red.300" : "blue.500" }}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				/>
			{isUsernameEmpty && (
				<FormErrorMessage color="red">Username is required.</FormErrorMessage>
			)}
        </FormControl>

        <FormControl isRequired isInvalid={isPasswordEmpty}>
			<FormLabel>Password</FormLabel>
			<Input
				type="password"
				placeholder="password"
				variant="outline"
				sx={{ borderWidth: "1px", borderColor: isPasswordEmpty ? "red.300" : "blue.500" }}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{isPasswordEmpty && (
				<FormErrorMessage color="red">Password is required.</FormErrorMessage>
			)}
        </FormControl>

        <FormControl isRequired isInvalid={isConfirmPasswordEmpty}>
			<FormLabel>Confirm Password</FormLabel>
			<Input
				type="password"
				placeholder="confirm password"
				variant="outline"
				sx={{ borderWidth: "1px", borderColor: isConfirmPasswordEmpty ? "red.300" : "blue.500" }}
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			{isConfirmPasswordEmpty && (
            <FormErrorMessage color="red">Confirm Password is required.</FormErrorMessage>
			)}
        </FormControl>

        <Button type="submit">Submit</Button>
		</form>

		{isSubmitted && (
			<Box mt={4} color="green">Registration successful! You can now log in.</Box>
		)}

		<h1>#Register Page</h1>
    </>
	);
};

export default Register;












