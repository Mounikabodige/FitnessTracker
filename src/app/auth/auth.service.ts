import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { Subject } from 'rxjs' ;
import { AngularFireAuth } from 'angularfire2/auth'
import  * as fromRoot from '../app.reducer';
import * as UI from  '../shared/ui.actions';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router : Router,
        private afauth: AngularFireAuth,
        private trainingService : TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>){
    }

    initAuthListener(){
        this.afauth.authState.subscribe(user =>{
            if(user)
            {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {

        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData:AuthData){
        this.store.dispatch(new UI.StartLoading());
        this.afauth.auth
        .createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result =>{
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());

            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message,null, 3000);
            });
    }


    login(authData:AuthData){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afauth.auth
        .signInWithEmailAndPassword(authData.email,
            authData.password)
            .then(result =>{  
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
             })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message,null, 3000);

                });
    }
    logout(){
        this.afauth.auth.signOut();

    }
    
    isAuth(){
        return this.isAuthenticated;
    }

    

}