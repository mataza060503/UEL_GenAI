import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppLayoutModule } from './layout/app.layout.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

/** PrimeNg components */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    PagesModule,
    ComponentsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"gradutation-project-b8acb","appId":"1:1079223125431:web:9122e22b93878cecd45432","storageBucket":"gradutation-project-b8acb.firebasestorage.app","apiKey":"AIzaSyD4qxusAHbt5jL7I23pjrPoDvJVMnsX6LA","authDomain":"gradutation-project-b8acb.firebaseapp.com","messagingSenderId":"1079223125431","measurementId":"G-32K7QTH7L9"})),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
