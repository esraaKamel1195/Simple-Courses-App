import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromApp.appFeatureKey,
      fromApp.reducers, {
        metaReducers: fromApp.metaReducers,
      }),
  ],
})
export class AppModule {}
