'use client';
import {useGetMeQuery} from '@/lib/redux/api';
import {Box, Text, VStack, useColorModeValue, Button, HStack, Avatar} from '@chakra-ui/react';
import Loading from '@/app/components/global/Loading';
import Link from 'next/link';

const Me = () => {
  const {data, isLoading, error} = useGetMeQuery([]);
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (isLoading) return <Loading />;
  if (!data) return <Box>No data</Box>;
  if (error) return <Box>An error occurred</Box>;

  return (
    <VStack p={5} spacing={4} boxShadow="md" borderRadius="lg" bg={bgColor} alignSelf="center">
      <HStack justifyContent="center" alignContent="space-around" width="100%">
        <Avatar borderRadius="full" size="lg" src={data.avatarUrl ?? '/assets/sample.png'} />
        <Text fontSize="xl" fontWeight="bold">
          {data.nickname}
        </Text>
      </HStack>
      <Text>{data.email}</Text>
      <Link href="/user/edit-profile" scroll={false}>
        <Button colorScheme="teal" size="sm">
          Edit Profile
        </Button>
      </Link>
    </VStack>
  );
};

export default Me;
