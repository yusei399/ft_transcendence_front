"use client"
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	let token;
	const router = useRouter()
	const goto42 = () => {
		// router.push("http://localhost:3333/auth/42");
		// router.prefetch("http://localhost:3333/auth/42")
		// fetch("http://localhost:3333/auth/42")
		// 	.then(res => document.location.href = res.url)
		// 	.then(res => res)
		// 	.then(body => {
		// 		token = body.authToken;
		// 		console.log(token);
		// 	}).finally(() => router.push("/"));
	}
	return (
	  <>
		<Button colorScheme='blue' onClick={goto42}>ログインボタン 42apiに置き換え</Button>
	  </>
	);
  }


export default LoginPage;