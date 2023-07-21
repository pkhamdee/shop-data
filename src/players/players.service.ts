import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {

  constructor(
    @InjectRepository(Player) private playersRepository: Repository<Player>,
  ) {}

  create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.save(newPlayer);
  }

  findAll() {
    return this.playersRepository.find();
  }

  findOne(id: number) {
    return this.playersRepository.findOneBy({id});
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playersRepository.preload({
      id: id,
      ...updatePlayerDto,
    });
    if(!player){
      throw new NotFoundException('Player ${id} not found');
    }
    return this.playersRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);
    return await this.playersRepository.remove(player);
  }
}
