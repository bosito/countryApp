import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, SidebarComponent],
  exports: [HomeComponent, AboutComponent, SidebarComponent],
  imports: [CommonModule],
})
export class SharedModule {}
