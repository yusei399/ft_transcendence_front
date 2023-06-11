import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Card,
  CardBody,
} from "@chakra-ui/react";
import axios from "axios";
import { chakra } from "@chakra-ui/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const clearForm = () => {
	setUsername("");
	setPassword("");
	setConfirmPassword("");
	setProfileImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
  
	if (password !== confirmPassword) {
	  alert("Passwords do not match");
	  return;
	}
  
	try {
	  const formData = new FormData();
	  formData.append("username", username);
	  formData.append("password", password);
	  formData.append("confirmPassword", confirmPassword);
	  if (profileImage) {
		formData.append("profileImage", profileImage);
	  }
  
	  const res = await axios.post("/users/signup", formData);
	  console.log(res.data);
	  clearForm();
	  setIsSubmitted(true);
	} catch (err) {
	  console.error(err);
	}
	setUsername("");
	setPassword("");
	setConfirmPassword("");
	setProfileImage(null);
	setIsSubmitted(true);
  };

  const isUsernameEmpty = username.trim() === "";
  const isPasswordEmpty = password.trim() === "";
  const isConfirmPasswordEmpty = confirmPassword.trim() === "";

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];
	if (file) {
    setProfileImage(file);
	} else {
    setProfileImage(null); 
	}
  };

  return (
    <>
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Card border="1px solid #ccc" borderRadius="md" height={380}  width={330} boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" >
        <CardBody  display="flex" justifyContent="center" mt={5}>
        <Flex direction="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired isInvalid={isUsernameEmpty} >
                  <FormLabel  ml={20}>Username</FormLabel>
                  <Input
                    placeholder="username"
                    variant="outline"
                    sx={{
                      borderWidth: "1px",
                      borderColor: isUsernameEmpty ? "red.300" : "blue.500",
                      "&::placeholder": {
                        fontSize: "0.8em",
                        paddingLeft: "0.5em",
                      },
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    rounded={"full"}
                    ml={20}
                  />
                  {isUsernameEmpty && (
                    <FormErrorMessage color="red"  ml={20}>Username is required.</FormErrorMessage>
                  )}
            </FormControl>

              <FormControl isRequired isInvalid={isPasswordEmpty}>
                <FormLabel  ml={20}>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="password"
                  variant="outline"
                  sx={{ borderWidth: "1px", 
                        borderColor: isPasswordEmpty ? "red.300" : "blue.500",
                        "&::placeholder": {
                          fontSize: "0.8em",
                          paddingLeft: "0.5em",
                        },
                      }}
                  value={password}
                  rounded={"full"}
                  onChange={(e) => setPassword(e.target.value)}
                  ml={20}
                />
                {isPasswordEmpty && (
                  <FormErrorMessage color="red"  ml={20}>Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={isConfirmPasswordEmpty}>
                <FormLabel  ml={20}>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="confirm password"
                  variant="outline"
                  sx={{ borderWidth: "1px", 
                        borderColor: isConfirmPasswordEmpty ? "red.300" : "blue.500",
                        "&::placeholder": {
                          fontSize: "0.8em",
                          paddingLeft: "0.5em",
                        }, 
                      }}
                  value={confirmPassword}
                  rounded={"full"}
                  ml={20}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {isConfirmPasswordEmpty && (
                  <FormErrorMessage color="red"  ml={20}>Confirm Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel  ml={20} >Profile Image</FormLabel>
                <Input isRequired type="file" accept="image/*" onChange={handleProfileImageChange}   ml={20}/>
              </FormControl>

              <chakra.button 
                  py='1'
                  px='20'
                  bg='green.200'
                  rounded='full'
                  _hover={{ bg: 'green.300' }}
                  type="submit"
                  ml={20}
                  mt={4}
                  >Sign Up
              </chakra.button>
                </form>

                {isSubmitted && (
                  <Box mt={4} color="green">Registration successful! You can now log in.</Box>
                )}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Signup;
