import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [AppComponent, ImageComponent, WebcamComponent, HomeComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
