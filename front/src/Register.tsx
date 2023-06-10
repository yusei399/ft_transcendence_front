import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  };

  const isUsernameEmpty = username.trim() === "";
  const isPasswordEmpty = password.trim() === "";
  const isConfirmPasswordEmpty = confirmPassword.trim() === "";

  return (
    <>
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
        {!isUsernameEmpty && (
          <FormHelperText>
            Enter the username you'd like to receive the newsletter on.
          </FormHelperText>
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

      <h1>#Register Page</h1>
    </>
  );
};

export default Register;









