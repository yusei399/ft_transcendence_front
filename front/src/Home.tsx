import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardBody, chakra, Flex, Text } from "@chakra-ui/react";

const Home = () => {
	const navigate = useNavigate();

	return (
    <Flex
		justifyContent="center"
		alignItems="center"
		height="100vh"
    >
		<Card
        border="1px solid black"
        borderRadius="md" 
		height={200}
		>
        <CardBody>
			<Text align="center" marginRight={2} marginBottom={7}>Top Page</Text>
			<Flex direction="column" alignItems="center">
            <chakra.button
				px='10'
				py='1'
				bg='green.200'
				rounded='full' 
				margin={5}
				_hover={{ bg: 'green.300' }}
				onClick={() => navigate('/login')}>
				Login
            </chakra.button>
            <chakra.button
				py='1'
				px='9'
				bg='green.200'
				rounded='full'
				_hover={{ bg: 'green.300' }}
				onClick={() => navigate('/signup')}>
				Signup
            </chakra.button>
			</Flex>
        </CardBody>
		</Card>
    </Flex>
	);
}

export default Home;





