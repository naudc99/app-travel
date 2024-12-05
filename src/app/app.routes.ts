import {  Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AccommodationComponent } from './components/pages/accommodation/accommodation.component';
import { ActivitiesComponent } from './components/pages/activities/activities.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { DetailAccommodationComponent } from './components/pages/detail-accommodation/detail-accommodation.component';
import { DetailActivityComponent } from './components/pages/detail-activity/detail-activity.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { notAuthGuard } from './guards/not-auth-guard';
import { authGuard } from './guards/auth-guard';
import { isAdminGuard } from './guards/admin-guard';
import { AdminContentComponent } from './components/pages/admin-pages/admin-content/admin-content.component';
import { DestinationsComponent } from './components/pages/destinations/destinations.component';
import { DetailDestinationComponent } from './components/pages/detail-destination/detail-destination.component';
import { CartComponent } from './components/pages/cart/cart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: LandingComponent, canActivate: [notAuthGuard]},
    { path: 'destinations', component: DestinationsComponent},
    { path: 'destination/:id', component: DetailDestinationComponent},
    { path: 'accommodations', component: AccommodationComponent},
    { path: 'accommodation/:id', component: DetailAccommodationComponent},
    { path: 'activities', component: ActivitiesComponent},
    { path: 'activity/:id', component: DetailActivityComponent},
    { path: 'register', component: RegisterComponent, canActivate: [notAuthGuard]},
    { path: 'login', component: LoginComponent, canActivate: [notAuthGuard]},
    { path: 'profile', component: ProfileComponent},
    { path: 'cart', component: CartComponent, canActivate: [authGuard]},
    {
        path: 'admin', component: AdminContentComponent, canActivate: [authGuard, isAdminGuard],
        loadChildren: () => import('./modules/admin-router.module').then(m => m.routes)
    },
    { path: '**', component: LandingComponent }
];
