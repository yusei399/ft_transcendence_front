'use client';
import {useGetMeQuery} from '@/lib/redux/api';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  Button,
  HStack,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import Loading from '@/app/components/global/Loading';
import Link from 'next/link';
import {format} from 'date-fns';

const Me = () => {
  const {data, isLoading, error} = useGetMeQuery([]);
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (isLoading) return <Loading />;
  if (error) return <Box>An error occurred</Box>;
  if (!data) return <Box>No data</Box>;

  const achievements = data.achievements;

  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), 'PPPpp');
  };

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
      <VStack spacing={2} align="stretch">
        <Text fontSize="md" fontWeight="semibold">
          Achievements
        </Text>
        {achievements && achievements.length > 0 ? (
          achievements.map(achievement => (
            <HStack key={achievement.achievementId}>
              <Badge colorScheme="green">{achievement.name}</Badge>
              <Text fontSize="sm">{formatDate(achievement.obtainedAt)}</Text>
            </HStack>
          ))
        ) : (
          <Text>No achievements yet</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Me;
