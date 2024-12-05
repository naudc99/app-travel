import { Routes } from '@angular/router';
import { isAdminGuard } from '../guards/admin-guard';
import { NewDestinationComponent } from '../components/pages/admin-pages/new-destination/new-destination.component';
import { DestinationListComponent } from '../components/pages/admin-pages/destination-list/destination-list.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'newDestination',
                component: NewDestinationComponent,
                canActivate: [isAdminGuard],
            },
            {
                path: 'destinationList',
                component: DestinationListComponent,
                canActivate: [isAdminGuard],
            },
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: '**', redirectTo: 'admin' },
        ],
    },
];