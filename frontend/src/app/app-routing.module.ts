import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzComponent } from './pages/admin/view-quizz/view-quizz.component';
import { AddQuizzComponent } from './pages/admin/add-quizz/add-quizz.component';
import { UpdateQuizzComponent } from './pages/admin/update-quizz/update-quizz.component';
import { QuestionsComponent } from './pages/admin/questions/questions.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { UpdateQuestionsComponent } from './pages/admin/update-questions/update-questions.component';
import { LoadQuizzComponent } from './pages/user/load-quizz/load-quizz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { SubscriptionComponent } from './pages/user/subscription/subscription.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';


const routes: Routes = [


  {

    path:'',
    component:HomeComponent,
    pathMatch:'full'

  },


  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
   path:"admin",
   component:DashboardComponent,
   canActivate:[AdminGuard],

   children:[

     {
       path:'profile',
       component:ProfileComponent,
       pathMatch:'full'
     },
     {
        path:'categories',
        component:ViewCategoriesComponent,
        pathMatch:'full'
     },
     {
          path:'addCategories',
          component:AddCategoriesComponent,
          pathMatch:'full'
     },
     {
       path:'viewQuizz',
       component:ViewQuizzComponent,
       pathMatch:'full'
     },
     {
       path:'addQuizz',
       component:AddQuizzComponent,
       pathMatch:'full'
     },
     {
       path:'orders',
       component:OrdersComponent,
       pathMatch:'full'


      },
     {
       path:'quizz/:id',
       component:UpdateQuizzComponent,
       pathMatch:'full'
     },
     {
       path:'questions/:id/:title',
       component:QuestionsComponent,
       pathMatch:'full'
     },
     {
       path:'add-questions/:id/:title',
       component:AddQuestionsComponent
     },
     {
       path:'update-questions/:id',
       component:UpdateQuestionsComponent,
       pathMatch:'full'
     }

   ]
  },
  {
      path:"user",
      component:UserDashboardComponent,
      canActivate:[UserGuard],

      children:[
        {
          path:':id',
          component:LoadQuizzComponent,
          pathMatch:'full'
        },
        {
          path:'instructions/:id',
          component:InstructionsComponent,
          pathMatch:'full'
        },
        {
          path:'userProfile/:id',
          component:UserProfileComponent,
          pathMatch:'full',
          canActivate:[UserGuard]
        },
        {
        path:'update/:id',
        component:UpdateUserComponent,
        pathMatch:'full',
        canActivate:[UserGuard]


        },




      ]
  },
  {
     path:'start/:id',
     component:StartComponent,
     pathMatch:'full',
     canActivate:[UserGuard]
  },
  {
    path:'subscription',
    component:SubscriptionComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },




  {
    path:"**",
    component: NotfoundComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
