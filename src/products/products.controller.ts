import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      message: 'Products retrieved successfully',
      products,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return {
      message: `Product with ID ${id} retrieved successfully`,
      product,
    };
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productService.create(createProductDto);
    return {
      message: result.message,
      product: result.product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productService.update(id, updateProductDto);
    return {
      message: result.message,
      product: result.product,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.productService.remove(id);
    return { message: result.message };
  }
}
