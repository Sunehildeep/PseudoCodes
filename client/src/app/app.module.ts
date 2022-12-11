import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './partials/nav/nav.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateSurveyComponent } from './pages/update-survey/update-survey.component';
import { TakeSurveyComponent } from './pages/take-survey/take-survey.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';
import { ViewResponsesComponent } from './pages/view-responses/view-responses.component';
import { ViewStatsComponent } from './pages/view-stats/view-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ActiveSurveysComponent,
    CreateSurveyComponent,
    LoginComponent,
    RegisterComponent,
    UpdateSurveyComponent,
    TakeSurveyComponent,
    MySurveysComponent,
    ViewResponsesComponent,
    ViewStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
