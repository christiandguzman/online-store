import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  
  categories: any[]=[];
  @Input('category') category;

  constructor( private categoryService:CategoryService ) {
    this.categoryService.getAll().snapshotChanges()
      .subscribe((res)=>{
        this.categories = res.map(change => ({key: change.payload.key, val: change.payload.val()}))
    });
  }

  ngOnInit() {
  }

}
