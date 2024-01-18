'use client';

import {HttpAuth42} from '@/shared/HttpEndpoints/auth';
import {Button} from '@chakra-ui/react';
import Link from 'next/link';

export default function OAuth42(): JSX.Element {
  return (
    <Link href={`http://localhost:3333${HttpAuth42.endPointFull}`} scroll={false}>
      <Button>Connect with your 42 account</Button>
    </Link>
  );
}
