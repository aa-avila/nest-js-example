import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { ulid } from 'ulidx';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = ulid();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }
}
