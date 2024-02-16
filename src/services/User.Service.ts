import User from '../domains/User';
import UserModel from '../models/User.Model';
import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import * as bcrypt from 'bcryptjs';
import { createToken } from '../auth/jwtFunctions';

export default class UserService {
  public model = new UserModel();
  public createUserDomain(user: IUser | null): User | null {
    if (user) {
      return new User(user);
    }
    return null;
  }

  public async getById(id: string) {
    const user = await this.model.findById(id);
    return user;
  }

  public async getByEmail(email: string) {
    const user = await this.model.findOne({ email });
    return user;
  }

  public async getUsers() {
    const allUsers = await this.model.findAll();
    if (!allUsers) return { type: 404, payload: { token: null } };

    const listUsers = allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
    return { type: null, payload: listUsers };
  }
  

  public async create(user: IUser) {
    const { name, email, password, role } = user;

    const salt = bcrypt.genSaltSync(10);
    const validPwd = bcrypt.hashSync(password, salt);
    const newUser = await this.model.create({ name, email, password: validPwd, role });

    newUser.password = '';

    const token = createToken(newUser);
    return { type: null, payload: { token } };
  }

  public async login(user: ILogin) {
    const { email, password } = user;

    const existingUser = await this.model.findOne({email: email});
    if (!existingUser) return { type: 409, payload: { token: null } };

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      existingUser.password = '';
      const token = createToken(existingUser);
      return { type: null, payload: { token } };
    } else {
      return { type: 404, payload: { token: null } };
    }
  }

  public async update(id: string, obj: IUser) {
    const { password } = obj;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const validPwd = bcrypt.hashSync(password, salt);
      obj.password = validPwd;
    }
    return await this.model.update(id, obj)
  }

  public async deleteUser(id: string) {
    return await this.model.delete(id)
  }
}
