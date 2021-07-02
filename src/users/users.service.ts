import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel:Model<User>,private jwtService: JwtService){}

    //#region register
    async register(email:string,username:string,password:string){

    const hashedPassword=await bcrypt.hash(password,10);

    const user= new this.userModel({
        email,
        username,
        password:hashedPassword
    })

     const result= await user.save().then(user=>user).catch(error=>{
         throw new ConflictException('Already exists')
     });

     return {id:result.id,email:result.email,username:result.username};
  }
  //#endregion

  //#region validate user
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
  //#endregion

  //#region sign in

  async signIn(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
        id:user.id,
        email:user.email,
        username:user.username,
      accessToken: this.jwtService.sign(payload),
    };
  }
  //#endregion

}
