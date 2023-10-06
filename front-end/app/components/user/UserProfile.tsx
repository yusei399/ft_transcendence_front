import Image from 'next/image';

const UserProfile = () => {
	return (
		<div>
			<div className='personal'>
				<h1>name</h1>
				<h1>email</h1>
				<Image src="../../../assets/sample.png" alt="User Profile" width={500} height={500} />
				<button>Edit</button>
			</div>
			<div className='user-function'>
				<div>
					<button>chat</button>
				</div>
				<div>
					<button>game</button>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;