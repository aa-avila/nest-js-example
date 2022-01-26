import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }
}
