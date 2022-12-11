import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import {CreateSurveyComponent} from "./pages/create-survey/create-survey.component";
import {LoginComponent} from "./pages/login/login.component";
import {MySurveysComponent} from "./pages/my-surveys/my-surveys.component";
import {ViewResponsesComponent} from "./pages/view-responses/view-responses.component";
import {UpdateSurveyComponent} from "./pages/update-survey/update-survey.component";
import { TakeSurveyComponent } from "./pages/take-survey/take-survey.component";
import {ViewStatsComponent} from "./pages/view-stats/view-stats.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'active-surveys', component: ActiveSurveysComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-survey', component: CreateSurveyComponent },
  { path: 'update-survey', component: UpdateSurveyComponent },
  { path: 'login', component: LoginComponent},
  { path: 'my-surveys', component: MySurveysComponent},
  { path: 'view-responses', component: ViewResponsesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'take-survey', component: TakeSurveyComponent },
  { path: 'view-stats', component: ViewStatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
