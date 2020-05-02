import { Component,EventEmitter,Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot  from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent  {

 @Output() closeToggle = new EventEmitter<void>();
isAuth$ : Observable<boolean>;
authSubscription :Subscription;

  constructor( private authService : AuthService,
    private store : Store<fromRoot.State>) 
    { }

    ngOnInit(){
      this.isAuth$= this.store.select(fromRoot.getIsAuth);
    }
  onClose(){
    this.closeToggle.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}
