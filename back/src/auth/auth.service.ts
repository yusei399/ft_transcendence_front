import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { AuthDto } from "./dto/auth.dto";
import { Msg, Jwt} from "./interfaces/auth.interface";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class AuthService {
	constructor(
		private readonly jwt: JwtService,
		private readonly config: ConfigService,
		private readonly prisma: PrismaService
	) {}
	async signUp(authDto: AuthDto) {
		const hashedPassword = await bcrypt.hash(authDto.password, 12);
		try {
			const user = await this.prisma.user.create({
				data: {
					name: authDto.name,
					email: authDto.email,
					password: hashedPassword
				}
			});
			return { msg: "success" };
		}catch(e) {
			if(e instanceof PrismaClientKnownRequestError) {
				if(e.code === "P2002") {
					throw new ForbiddenException("Email already exists");
				}
			}
			throw e;
		}
	}

	async login(authDto: AuthDto){
		const user = await this.prisma.user.findUnique({
			where: {
			  email:authDto.email ,
			},
		  });
		if(!user) {
			throw new ForbiddenException("Invalid credentials");
		}
		const isPasswordValid = await bcrypt.compare(authDto.password, user.password);
		if(!isPasswordValid) {
			throw new ForbiddenException("Invalid credentials");
		}
		return this.generateJwtToken(user.id, user.email);
	}

	async generateJwtToken(userId: number, email: string){
		const payload = { sub: userId,
							email,
						};
		const secret = this.config.get("JWT_SECRET");
		const token = await this.jwt.signAsync(payload, { 
			expiresIn: "5m"
		});
	}
}



