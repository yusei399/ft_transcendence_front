import {UserPublicProfile} from '@/shared/HttpEndpoints/interfaces';
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Avatar, Card, CardBody, Flex, Heading, Text} from '@chakra-ui/react';
import React from 'react';

type InGamePlayerProfileProps = {
  profile: UserPublicProfile;
  score: number;
  side: 'left' | 'right';
  isMe: boolean;
  withChevron: boolean;
};

function InGamePlayerProfile({profile, score, side, isMe, withChevron}: InGamePlayerProfileProps) {
  const {nickname, avatarUrl} = profile;
  return (
    <Card padding="4px" alignItems={'center'} rowGap="3px" bgColor={isMe ? 'blue.100' : 'red.100'}>
      <CardBody padding="4px">
        <Flex flexDir={side === 'left' ? 'row' : 'row-reverse'} alignItems="center" gap="12px">
          <Avatar boxSize="60px" src={avatarUrl ?? '/assets/sample.png'} />
          <Heading size="md" maxWidth={'80px'} color={isMe ? 'blue.500' : 'red.500'}>
            {nickname}
          </Heading>
        </Flex>
        <Flex flexDir={side === 'left' ? 'row' : 'row-reverse'} justifyContent="space-around">
          {withChevron && <ChevronDownIcon color={isMe ? 'blue.500' : 'red.500'} boxSize="40px" />}
          <Text
            fontSize="2xl"
            color={isMe ? 'blue.500' : 'red.500'}
            fontWeight="bold"
            textAlign="center">
            {score}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default InGamePlayerProfile;
