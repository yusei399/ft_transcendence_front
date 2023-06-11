import { FormControl, Input, Flex, Card, CardBody } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isUsernameEmpty = username.trim() === "";
  const isPasswordEmpty = password.trim() === "";

  return (
    <div
		style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
		}}
    >
		<form>
        <Flex flexDirection="column" alignItems="center">
			<Card border="1px solid gray" borderRadius="md" height={300} >
				<CardBody marginTop={20}>
				<FormControl isRequired margin={5}>
                <Input
					placeholder="username"
					variant="outline"
					sx={{
						borderWidth: "1px",
						borderColor: isUsernameEmpty ? "gray.300" : "blue.500",
					}}
					rounded="full"
					px={5}
					/>
				</FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="password"
                  variant="outline"
                  sx={{
                    borderWidth: "1px",
                    borderColor: isPasswordEmpty ? "gray.300" : "blue.500",
                  }}
                  rounded="full"
                  px={5}
				  marginLeft={5}
				  marginBottom={5}
                />
              </FormControl>

              <chakra.button
                px="20"
                py="1"
                bg="green.200"
                rounded="full"
                margin={7}
                _hover={{ bg: "green.300" }}
                onClick={() => navigate("/")}
              >
                Login
              </chakra.button>
            </CardBody>
          </Card>
        </Flex>
      </form>
    </div>
  );
};

export default Login;
