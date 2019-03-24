import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';

const authRoutes: Routes = [
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
