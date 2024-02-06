'use client';
import React, {useState} from 'react';
import {ErrorType, useEditMeMutation, useGetMeQuery} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import {HttpEditMe} from '@/shared/HttpEndpoints/user';
import {Box, VStack, FormControl, FormLabel, Input, Button, Switch, Flex} from '@chakra-ui/react';
import {useAppDispatch, setNotification} from '@/lib/redux';
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
    hasSet2Fa: undefined,
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
      hasSet2Fa: undefined,
    });
  };

  const has2FA = updateInfo.hasSet2Fa ?? data.hasSet2Fa;

  return (
    <VStack as="form" action="submit" onSubmit={e => handleSubmit(e)} spacing={4} p={5}>
      <FormControl isInvalid={(editError as ErrorType)?.status === 409}>
        <FormLabel htmlFor="nickname">
          {' '}
          Nickname: {updateInfo.nickname && updateInfo.nickname.length < 3 && ' 3 characters min'}
          {updateInfo.nickname && updateInfo.nickname.length > 20 && ' 20 characters max'}
        </FormLabel>
        <Input
          id="nickname"
          type="text"
          minLength={3}
          maxLength={20}
          value={updateInfo.nickname || ''}
          onChange={e => setUpdateInfo({...updateInfo, nickname: e.target.value})}
          placeholder={data.nickname}
        />
      </FormControl>
      <Flex dir="row" width="100%" gap="12px">
        <FormControl flex={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={updateInfo.email || ''}
            onChange={e => setUpdateInfo({...updateInfo, email: e.target.value})}
            placeholder={data.email}
          />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="flex-end"
          marginBottom="12px"
          flex={1}
          width="120px">
          <Switch
            colorScheme={has2FA ? 'green' : 'blue'}
            isChecked={has2FA}
            onChange={e => setUpdateInfo({...updateInfo, hasSet2Fa: e.target.checked})}
          />
          <FormLabel mb="0" textColor={has2FA ? 'green.400' : 'blue.400'} paddingLeft="5px">
            {has2FA ? 'Enabled' : 'Disabled'}
          </FormLabel>
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          id="avatar"
          type="file"
          max={1}
          accept="image/*"
          onChange={e => setUpdateInfo({...updateInfo, avatar: setImage(e, dispatch)})}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">
          Password:{updateInfo.password && updateInfo.password.length < 3 && ' 3 characters min'}
        </FormLabel>
        <Input
          id="password"
          type="password"
          minLength={3}
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
