import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { async } from 'q';
import { Product } from './models/app-product';
import { ShoppingCartItem } from './models/app-shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/app-shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await  this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/'+ cartId).valueChanges()
      .pipe(map(x=> {return new ShoppingCart(x.items)}));
  } 

  async addToCart(product: Product){
    this.updateItem(product,1);
  }

  async removeFromCart(product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private getItem(cartId: string, productId:string){
    return this.db.object<any>('/shopping-carts/'+ cartId +'/items/' + productId);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
      
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return  result.key;
    
  }

  private async updateItem(product:any, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if (!item) item = {};
      let quantity =(item.quantity|| 0 )+ change;
      if ( quantity === 0 ) item$.remove();
      else 
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }

}
