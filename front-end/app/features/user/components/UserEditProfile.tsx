// import Image from "next/image"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react"

const UserEditProfile = () => {
	return (
		<div >
			<FormControl >
				<FormLabel>name</FormLabel>
				<Input type="name"/>
				<FormLabel>email</FormLabel>
				<Input type="email"/>
				<FormLabel>icon</FormLabel>
				<Input type="icon"/>
			</FormControl>
			<Button>Update</Button>
		</div>
	)
}

export default UserEditProfile;