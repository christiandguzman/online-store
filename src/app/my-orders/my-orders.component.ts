import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
    ) { 
      this.orders$ = this.authService.user$.pipe(
        switchMap( u => 
         this.orderService.getOrdersByUser(u.uid)
        )
      );
  }

  ngOnInit() {
  }


}
