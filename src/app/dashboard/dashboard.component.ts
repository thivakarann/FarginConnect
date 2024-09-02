import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private sidebarDropdowns: HTMLElement[] = [];
  private pageWrapper: HTMLElement | null = null;
 
  constructor(private elRef: ElementRef, private renderer: Renderer2,private dialog:MatDialog) {}
 
  ngAfterViewInit() {
    // Initialize DOM elements
    this.sidebarDropdowns = Array.from(this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown'));
    this.pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
   
    // Attach click event listeners
    this.sidebarDropdowns.forEach(dropdown => {
      const anchor = dropdown.querySelector('a');
      if (anchor) {
        this.renderer.listen(anchor, 'click', () => this.toggleDropdown(dropdown));
      }
    });
 
    const closeSidebarButton = this.elRef.nativeElement.querySelector('#close-sidebar');
    const showSidebarButton = this.elRef.nativeElement.querySelector('#show-sidebar');
 
    if (closeSidebarButton) {
      this.renderer.listen(closeSidebarButton, 'click', () => this.toggleSidebar(false));
    }
 
    if (showSidebarButton) {
      this.renderer.listen(showSidebarButton, 'click', () => this.toggleSidebar(true));
    }
  }
 
  toggleDropdown(dropdown: HTMLElement) {
    const submenu = dropdown.querySelector('.sidebar-submenu') as HTMLElement;
    if (submenu) {
      const isActive = dropdown.classList.contains('active');
      this.sidebarDropdowns.forEach(d => d.classList.remove('active'));
      if (!isActive) {
        this.renderer.addClass(dropdown, 'active');
        submenu.style.display = 'block'; // Show submenu
      } else {
        submenu.style.display = 'none'; // Hide submenu
      }
    }
  }
 
  toggleSidebar(show: boolean) {
    if (this.pageWrapper) {
      if (show) {
        this.renderer.addClass(this.pageWrapper, 'toggled');
      } else {
        this.renderer.removeClass(this.pageWrapper, 'toggled');
      }
    }
}


changepassword(){
this.dialog.open(ChangePasswordComponent),{
  
}
}
}
