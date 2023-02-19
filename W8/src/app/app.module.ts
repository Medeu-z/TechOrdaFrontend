import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './components/main/posts/posts.component';
import { MainComponent } from './components/main/main.component';
import { PostdetailComponent } from './components/main/postdetail/postdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    MainComponent,
    PostdetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
