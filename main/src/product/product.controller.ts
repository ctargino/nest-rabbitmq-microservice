import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import axios from 'axios';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) { }

  @Get()
  async all(): Promise<any> {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number): Promise<void> {
    const product = await this.productService.findById(id);
    await axios.post(`http://localhost:8000/api/products/${id}/like`, {}).then(() => {
      console.log('Product liked');
    });
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async create(product: any) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });

    console.log('Product created', product);
  }

  @EventPattern('product_updated')
  async update(product: any) {
    const productUpdatated = await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });

    console.log('Product updated', productUpdatated);
  }

  @EventPattern('product_deleted')
  async delete(id: number): Promise<void> {
    await this.productService.delete(id);
    console.log('Product deleted');
  }
}
