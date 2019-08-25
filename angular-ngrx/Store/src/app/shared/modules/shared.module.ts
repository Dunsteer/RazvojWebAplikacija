import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  exports:[
    CommonModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {}
