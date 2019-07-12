import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCart } from './models/app-shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list<any>('/orders').valueChanges();
  }

  getOrdersByUser(userId: string){
    return this.db.list<any>('/orders',x => x.orderByChild('userId').equalTo(userId)).valueChanges();

  }


}
