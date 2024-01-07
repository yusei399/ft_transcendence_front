'use client';
import React, {useState} from 'react';
import {useEditMeMutation, useGetMeQuery} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {HttpEditMe} from '@/shared/HttpEndpoints/user';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import {useAppDispatch} from '@/lib/redux/hook';
import {setNotification} from '@/lib/redux';
import {filterDefinedProperties} from '@/shared/sharedUtilities/utils.functions.';
import Link from 'next/link';

const EditProfile = () => {
  const {data, isLoading: queryLoading, error} = useGetMeQuery([]);
  const [editMe, {isLoading, isError}] = useEditMeMutation();
  const dispatch = useAppDispatch();
  const [updateInfo, setUpdateInfo] = useState<HttpEditMe.reqTemplate>({
    email: undefined,
    nickname: undefined,
    avatar: undefined,
    password: undefined,
  });

  if (queryLoading || isLoading) return <Loading />;
  if (error) console.log(error);
  if (!data) return <Box>No data</Box>;

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    const toUpdate = filterDefinedProperties(updateInfo);
    if (Object.keys(toUpdate).length === 0) {
      dispatch(
        setNotification({status: 'error', title: 'Error', description: 'No data to update'}),
      );
      return;
    }
    try {
      const response = await editMe([toUpdate]).unwrap();
      dispatch(
        setNotification({
          status: 'success',
          title: 'Profile updated!',
          description: 'Profile updated successfully',
        }),
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setUpdateInfo({
      email: undefined,
      nickname: undefined,
      avatar: undefined,
      password: undefined,
    });
  };

  return (
    <VStack as="form" action="submit" onSubmit={e => handleSubmit(e)} spacing={4} p={5}>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="nickname">Nickname</FormLabel>
        <Input
          id="nickname"
          type="text"
          value={updateInfo.nickname || ''}
          onChange={e => setUpdateInfo({...updateInfo, nickname: e.target.value})}
          placeholder={data.nickname}
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={updateInfo.email || ''}
          onChange={e => setUpdateInfo({...updateInfo, email: e.target.value})}
          placeholder={data.email}
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          id="avatar"
          type="file"
          max={1}
          onChange={e => setUpdateInfo({...updateInfo, avatar: e.target.files?.[0]})}
        />
      </FormControl>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={updateInfo.password || ''}
          onChange={e => setUpdateInfo({...updateInfo, password: e.target.value})}
          placeholder="your secret password"
        />
        {isError && <FormErrorMessage>Error updating the profile.</FormErrorMessage>}
      </FormControl>
      <Button type="submit" isLoading={isLoading} colorScheme="blue">
        Update Profile
      </Button>
      <Link href="/" scroll={false}>
        <Button type="button">Back to home</Button>
      </Link>
    </VStack>
  );
};

export default EditProfile;
