import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'news',
        component: HomeComponent
      },
      {
        path: 'blogs',
        component: HomeComponent
      },
      {
       path: '',
       redirectTo: 'news',
       pathMatch: 'full'
      }
    ])
  ]
})
export class HomeModule { }
