import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  private subscription : Subscription;
  
  constructor(private userService: UserService,private auth: AuthService, router : Router){
    this.subscription = this.auth.user$.subscribe( user => {
      if (!user) return;
      
      this.userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
