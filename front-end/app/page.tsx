import SignupPage from './components/auth/SignupPage';
import LoginPage  from './components/auth/SignupPage'
import UserEditProfile from './components/user/UserEditProfile';
import UserProfile from './components/user/UserProfile';
import { ChakraProvider } from "@chakra-ui/react";

export default function main() {

  const User = [{
    name: "test",
    email: "test.eamil.com",
  },
  {
    name: "test2",
    email: "test2.eamil.com",
  }]
  return (
    <>
      <ChakraProvider>
        {/*<LoginPage />*/}
        <SignupPage />
        <UserEditProfile/>
        <UserProfile />
      </ChakraProvider>
    </>
  );
}
