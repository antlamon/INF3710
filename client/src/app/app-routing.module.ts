import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimalComponent } from "./animal/animal.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", redirectTo: "acceuil", pathMatch: "full" },
  { path: "acceuil", component: HomeComponent },
  { path: "animal", component: AnimalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
