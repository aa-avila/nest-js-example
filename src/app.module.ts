import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    MongooseModule.forRoot(process.env.DB_CONNECT_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
