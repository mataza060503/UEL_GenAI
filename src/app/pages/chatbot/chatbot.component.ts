import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatMessage } from '../../models/message';
import { DataService } from '../../services/Data.service';
import { ChatHistory } from '../../models/chat';
import { ActivatedRoute } from '@angular/router';
import { GenAIService } from '../../services/GenAI.service';
import { Prompt } from '../../models/prompt';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @ViewChild('chat') private scrollContainer!: ElementRef;

  chatId: string | null = null;
  pendingPrompt: string = "";
  messages: ChatMessage[] = [];
  chat_history: ChatHistory[] = [];

  isResponding = false;
  formGroup = new FormGroup({
    message: new FormControl(),
    chatId: new FormControl()
  })

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private genAI: GenAIService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('id');

      if (this.chatId) {
        this.loadData(this.chatId)
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  prompt() {
    if (this.isResponding) return

    const formData = this.formGroup.getRawValue()
    var prompt = new Prompt(formData)
    prompt.ChatId = this.chatId
    
    if (formData.message != null && formData.message != undefined) {
      this.isResponding = true
      this.pendingPrompt = formData.message

      this.genAI.prompt(prompt).subscribe({
        next: (data) => {
          if (data.response && this.chatId) {
            this.loadData(this.chatId)
            this.isResponding = false
          }
        },
        error: (err) => console.log(err)
      })
    }
  }

  loadData(chatId: string) {
    this.dataService.getMessage(chatId).subscribe({
      next: (data) => {
        this.messages = data

        this.cdr.detectChanges(); 
        this.scrollToBottom()
      },
      error: (err) => console.log(err)
    })
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        console.log('Scrolling to bottom');
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } else {
        console.log('scrollContainer is undefined');
      }
    }, 100); // Delay ensures DOM is fully rendered
  }
}

