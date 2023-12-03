"use client";

import { UserPublicProfile } from "@/app/shared/HttpEndpoints/interfaces";
import { HttpSendInvitation } from "@/app/shared/HttpEndpoints/invitation";
import { HttpAllUsers } from "@/app/shared/HttpEndpoints/user";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UserList = () => {
    useEffect(() => {
              const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoia29oZWkiLCJpYXQiOjE3MDA1NTQwMzEsImV4cCI6MTcwMDU1NzYzMX0.9kF1YxD0ZeYih3PNfP4qjpA8JABXrxIqhMR1IpaJOoE';
        fetchUsers(authToken).then(data => {
              setUsers(data);
              });
          }, []);
      const [reqData, setReqData] = useState<HttpSendInvitation.reqTemplate>({
          targetUserId: 2,
      });

    async function fetchUsers(authToken: string) {
        const requestSender = new HttpAllUsers.requestSender(authToken);
        //console.log(requestSender);
        const response = await requestSender.sendRequest();
        //console.log('fetchUsers');
        //console.log(response);
        //console.log(response.users);
        return response.users;
    }
    
    const [users, setUsers] = useState<UserPublicProfile[]>([]);

    const [response, setResponse] = useState<HttpSendInvitation.resTemplate | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReqData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await new HttpSendInvitation.requestSender('friend', reqData, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoia29oZWkiLCJpYXQiOjE3MDA1NTQwMzEsImV4cCI6MTcwMDU1NzYzMX0.9kF1YxD0ZeYih3PNfP4qjpA8JABXrxIqhMR1IpaJOoE').sendRequest();
            setResponse(res);
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
            {users!.map((user: any) => (
                <div key={user.id}>
                    {user.name}
                    <div className="friend-button">
						<Button colorScheme='blue' width="40" onClick={handleSubmit}>Friend</Button>
					</div>
                </div>
            ))}
        </div>
    );
};

export default UserList;