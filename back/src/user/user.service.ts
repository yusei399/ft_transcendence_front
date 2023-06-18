import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async findOne(username: string): Promise<User | undefined> {
		return await this.userRepository.findOne({ where :{username} });
	}

	async create(username: string, password: string): Promise<User> {
		const user = new User();
		user.username = username;
		user.password = password;
		return await this.userRepository.save(user);
	}
}

