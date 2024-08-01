import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  name: string;
  price: number;
  photo: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private productsSource = new BehaviorSubject<Product[]>([]);
  currentProducts = this.productsSource.asObservable();

  constructor() { }

  addProduct(product: Product){
    const products = this.productsSource.value;
    this.productsSource.next([...products, product]);
  }


}
