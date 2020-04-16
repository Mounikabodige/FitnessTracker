import  { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
 import { Injectable } from '@angular/core';
 import { AngularFirestore } from 'angularfire2/firestore';


import { Exercise } from './exercise.model';


@Injectable()

export class TrainingService{
 exerciseChanged = new Subject<Exercise>();
 exercisesChanged =  new Subject<Exercise[]>();
 finishedExercisesChanged = new Subject<Exercise[]>();
   private availableExrcises : Exercise[]=[];
    private runningExercise : Exercise;

    constructor(private db : AngularFirestore){}

fetchAvailableExercises(){
    this.db.
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
    } );
}

    startExercise(selectedId: string){
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
        this.db
        .collection('finishedExercises')
        .valueChanges().subscribe((exercises : Exercise []) =>
        {
            this.finishedExercisesChanged.next(exercises);
        });
    }

    private addDataToDb(exercise : Exercise)
    {
        this.db.collection('finishedExercises').add(exercise);
    }
}