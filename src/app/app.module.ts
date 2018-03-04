import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ConnectComponent } from './workspace/connect/connect.component';
import { EditorComponent } from './workspace/editor/editor.component';
import { ResponseComponent } from './workspace/response/response.component';

import { MainService } from './main.service';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    EditorComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
