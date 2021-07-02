import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export type authResponse = {
  id: string;
  userName: string;
  status: boolean;
};

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  login(id: string): authResponse {
    if (id === '1234') {
      return { id: '1234', userName: 'john', status: true };
    } else {
      return { id: '', userName: '', status: false };
    }
  }
  register(email: string, username: string, password: string) {
    const user = this.usersService.register(email, username, password);
    return user;
  }
}
