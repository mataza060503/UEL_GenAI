import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children:[
      {path: '', component: ChatbotComponent},
      {path: ':id', component: ChatbotComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
