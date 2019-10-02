import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { Routes, RouterModule } from "@angular/router";

const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(homeRoutes, { useHash: true })
  ]
})

export class HomeModule { }
