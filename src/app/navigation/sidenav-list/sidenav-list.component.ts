import { Component, OnInit,EventEmitter,Output ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service'


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

 @Output() closeToggle = new EventEmitter<void>();
isAuth = false;
authSubscription :Subscription;

  constructor( private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    }
      )
  }
  onClose(){
    this.closeToggle.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
