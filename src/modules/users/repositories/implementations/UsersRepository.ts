import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM #consultaBdORM#
    const user = await this.repository.findOne(
      user_id,
      { relations: ["games"] }
    );
    if (!user) {
      throw new Error("User does not exist!");
    }
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query #consultaBdRawQuery#
    // return this.repository.query();
    return await this.repository.query(`
      SELECT *
      FROM users
      ORDER BY first_name ASC
    `);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query #consultaBdRawQuery#
    // return this.repository.query();
    return await this.repository.query(`
      SELECT *
      FROM users
      WHERE LOWER(first_name) = LOWER('${first_name}')
      AND LOWER(last_name) = LOWER('${last_name}')
  `); 
  }
}
