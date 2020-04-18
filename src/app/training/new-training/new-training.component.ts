import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs';
import { map } from 'rxjs/operators';



import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { CommentStmt, identifierModuleUrl } from '@angular/compiler';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit {
  exercises: Exercise []; 
  exerciseSusbscription : Subscription;
  isLoading = true;
  private loadingSubs: Subscription;

constructor(
  private trainingService :TrainingService,
  private uiService :UIService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading =>{
        this.isLoading = isLoading;
      }
    );
    this.exerciseSusbscription =this.trainingService.exercisesChanged
    .subscribe( exercises =>{
      this.exercises = exercises;
    } 
    );
    this.fetchExercises();
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();

  }


  onStartTraining(form :NgForm){
    this.trainingService.startExercise(form.value.exercise);
  } 

  ngOnDestroy(){
    this.exerciseSusbscription.unsubscribe();
    this.loadingSubs.unsubscribe();

  }
}
