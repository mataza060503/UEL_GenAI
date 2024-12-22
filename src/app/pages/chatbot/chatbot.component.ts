import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatMessage } from '../../models/message';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  messages: ChatMessage[] = [];

  isResponding = false;
  formGroup = new FormGroup({
    query: new FormControl()
  })

  constructor() { }

  ngOnInit() {
    console.log(this.messages)
  }

  prompt() {
    var formData = this.formGroup.getRawValue()
    console.log(formData)
    if (formData.query != null && formData.query != undefined) {
      this.isResponding = true
    }
  }

}
