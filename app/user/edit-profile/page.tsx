'use client';
import React, {useState} from 'react';
import {ErrorType, useEditMeMutation, useGetMeQuery} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {HttpEditMe} from '@/shared/HttpEndpoints/user';
import {Box, VStack, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import {useAppDispatch} from '@/lib/redux/hook';
import {setNotification} from '@/lib/redux';
import {filterDefinedProperties} from '@/shared/sharedUtilities/utils.functions.';
import Link from 'next/link';
import {setImage} from '@/app/utils/setImage';

const EditProfile = () => {
  const {data, isLoading: queryLoading, error} = useGetMeQuery([]);
  const [editMe, {isLoading, error: editError}] = useEditMeMutation();
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
      await editMe([toUpdate]).unwrap();
      dispatch(
        setNotification({
          status: 'success',
          title: 'Profile updated!',
          description: 'Profile updated successfully',
        }),
      );
    } catch (error: any) {
      if (error?.status === 409) {
        dispatch(
          setNotification({
            status: 'error',
            title: 'Profile update error',
            description: 'Nickname already taken',
          }),
        );
      }
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
      <FormControl isInvalid={(editError as ErrorType)?.status === 409}>
        <FormLabel htmlFor="nickname">Nickname</FormLabel>
        <Input
          id="nickname"
          type="text"
          value={updateInfo.nickname || ''}
          onChange={e => setUpdateInfo({...updateInfo, nickname: e.target.value})}
          placeholder={data.nickname}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={updateInfo.email || ''}
          onChange={e => setUpdateInfo({...updateInfo, email: e.target.value})}
          placeholder={data.email}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          id="avatar"
          type="file"
          max={1}
          onChange={e => setUpdateInfo({...updateInfo, avatar: setImage(e, dispatch)})}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={updateInfo.password || ''}
          onChange={e => setUpdateInfo({...updateInfo, password: e.target.value})}
          placeholder="your secret password"
        />
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
