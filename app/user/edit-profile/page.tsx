"use client";
import React, { useState } from 'react';
import { useEditMeMutation, useGetMeQuery } from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import { HttpEditMe } from '@/shared/HttpEndpoints/user';
import {
  Box, VStack, FormControl, FormLabel, Input, Button, FormErrorMessage
} from '@chakra-ui/react';

const EditProfile = () => {
  const { data, isLoading: queryLoading, error } = useGetMeQuery([]);
  const [editMe, { isLoading, isError }] = useEditMeMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpEditMe.reqTemplate>({
    email: undefined,
    nickname: undefined,
    avatar: undefined,
    password: undefined,
  });

  if (queryLoading || isLoading) return <Loading />;
  if (error) console.log(error);
  if (!data) return <Box>No data</Box>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editMe([updateInfo]).unwrap();
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} p={5}>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="nickname">Nickname</FormLabel>
        <Input
          id="nickname"
          type="text"
          value={updateInfo.nickname || ''}
          onChange={(e) => setUpdateInfo({ ...updateInfo, nickname: e.target.value })}
          placeholder="Nickname"
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={updateInfo.email || ''}
          onChange={(e) => setUpdateInfo({ ...updateInfo, email: e.target.value })}
          placeholder="Email"
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          id="avatar"
          type="file"
          onChange={(e) => setUpdateInfo({ ...updateInfo, avatar: e.target.files?.[0] })}
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={updateInfo.password || ''}
          onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })}
          placeholder="Password"
        />
        {isError && <FormErrorMessage>Error updating the profile.</FormErrorMessage>}
      </FormControl>
      <Button type="submit" isLoading={isLoading} colorScheme="blue">
        Update Profile
      </Button>
    </VStack>
  );
};

export default EditProfile;
