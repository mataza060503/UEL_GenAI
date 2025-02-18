import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatMessage } from '../../models/message';
import { DataService } from '../../services/Data.service';
import { ChatHistory } from '../../models/chat';
import { ActivatedRoute, Router } from '@angular/router';
import { GenAIService } from '../../services/GenAI.service';
import { Prompt } from '../../models/prompt';
import { ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common'; // Import Location
import { RefreshService } from '../../services/refresh.service';



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

  userId: any;

  isResponding = false;
  formGroup = new FormGroup({
    message: new FormControl(),
    chatId: new FormControl()
  })

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private genAI: GenAIService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private menuRefreshService: RefreshService
  ) {
    const user = localStorage.getItem("user")
        if (user) {
            this.userId = JSON.parse(user).uid
        }
  }

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

  async prompt() {
    const formData = this.formGroup.getRawValue()

    if (this.messages.length == 0) {
      const chatHistory = {
        accountId: this.userId,
        title: formData.message
      };

      console.log(chatHistory)

      try {
        const data = await firstValueFrom(this.dataService.postChatHistory(chatHistory));
        if (data?.id) {
          this.location.replaceState(`/${data.id}`);
          this.chatId = data.id; // Update the chatId for subsequent API calls
          this.ask()

          this.menuRefreshService.triggerRefresh();
        }
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      this.ask()
    }

    if (this.isResponding) return
  }

  async ask() {
    const formData = this.formGroup.getRawValue()
    var prompt = new Prompt(formData)

    if (formData.message != null && formData.message != undefined) {
      this.isResponding = true
      this.pendingPrompt = formData.message
      prompt.ChatId = this.chatId
      this.formGroup.controls['message'].setValue("")

      try {
        const data = await firstValueFrom(this.genAI.prompt(prompt));
        if (data.response && this.chatId) {
          await this.loadData(this.chatId); // Ensure messages are loaded after the response
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isResponding = false; // Reset the responding state
      }
    }
  }

  async loadData(chatId: string) {
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
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } else {
      }
    }, 100); // Delay ensures DOM is fully rendered
  }
}

