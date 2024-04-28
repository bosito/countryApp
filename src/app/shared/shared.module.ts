import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { SearchBoxComponent } from './components/search-box/seach-box.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    SidebarComponent,
    ContactComponent,
    SearchBoxComponent,
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    SidebarComponent,
    ContactComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
