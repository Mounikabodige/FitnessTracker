import  { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
 import { Injectable } from '@angular/core';
 import { AngularFirestore } from 'angularfire2/firestore';
 import { Subscription } from 'rxjs' ; 
import  { Store  } from '@ngrx/store';
import { take }  from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './ training.actions';
import * as fromTraining from './training.reducer';


@Injectable()

export class TrainingService{
 exerciseChanged = new Subject<Exercise>();
 exercisesChanged =  new Subject<Exercise[]>();
 finishedExercisesChanged = new Subject<Exercise[]>();
   private availableExrcises : Exercise[]=[];
    private runningExercise : Exercise;
    private fbSubs: Subscription[] = [];

    constructor(private db : AngularFirestore,
        private uiService : UIService,
        private store: Store<fromTraining.State>){}

    fetchAvailableExercises(){
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db.
        collection('availableExercises')
        .snapshotChanges().pipe(
        map(docArray =>{
            // throw(new Error());
            return  docArray.map(doc => {
                return {
                id : doc.payload.doc.id,
                name : doc.payload.doc.data()["name"],
                duration :doc.payload.doc.data()["duration"],
                calories :doc.payload.doc.data()["calories"],      
                };
            });
        }))
        .subscribe((exercises: Exercise[]) =>
        {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, error =>{
            this.store.dispatch(new UI.StopLoading());

            this.uiService.showSnackBar(
                'Fetching Exercises Failed,Please try again later',
                null , 
                3000
                );
            this.exercisesChanged.next(null);
        })
        );
    }

    startExercise(selectedId: string){
        this.store.dispatch(new Training.StartTraining(selectedId));

    }

    completeExercise()
    {
        this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(ex =>
             {
            //     this.addDataToDb({
            //         ...ex,
            //  date : new Date(),
            //  state: 'completed'
              //   });
             this.store.dispatch(new Training.StopTraining());
            console.log("Completed")
            });
        
    }

    cancelExercise(progress : number){

        this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(ex =>
            {
            //     this.addDataToDb
            //     ({
            //         ...ex,
            //         duration: ex.duration * ( progress / 100),
            //         calories: ex.calories * ( progress / 100 ) ,
            //         date:new Date(),
            //           state : 'cancelled'
            //         });
               this.store.dispatch(new Training.StopTraining());
               console.log("cancelled")

            });
    }


    fetchCompletedOrCancelledExercises(){
        this.fbSubs.push( this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises : Exercise []) => {
            this.store.dispatch(new Training.SetFinsihedTrainigs(exercises));
        })
        );
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDb(exercise : Exercise)
    {
        this.db.collection('finishedExercises').add(exercise);
    }
}