import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimalComponent } from "./animal/animal.component";
import { HomeComponent } from "./home/home.component";
import { ProprietaireComponent } from "./proprietaire/proprietaire.component";

const routes: Routes = [
  { path: "", redirectTo: "accueil", pathMatch: "full" },
  { path: "accueil", component: HomeComponent },
  { path: "animal", component: AnimalComponent },
  { path: "proprietaire", component: ProprietaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
