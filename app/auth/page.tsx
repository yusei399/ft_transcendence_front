'use client';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {authErrorSelector, clearAuthError, setNotification} from '@/lib/redux';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import React from 'react';

export default function IndexPage() {
  const authError = useAppSelector(authErrorSelector);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useAppDispatch();
  const closeModal = () => {
    onClose();
    dispatch(clearAuthError());
  };

  useEffect(() => {
    if (authError) onOpen();
  }, [authError]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered size="sm">
        <ModalOverlay />
        <ModalContent p="5">
          <ModalHeader>{authError}</ModalHeader>
          <Button colorScheme="blue" onClick={closeModal}>
            Got It
          </Button>
        </ModalContent>
      </Modal>
      <VStack spacing="48px">
        <Heading as="h1">Auth</Heading>
        <HStack spacing="24px">
          <SignIn />
          <Divider orientation="vertical" height={200} />
          <SignUp />
        </HStack>
      </VStack>
    </>
  );
}
