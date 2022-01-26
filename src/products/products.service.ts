import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
// import { ulid } from 'ulidx';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private findProductById(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return [product, productIndex];
  }

  async insertProduct(title: string, desc: string, price: number) {
    // const id = ulid();
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

  getProductById(prodId: string): Product {
    const [product] = this.findProductById(prodId);
    return { ...product };
  }

  updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ): Product {
    const [product, index] = this.findProductById(prodId);
    const updatedProd = { ...product };
    if (prodTitle) {
      updatedProd.title = prodTitle;
    }
    if (prodDesc) {
      updatedProd.description = prodDesc;
    }
    if (prodPrice) {
      updatedProd.price = prodPrice;
    }
    this.products[index] = updatedProd;
    return { ...updatedProd };
  }

  deleteProduct(prodId: string) {
    const index = this.findProductById(prodId)[1];
    this.products.splice(index, 1);
    return { msg: 'OK! deleted' };
  }
}
