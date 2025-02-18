import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { DataService } from '../services/Data.service';
import { ChatHistory } from '../models/chat';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RefreshService } from '../services/refresh.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    subscription: any;

    model: any[] = [];
    models: any[] = [];
    today: any[] = [];
    yesterday: any[] = [];
    week: any[] = [];
    month: any[] = [];

    userId: any;

    chat_history: ChatHistory[] = [];

    constructor(
        public layoutService: LayoutService, 
        private dataService: DataService,
        private router: Router,
        private menuRefreshService: RefreshService
    ) {
        const user = localStorage.getItem("user")
        if (user) {
            this.userId = JSON.parse(user).uid
        }
    }

    ngOnInit() {
        this.subscription = this.menuRefreshService.refreshMenu$.subscribe(() => {
            this.loadData().then(() => {
                this.setActiveMenuItem();
            }).catch(err => console.error("Error loading menu:", err));
        });

        this.loadData()

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd)) // Only listen for NavigationEnd events
            .subscribe(() => {
                this.loadData();
                this.setActiveMenuItem(); // Highlight the correct menu item
            });
    }

    setActiveMenuItem() {
        const currentUrl = this.router.url; // Get current URL
        const chatId = currentUrl.split('/').pop(); // Extract the chat ID
    
        if (!chatId && this.model.length > 0) {
            // If no chatId is in the URL, activate the first available chat item
            const firstCategory = this.model[0]; // Get the first section
            if (firstCategory.items.length > 0) {
                const firstItem = firstCategory.items[0]; // Get the first chat
                this.router.navigate([firstItem.routerLink[0]]); // Navigate to the first chat
            }
            return;
        }
    
        // Find the chat item and update its active state
        this.model.forEach(section => {
            section.items.forEach((item: { active: boolean; routerLink: string[] }) => {
                item.active = item.routerLink[0] === `/${chatId}`; // Mark active if it matches the URL
            });
        });
    }

    loadData(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.getChatHistory(this.userId).subscribe({
                next: (data: ChatHistory[]) => {
                    this.chat_history = data; // Reset and set new chat history
                    
                    this.today = [];
                    this.yesterday = [];
                    this.week = [];
                    this.month = [];
    
                    data.forEach((chat: ChatHistory) => {
                        const item = {
                            label: chat.Title,
                            icon: "pi pi-fw pi-comments",
                            routerLink: [`/${chat._id}`]
                        };
    
                        const chatDate = new Date(chat.UpdateAt);
                        const now = new Date();
                        const diffInDays = (now.getTime() - chatDate.getTime()) / (1000 * 60 * 60 * 24);
    
                        if (diffInDays <= 1) {
                            this.today.push(item);
                        } else if (diffInDays > 1 && diffInDays <= 2) {
                            this.yesterday.push(item);
                        } else if (diffInDays > 2 && diffInDays <= 7) {
                            this.week.push(item);
                        } else {
                            this.month.push(item);
                        }
                    });
    
                    this.model = [];
                    if (this.today.length > 0) {
                        this.model.push({ label: "Today", items: this.today });
                    }
                    if (this.yesterday.length > 0) {
                        this.model.push({ label: "Yesterday", items: this.yesterday });
                    }
                    if (this.week.length > 0) {
                        this.model.push({ label: "7 days ago", items: this.week });
                    }
                    if (this.month.length > 0) {
                        this.model.push({ label: "30 days ago", items: this.month });
                    }
    
                    resolve(); // ✅ Resolves when data is fully loaded
                },
                error: (err) => {
                    console.error(err);
                    reject(err); // Handle error
                }
            });
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
