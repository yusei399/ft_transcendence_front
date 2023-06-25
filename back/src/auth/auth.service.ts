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
	  private readonly prisma: PrismaService,
	  private readonly jwt: JwtService,
	  private readonly config: ConfigService,
	) {}
	async signUp(dto: AuthDto): Promise<Msg> {
	  const hashed = await bcrypt.hash(dto.password, 12);
	  try {
		await this.prisma.user.create({
		  data: {
			email: dto.email,
			hashedPassword: hashed,
		  },
		});
		return {
		  msg: 'sign up ok',
		};
	  } catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
		  if (error.code === 'P2002') {
			throw new ForbiddenException('This email is already taken');
		  }
		}
		throw error;
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
		const isPasswordValid = await bcrypt.compare(authDto.password, user.hashedPassword);
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
			expiresIn: "5m",
			secret: secret,
		});
		return {
			accessToken: token,
		};
	}
}



