import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardBody, chakra, Flex, Text } from "@chakra-ui/react";
import Login from "./account/Login";

const Home = () => {
	const navigate = useNavigate();

	return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
		<Card border="1px solid #ccc" borderRadius="md" height={350} boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">
        <CardBody>
          <Flex direction="column" alignItems="center">
            <Text align="center" marginRight={2} mb={15} mt={5}>
              Top Page
            </Text>
            <Login />
            <Flex direction="column" alignItems="center" mt={2}>
              <chakra.button
                py="1"
                px="20"
                bg="green.200"
                rounded="full"
                _hover={{ bg: "green.300" }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </chakra.button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Home;







