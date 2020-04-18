import  { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
 import { Injectable } from '@angular/core';
 import { AngularFirestore } from 'angularfire2/firestore';
 import { Subscription } from 'rxjs' ; 


import { Exercise } from './exercise.model';


@Injectable()

export class TrainingService{
 exerciseChanged = new Subject<Exercise>();
 exercisesChanged =  new Subject<Exercise[]>();
 finishedExercisesChanged = new Subject<Exercise[]>();
   private availableExrcises : Exercise[]=[];
    private runningExercise : Exercise;
    private fbSubs: Subscription[] = [];

    constructor(private db : AngularFirestore){}

fetchAvailableExercises(){
    this.fbSubs.push(this.db.
    collection('availableExercises')
    .snapshotChanges().pipe(
    map(docArray =>{
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
        this.availableExrcises = exercises;
        this.exercisesChanged.next([...this.availableExrcises]);
    } ,error =>{
        console.log(error);
    }));
}

    startExercise(selectedId: string){
        // this.db.doc('availableExercises/'+selectedId).update({lastSelected : new Date()});
        this.runningExercise = this.availableExrcises.find( 
            ex => ex.id === selectedId
            );
        this.exerciseChanged.next({
            ...this.runningExercise
        });
        
    }

    completeExercise()
    {
        this.addDataToDb({
            ...this.runningExercise,
             date:new Date(),
              state : 'completed'
            });
        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }

    cancelExercise(progress : number){
        this.addDataToDb({
            ...this.runningExercise,
            duration: this.runningExercise.duration * ( progress / 100),
            calories: this.runningExercise.calories * ( progress / 100 ) ,
             date:new Date(),
              state : 'cancelled'
            });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(){
        return{ ...this.runningExercise };
    }
    fetchCompletedOrCancelledExercises(){
        this.fbSubs.push( this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises : Exercise []) =>
        {
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    cancelSubsccriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDb(exercise : Exercise)
    {
        this.db.collection('finishedExercises').add(exercise);
    }
}