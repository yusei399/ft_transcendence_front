'use client';

import {useAllUsersQuery} from '@/lib/redux/api';
import {UserPublicProfile} from '@/shared/HttpEndpoints/interfaces';

function UserList({authToken}: {authToken: string}) {
  const {data, currentData, isLoading, isError} = useAllUsersQuery([authToken]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;
  return (
    <section>
      {currentData &&
        currentData.users.map((user: UserPublicProfile) => (
          <div key={user.userId}>
            <p>{user.userId}</p>
            <p>{user.nickname}</p>
            <p>{user.avatarUrl}</p>
          </div>
        ))}
    </section>
  );
}

export default UserList;
