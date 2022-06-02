import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) { }

  @Get()
  async all(): Promise<Product[]> {
    return this.productService.all();
  }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('image') image: string,
  ): Promise<Product> {
    const product = await this.productService.create({
      title,
      image,
    });

    this.client.emit('product_created', product);

    return product
  }

  @Get(':id')
  async get(
    @Param('id') id: number,
  ): Promise<Product> {
    return this.productService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
    @Body('likes') likes: number,
  ): Promise<any> {
    await this.productService.update(id, {
      title,
      image,
      likes,
    });

    const product = await this.productService.getById(id);

    this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
  ): Promise<any> {
    await this.productService.delete(id);

    this.client.emit('product_deleted', id);

    return {
      message: 'Product deleted',
    };
  }

  @Post(':id/like')
  async like(@Param('id') id: number): Promise<void> {
    const product = await this.productService.getById(id);

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }
}
