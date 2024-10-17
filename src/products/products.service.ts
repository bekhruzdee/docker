import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return {
      message: 'Product successfully created',
      product,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const product = await this.findOne(id);
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.findOne(id);
    return {
      message: `Product with ID ${id} successfully updated`,
      product: updatedProduct,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return { message: `Product with ID ${id} successfully deleted` };
  }
}
