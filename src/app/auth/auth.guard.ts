import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad }  from '@angular/router';
import {  Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AuthGuard implements CanActivate,CanLoad{

    constructor(private authServive :AuthService,private router :Router){

    }
    canLoad(route: Route){
        if(this.authServive.isAuth()){
        return true;   
        }
         else{
         this.router.navigate(['/login']);
        }
    }
    canActivate(route :ActivatedRouteSnapshot, state : RouterStateSnapshot)
    {
        if(this.authServive.isAuth())
            return true;   
             else
             this.router.navigate(['/login']);
  
    } 
}     
