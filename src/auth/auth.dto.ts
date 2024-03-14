import { IsEmail, IsNotEmpty } from "class-validator";

 export class AuthDto {

   @IsEmail()
   @IsNotEmpty() 
   email : string;

   @IsNotEmpty() 
   password: string;
  
   fullName: string;
 }  
 
 export class LoginDto {

  @IsEmail()
  @IsNotEmpty() 
  email : string;

  @IsNotEmpty() 
  password: string;
 
}  

export class Token {
  accessToken : string
}