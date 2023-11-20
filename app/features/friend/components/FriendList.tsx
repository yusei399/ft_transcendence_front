


const FriendList = (prop: any) => {
	return (
		<>
			<div>
				<h1>Friend List</h1>
				<div>
					{prop.friendList.map((friend : any) => (
						<div key={friend.id}>
							<h1>{friend.name}</h1>
							<button >chat</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default FriendList;