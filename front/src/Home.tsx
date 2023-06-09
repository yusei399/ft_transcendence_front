import React from "react";
import { useNavigate } from 'react-router-dom';
import { chakra } from "@chakra-ui/react";



const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>Home Page</h1>
			<chakra.button px='3'
				py='2'
				bg='green.200'
				rounded='md'
				_hover={{ bg: 'green.300' }}
				onClick={() =>navigate('/login')}>Login
			</chakra.button>
			<chakra.button 
				py='2'
				bg='green.200'
				rounded='md'
				_hover={{ bg: 'green.300' }}
				onClick={() => navigate('/register')}>
				Register
			</chakra.button>
		</>
	);
}

export default Home;