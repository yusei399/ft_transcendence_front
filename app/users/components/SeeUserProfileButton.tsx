import {Search2Icon} from '@chakra-ui/icons';
import {Button} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

function SeeUserProfileButton({userId}: {userId: number}): JSX.Element {
  const router = useRouter();
  return (
    <Button
      colorScheme="linkedin"
      onClick={() => router.push(`/users/${userId}`, {scroll: false})}
      leftIcon={<Search2Icon fontSize="2xl" />}>
      See profile
    </Button>
  );
}

export default SeeUserProfileButton;
