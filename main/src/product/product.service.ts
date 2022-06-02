import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) { }

  async all(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async create(product: Product): Promise<Product> {
    return new this.productModel(product).save();
  }

  async findById(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: number): Promise<any> {
    return this.productModel.findOneAndRemove({ id });
  }
}
