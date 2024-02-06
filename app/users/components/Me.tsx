'use client';
import {useGetMeQuery} from '@/lib/redux/api';
import {Box, Text, VStack, useColorModeValue, Button, HStack, Avatar} from '@chakra-ui/react';
import Loading from '@/app/components/global/Loading';
import Link from 'next/link';

const Me = () => {
  const {data, isLoading, error} = useGetMeQuery([]);
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (isLoading) return <Loading />;
  if (error) return <Box>An error occurred</Box>;
  if (!data) return <Box>No data</Box>;

  const achievements = data.achievements;
  console.log(achievements);
  /*
    cf: shared/HttpEndpoints/interfaces/UserProfileInfo.interface.ts
    export interface Achievement {
      achievementId: number;
      name: AchievementName;
      obtainedAt: Date;
    }

    export type AchievementName =
      | 'firstGame'
      | 'firstWin'
      | 'longGame' // end a 20 points game
      | 'shortGame' // end a 1 points game
      | 'largePaddleSmallBall' // play with a large paddle and a small ball
      | 'smallPaddleLargeBall' // play with a small paddle and a large ball
      | 'speedUp' // play with a fast ball and a fast paddle
      | 'speedDown' // play with a slow ball and a slow paddle
      | 'impossibleSpeed' // play with a fast ball and a slow paddle
      | 'impossible' // play with small paddle, small ball, fast ball and slow paddle
      | 'quick'; // win a game in less than 30 secondes
  */

  return (
    <VStack p={5} spacing={4} boxShadow="md" borderRadius="lg" bg={bgColor} alignSelf="center">
      <HStack justifyContent="center" alignContent="space-around" width="100%">
        <Avatar borderRadius="full" size="lg" src={data.avatarUrl ?? '/assets/sample.png'} />
        <Text fontSize="xl" fontWeight="bold">
          {data.nickname}
        </Text>
      </HStack>
      <Text>{data.email}</Text>
      <Link href="/users/edit-profile" scroll={false}>
        <Button colorScheme="teal" size="sm">
          Edit Profile
        </Button>
      </Link>
    </VStack>
  );
};

export default Me;
