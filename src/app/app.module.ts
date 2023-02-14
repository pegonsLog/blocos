import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  ScreenTrackingService,
  UserTrackingService
} from '@angular/fire/analytics';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesviosModule } from './desvios/desvios.module';
import { LoginModule } from './login/login.module';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule,
    LoginModule,
    DesviosModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
