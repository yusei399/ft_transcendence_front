import LoginPage  from '@/app/features/auth/components/LoginPage';
import { ChakraProvider } from "@chakra-ui/react";
import UserProfile from './features/user/components/UserProfile';

export default function main() {

  // const User = [{
  //   name: "test",
  //   email: "test.eamil.com",
  // },
  // {
  //   name: "test2",
  //   email: "test2.eamil.com",
  // }]
  return (
    <>
      <ChakraProvider>
        <LoginPage />
        {/* <UserProfile /> */}
      </ChakraProvider>
    </>
  );
}
