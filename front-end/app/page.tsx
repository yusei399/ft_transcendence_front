import SigninPage from './components/auth/SigninPage';
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
        <div>SignUp</div>
        <SignupPage />
        <div>SignIn</div>
        <SigninPage />
        <UserEditProfile/>
        <UserProfile />
      </ChakraProvider>
    </>
  );
}
