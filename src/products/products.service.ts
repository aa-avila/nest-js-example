import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Invalid ID!');
    }
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const response = await newProduct.save();
    return response.id as string;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getProductById(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ) {
    const prodToUpdate = await this.findProduct(prodId);

    if (prodTitle) {
      prodToUpdate.title = prodTitle;
    }
    if (prodDesc) {
      prodToUpdate.description = prodDesc;
    }
    if (prodPrice) {
      prodToUpdate.price = prodPrice;
    }

    const updatedProduct = await prodToUpdate.save();
    return {
      id: updatedProduct.id,
      title: updatedProduct.title,
      description: updatedProduct.description,
      price: updatedProduct.price,
    };
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Product not found!');
    }
    return { msg: 'OK! deleted' };
  }
}
