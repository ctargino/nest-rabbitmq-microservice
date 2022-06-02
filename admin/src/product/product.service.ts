import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }

  async all(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, data): Promise<any> {
    return this.productRepository.update(id, {
      image: data.image,
      title: data.title,
      likes: data.likes,
    });
  }

  async delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}