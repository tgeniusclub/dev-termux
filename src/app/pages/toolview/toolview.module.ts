import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolviewPageRoutingModule } from './toolview-routing.module';

import { ToolviewPage } from './toolview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolviewPageRoutingModule
  ],
  declarations: [ToolviewPage]
})
export class ToolviewPageModule {}
