import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training.routing.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';


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
      
],
  entryComponents:[StopTrainingComponent],
})

export class TrainingModule{

}