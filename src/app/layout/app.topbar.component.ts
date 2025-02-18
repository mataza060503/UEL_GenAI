import { Route, Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common'; // Import Location
import { DataService } from '../services/Data.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {

    items!: MenuItem[];

    user: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    authText: string = ""

    constructor(
        public layoutService: LayoutService, 
        private authService: AuthService,
        private router: Router,
        private location: Location,
        private dataService: DataService
    ) {
        this.user = localStorage.getItem("user")
        
        if (!this.user) {
            this.authText = "Login"
            this.showDialog()
        } else {
            this.authText = "Logout"
        }
    }

    visible: boolean = false;

    showDialog() {
        if (this.authText == "Login") {
            this.visible = true;
        } else if (this.user) {
            this.logout()
        }
        
    }

    async login() {
        this.user = await this.authService.googleSignIn()
        this.dataService.getAccount(this.user.uid).subscribe({
            next: (data) => {
                this.user.uid = data[0]._id
                localStorage.setItem('user', JSON.stringify(this.user));
                this.visible = false
            }
        })
        //window.location.reload()
    }

    async logout() {
        await this.authService.signOut()
        localStorage.removeItem('user')
        this.location.replaceState("")
        window.location.reload()
    }
}
