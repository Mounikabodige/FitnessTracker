import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad }  from '@angular/router';
import {  Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import  { Store  } from '@ngrx/store';
import {take } from  'rxjs/operators';

import * as fromRoot from '../app.reducer';
 
@Injectable()
export class AuthGuard implements CanActivate,CanLoad{

    constructor(private store : Store<fromRoot.State>,private router :Router){

    }
    canLoad(route: Route){
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
    canActivate(route :ActivatedRouteSnapshot, state : RouterStateSnapshot)
    {        return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    } 
}     
