import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MerchantService {

  constructor(
    @InjectRepository(Merchant) private merchantRepository: Repository<Merchant>,
  ) {}

  async create(createMerchantDto: CreateMerchantDto) {
    const newMerchant = await this.merchantRepository.create(createMerchantDto);
    return  await this.merchantRepository.save(newMerchant);
  }

  findAll() {
    return this.merchantRepository.find();
  }

  findOne(id: number) {
    return this.merchantRepository.findOneBy({id});
  }

  async update(id: number, updateMerchantDto: UpdateMerchantDto) {
    const merchant = await this.merchantRepository.preload({
      id: id,
      ...updateMerchantDto,
    });
    if(!merchant){
      throw new NotFoundException('Merchant ${id} not found');
    }
    return this.merchantRepository.save(merchant);
  }

  async remove(id: number) {
    const merchant = await this.findOne(id);
    return await this.merchantRepository.remove(merchant);
  }
}
