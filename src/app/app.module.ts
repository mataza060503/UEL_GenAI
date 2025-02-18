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

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from './environment/environment';


/** PrimeNg components */
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

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
    ButtonModule,
    DialogModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
