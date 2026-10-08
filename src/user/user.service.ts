import { Injectable } from '@nestjs/common';
import { User, userDocument } from './schema/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/create-user.dto.js';
import { updateUserDto } from './dto/update-user.dto.js';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<userDocument>,
  ) {}

  async create(data: createUserDto) {
    const user = new this.userModel({...data });
    await user.save();
    return user;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({email : email});
    return user;
  }

  async update(id:string ,data: updateUserDto){
    return await this.userModel.findByIdAndUpdate(id,data)
  }

  async remove(id : string){
    return this.userModel.findByIdAndDelete(id)
  }
}
