import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";

@Component({
    selector: 'app-admin-content',
    standalone: true,
    templateUrl: './admin-content.component.html',
    styleUrl: './admin-content.component.scss',
    imports: [RouterOutlet, AdminPanelComponent, RouterLink]
})
export class AdminContentComponent {

}
