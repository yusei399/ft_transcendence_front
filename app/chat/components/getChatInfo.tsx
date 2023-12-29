import { useGetChatInfoQuery } from '@/lib/redux/api';

const useGetChatInfo = ({chatId}: {chatId: number}) => {
	const queryResult = useGetChatInfoQuery([chatId]);
	console.log(queryResult);

	return queryResult;
};

export default useGetChatInfo;