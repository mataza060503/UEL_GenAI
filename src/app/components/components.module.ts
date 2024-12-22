import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [
    ComponentsComponent,
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ]
})
export class ComponentsModule { }
