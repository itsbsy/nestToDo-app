import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto, Token } from './auth.dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor( private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService) {}
    async signup(dto: AuthDto){
        //generate the pasword
        const hash = await argon.hash(dto.password);
       
        //save the new user in db
       const user = await this.prisma.user.create({
        data: { 
            email: dto.email,
            password: hash,
            fullName : dto.fullName
         },
         select:{
            email: true,
            fullName: true,
            id: true
         }
       })
         return user;
    }

    async signin(dto: LoginDto):  Promise<{accessToken : string}>{
        //Find user by provided credential
        const found =  await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        //if(!user) throw exception error
        if(!found) throw new ForbiddenException("Email not Found")

        //Match user password 
        const passMatch = await argon.verify(found.password, dto.password);

        //if(!match) throw exception
        if(!passMatch) throw new ForbiddenException("Incorrect Password");
        // delete found.password;
        
        return this.signToken(found.id, found.email);
    }

    async signToken(userId: string, email: string) : Promise<Token> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: secret  ,
        });
        return {accessToken: token}
    }
}
 