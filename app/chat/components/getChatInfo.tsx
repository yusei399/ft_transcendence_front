import Loading from '@/app/components/global/Loading';
import { useGetChatInfoQuery } from '@/lib/redux/api';

const GetChatInfo = ({ chatId }: { chatId: number }) => {
	const { data, isLoading, error } = useGetChatInfoQuery([chatId]);
  
	if (isLoading) return <Loading />;
	if (!data) return <div>No data available</div>;
	if (error) return <div>Error loading chat information</div>;
  
	return (
	  <div>
		<h2>Chat Information:</h2>
		<p>Chat ID: {data?.chatId}</p>
		<p>Name: {data?.name}</p>
		<p>Has Password: {data?.hasPassword}</p>
		<div>
		  Participants:
		  <ul>
			{data?.participants?.map((participant, index) => (
			  <li key={index}>{participant.userProfile.nickname}</li>
			))}
		  </ul>
		</div>
	  </div>
	);
  };
  
  export default GetChatInfo;
  
