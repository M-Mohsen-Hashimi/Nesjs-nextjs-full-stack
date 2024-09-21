import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async createUser(data: CreateUserRequest) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10)
        },
        select: {
          email: true,
          id: true
        }
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      console.log(err);
      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findFirstOrThrow({
      where: filter
    })
  }
}
