// import Image from 'next/image';

import { Button, Card, CardHeader, Wrap, WrapItem, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const UserProfile = () => {
	return (
		<div >
			<Card align="center" mt="10%" mr="40%" ml="40%">
				<CardHeader mb="20">
					<Wrap>
						<div className='personal' style={{ display: 'flex' }}>
							<div className='user-image'>
								<WrapItem mr="10">
									<Avatar name='test' src="./assets/sample.png" />
								</WrapItem>
							</div>
							<div className="person-detail" style={{display: 'flex', flexFlow: "column"}}>
								<div className='user-name'>
									<Text>test name</Text>
								</div>
								<div className='user-email'>
									<Text>test email</Text>
								</div>
							</div>
						</div>
					</Wrap>
				</CardHeader>
				<div className='user-function' >
					<CardBody>
						<div style={{ display: 'flex'}}>
							<Button  colorScheme='blue' mr="10" width="35">chat</Button>
							<Button  colorScheme='blue' ml="10" width="35">game</Button>
						</div>
					</CardBody>
				</div>
				<CardFooter mt="20">
					<div className="user-edit-button">
						<Button  colorScheme='blue' width="40">Edit</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

export default UserProfile;
