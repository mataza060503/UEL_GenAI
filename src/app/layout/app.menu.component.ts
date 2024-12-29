import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { DataService } from '../services/Data.service';
import { ChatHistory } from '../models/chat';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    models: any[] = [];
    today: any[] = [];
    yesterday: any[] = [];
    week: any[] = [];
    month: any[] = [];

    chat_history: ChatHistory[] = [];

    constructor(
        public layoutService: LayoutService, 
        private dataService: DataService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadData()

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd)) // Only listen for NavigationEnd events
            .subscribe(() => {
                this.loadData();
            });
    }

    loadData() {
        this.dataService.getChatHistory("6763dca395ad1cb11cc18a36").subscribe({
            next: (data: ChatHistory[]) => {
                // Only add new items that are not already in chat_history
                const newChats = data.filter((chat: ChatHistory) => 
                    !this.chat_history.some(existingChat => existingChat._id === chat._id)
                );
    
                // Add new chats to the top of chat_history and process them
                newChats.forEach((chat: ChatHistory) => {
                    this.chat_history.unshift(chat); // Add to the top of the array
    
                    const item = {
                        label: chat.Title,
                        icon: "pi pi-fw pi-comments",
                        routerLink: [`/${chat._id}`]
                    };
    
                    const chatDate = new Date(chat.UpdateAt);
                    const now = new Date();
                    const diffInMilliseconds = now.getTime() - chatDate.getTime();
                    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    
                    // Categorize based on the day difference
                    if (diffInDays <= 1) {
                        // Chats from today
                        this.today.unshift(item);
                    } else if (diffInDays > 1 && diffInDays <= 2) {
                        // Chats from yesterday
                        this.yesterday.unshift(item);
                    } else if (diffInDays > 2 && diffInDays <= 7) {
                        // Chats from the last 7 days but not yesterday
                        this.week.unshift(item);
                    } else {
                        // Older than 7 days
                        this.month.unshift(item);
                    }
                });
    
                // Reset the model and categorize the data again
                this.model = [];
                if (this.today.length > 0) {
                    this.model.push({
                        label: "Today",
                        items: this.today
                    });
                }

                if (this.yesterday.length > 0) {
                    this.model.push({
                        label: "Yesterday",
                        items: this.yesterday
                    });
                }
    
                if (this.week.length > 0) {
                    this.model.push({
                        label: "7 days ago",
                        items: this.week
                    });
                }
    
                if (this.month.length > 0) {
                    this.model.push({
                        label: "30 days ago",
                        items: this.month
                    });
                }
            },
            error: (err) => console.log(err)
        });
    }    

    resetModel() {
        // Clear all arrays before reloading data
        this.model = [];
        this.yesterday = [];
        this.week = [];
        this.month = [];
    }
}
