import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { WebStorageModule } from 'ngx-store';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { ConnectComponent } from './workspace/connect/connect.component';
import { EditorComponent } from './workspace/editor/editor.component';
import { ResponseComponent } from './workspace/response/response.component';

import { MainService } from './main.service';
import { ResponseGridComponent } from './workspace/response-grid/response-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    EditorComponent,
    ResponseComponent,
    ResponseGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot(),
    AngularSlickgridModule.forRoot(),
    WebStorageModule,
    AceEditorModule
  ],
  entryComponents: [
    ResponseGridComponent
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
