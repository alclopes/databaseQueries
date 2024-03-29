import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder #consultaBdQueryBuilder#
    //return this.repository.createQueryBuilder()
    return await this.repository
      .createQueryBuilder("games")
      .where("games.title ilike :title", {title: `%${param}%`})
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query #consultaBdRawQuery#
    //return this.repository.query();
    return await this.repository.query(`
      SELECT count(id)
      FROM games
    `);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder #consultaBdQueryBuilder#
    //return this.repository.createQueryBuilder()
    return await this.repository
      .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany();
  }
}
