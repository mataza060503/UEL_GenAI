import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatMessage } from '../../models/message';
import { DataService } from '../../services/Data.service';
import { ChatHistory } from '../../models/chat';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  messages: ChatMessage[] = [];
  chat_history: ChatHistory[] = [];

  isResponding = false;
  formGroup = new FormGroup({
    query: new FormControl()
  })

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getChatHistory("6763dca395ad1cb11cc18a36").subscribe({
      next: (data) => {
        this.chat_history = data;
        console.log(this.chat_history);
      },
      error: (err) => console.log(err)
    });
  }

  prompt() {
    var formData = this.formGroup.getRawValue()
    console.log(formData)
    if (formData.query != null && formData.query != undefined) {
      this.isResponding = true
    }
  }

  loadData() {
    
  }

}
