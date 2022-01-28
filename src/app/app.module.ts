import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MonacoEditorModule} from "ngx-monaco-editor";
import {FormsModule} from "@angular/forms";
import { MenubarComponent } from './menubar/menubar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent
  ],
  imports: [
    RouterModule.forRoot([{
      path: ':id',
      component: AppComponent
    }]),
    BrowserModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
