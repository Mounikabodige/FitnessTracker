import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {    FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';


import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training.routing.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import {trainingReducer } from './training.reducer';

@NgModule({
    declarations:[
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
        TrainingComponent,],
    imports:[
      TrainingRoutingModule,
        SharedModule,
        StoreModule.forFeature('training',trainingReducer)
],
  entryComponents:[StopTrainingComponent]
})

export class TrainingModule{}