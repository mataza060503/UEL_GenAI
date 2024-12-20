import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PagesComponent,
    ChatbotComponent
  ],
  exports: [
    ChatbotComponent,
  ]
})
export class PagesModule { }
