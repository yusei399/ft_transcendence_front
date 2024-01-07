// import Image from 'next/image';
'use client';

import React, {useState} from 'react';
import {HttpSendInvitation} from '@/shared/HttpEndpoints/invitation';
import {
  Button,
  Card,
  CardHeader,
  Wrap,
  WrapItem,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react';
import {Avatar} from '@chakra-ui/react';
import {useSendInvitationMutation} from '@/lib/redux/api';

const UserProfile: React.FC = () => {
  const [reqData, setReqData] = useState<HttpSendInvitation.reqTemplate>({
    targetUserId: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setReqData(prev => ({...prev, [name]: value}));
  };

  const [sendInvitation] = useSendInvitationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendInvitation(['friend', reqData]).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card align="center" mt="10%" mr="40%" ml="40%">
        <CardHeader mb="20">
          <Wrap>
            <div className="personal" style={{display: 'flex'}}>
              <div className="user-image">
                <WrapItem mr="10">
                  <Avatar name="test" src="./assets/sample.png" />
                </WrapItem>
              </div>
              <div className="person-detail" style={{display: 'flex', flexFlow: 'column'}}>
                <div className="user-name">
                  <Text>test name</Text>
                </div>
                <div className="user-email">
                  <Text>test email</Text>
                </div>
              </div>
            </div>
          </Wrap>
        </CardHeader>
        <div className="user-function">
          <CardBody>
            <div style={{display: 'flex'}}>
              <Button colorScheme="blue" mr="10" width="35">
                chat
              </Button>
              <Button colorScheme="blue" ml="10" width="35">
                game
              </Button>
            </div>
          </CardBody>
        </div>
        <CardFooter mt="20">
          <div className="friend-button">
            <Button colorScheme="blue" width="40" onClick={handleSubmit}>
              Friend
            </Button>
          </div>
          <div className="user-edit-button">
            <Button colorScheme="blue" width="40">
              Edit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
