import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { AngularFireList } from 'angularfire2/database';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any[];
  product;
  id;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService
    ) {
    
    categoryService.getAll().snapshotChanges()
    .subscribe((res)=>{
      this.categories = res.map(change => ({key: change.payload.key, val: change.payload.val()}))
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) 
      this.productService.getProduct(this.id)
        .pipe(take(1))
        .subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product){
    if(this.id) 
      this.productService.update(this.id, product);
    else 
      this.productService.create(product);

    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);

  }

}
