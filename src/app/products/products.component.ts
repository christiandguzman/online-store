import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/app-product';
import { ShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{
  
  filteredProducts:Product[]=[];
  products: Product[]=[];
  category:string;
  cart: ShoppingCart;
  subscriptions :Subscription[] =[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private cartService: ShoppingCartService
    ) {

    this.subscriptions.push(  
      this.productService.getAll().snapshotChanges()
      .subscribe( res =>{
        this.products = res.map( change => (
          new Product(change.key,change.payload.val()))
        )
        this.filteredProducts = this.products;
      })
    )
    this.subscriptions.push(  
      this.route.queryParamMap.subscribe(params =>{
        this.category = params.get('category');
        this.filteredProducts = (this.category)? this.products.filter(p => p.category === this.category):
        this.products;
      })
    )
     
  }

  async ngOnInit(){
   this.subscriptions.push( 
     (await this.cartService.getCart()).subscribe(res=> this.cart = res))
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


}
