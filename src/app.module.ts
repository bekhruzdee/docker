import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '2512',
        database: 'products',
        entities: [Product],
        autoLoadEntities: true,
        synchronize: true
  }),
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
