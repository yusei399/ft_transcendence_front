import {UserPublicProfile} from '@/shared/HttpEndpoints/interfaces';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {Avatar, Card, CardBody, Flex, Heading, Text, VStack} from '@chakra-ui/react';

type InGamePlayerProfileProps = {
  profile: UserPublicProfile;
  score: number;
  side: 'left' | 'right';
  isMe: boolean;
  isWinner?: boolean;
  withChevron?: boolean;
};

function InGamePlayerProfile({
  profile,
  score,
  side,
  isMe,
  withChevron = false,
  isWinner = false,
}: InGamePlayerProfileProps) {
  const {nickname, avatarUrl} = profile;
  return (
    <Card
      padding="4px"
      alignSelf="center"
      rowGap="3px"
      bgColor={isMe ? 'blue.100' : 'red.100'}
      height="fit-content">
      <CardBody padding="4px">
        <Flex flexFlow={side === 'left' ? 'row' : 'row-reverse'} alignItems="center" gap="8px">
          <Flex
            flexDir="column"
            alignItems="center"
            gap="2px"
            padding={isWinner ? '0 0 0 0px' : '12.5 0 0 0px'}>
            {isWinner && (
              <img src={'/assets/winner.png'} alt="winner" width="25px" style={{display: 'flex'}} />
            )}
            <Avatar alignItems="center" boxSize="50px" src={avatarUrl ?? '/assets/sample.png'} />
          </Flex>
          <VStack>
            <Heading size="md" color={isMe ? 'blue.500' : 'red.500'} wordBreak="break-all">
              {nickname}
            </Heading>
            <Flex flexDir={side === 'left' ? 'row' : 'row-reverse'} justifyContent="space-around">
              {withChevron && (
                <ChevronDownIcon color={isMe ? 'blue.500' : 'red.500'} boxSize="40px" />
              )}
              <Text
                fontSize="xl"
                color={isMe ? 'blue.500' : 'red.500'}
                fontWeight="bold"
                textAlign="center">
                {score}
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default InGamePlayerProfile;
