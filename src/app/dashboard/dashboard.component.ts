import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private sidebarDropdowns: HTMLElement[] = [];
  private pageWrapper: HTMLElement | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private dialog: MatDialog) { }

  ngAfterViewInit() {
    // Initialize DOM elements
    this.sidebarDropdowns = Array.from(
      this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown')
    );
    this.pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');

    // Attach click event listeners for dropdowns
    this.sidebarDropdowns.forEach((dropdown) => {
      const anchor = dropdown.querySelector('a');
      if (anchor) {
        this.renderer.listen(anchor, 'click', (event) => {
          event.preventDefault(); // Prevent default anchor behavior
          this.toggleDropdown(dropdown);
        });
      }

      // Attach click event listeners for dropdown menu items
      const menuItems = dropdown.querySelectorAll('.sidebar-submenu a');
      menuItems.forEach((item) => {
        this.renderer.listen(item, 'click', () => this.closeDropdown(dropdown));
      });
    });

    // Attach click event listeners for sidebar toggle buttons
    const closeSidebarButton =
      this.elRef.nativeElement.querySelector('#close-sidebar');
    const showSidebarButton =
      this.elRef.nativeElement.querySelector('#show-sidebar');

    if (closeSidebarButton) {
      this.renderer.listen(closeSidebarButton, 'click', () =>
        this.toggleSidebar(false)
      );
    }

    if (showSidebarButton) {
      this.renderer.listen(showSidebarButton, 'click', () =>
        this.toggleSidebar(true)
      );
    }

    // Attach global click listener to handle clicks outside dropdowns
    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.isClickInsideDropdown(event)) {
        this.closeAllDropdowns();
      }
    });
  }

  toggleDropdown(dropdown: HTMLElement) {
    const submenu = dropdown.querySelector('.sidebar-submenu') as HTMLElement;
    if (submenu) {
      const isActive = dropdown.classList.contains('active');
      this.sidebarDropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove('active');
          const sub = d.querySelector('.sidebar-submenu') as HTMLElement;
          if (sub) sub.style.display = 'none'; // Hide other submenus
        }
      });
      if (!isActive) {
        this.renderer.addClass(dropdown, 'active');
        submenu.style.display = 'block'; // Show submenu
      } else {
        this.renderer.removeClass(dropdown, 'active');
        submenu.style.display = 'none'; // Hide submenu
      }
    }
  }

  closeDropdown(dropdown: HTMLElement) {
    this.renderer.removeClass(dropdown, 'active');
    const submenu = dropdown.querySelector('.sidebar-submenu') as HTMLElement;
    if (submenu) {
      submenu.style.display = 'none'; // Hide submenu
    }
  }

  closeAllDropdowns() {
    this.sidebarDropdowns.forEach((dropdown) => {
      this.closeDropdown(dropdown);
    });
  }

  isClickInsideDropdown(event: Event): boolean {
    const target = event.target as HTMLElement;
    return this.sidebarDropdowns.some(
      (dropdown) =>
        dropdown.contains(target) ||
        (dropdown.querySelector('.sidebar-submenu') as HTMLElement)?.contains(
          target
        )
    );
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


  changepassword() {
    this.dialog.open(ChangePasswordComponent), {

    }
  }

  logout() {
    this.dialog.open(LogoutComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "500ms",
    })
  }
}
