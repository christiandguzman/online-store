import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, Subject } from 'rxjs';
import { Product } from 'src/app/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  
  products: Product[]=[];
  subscription : Subscription;
  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges()
      .subscribe( res =>{
        this.products = res.map( change => (
          new Product(change.key,change.payload.val()))
        )
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      })
   }
   

  ngOnDestroy(){
    this.subscription.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100
    };
  }


}
