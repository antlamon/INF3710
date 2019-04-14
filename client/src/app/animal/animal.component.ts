import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";

import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
import { NewAnimalFormComponent } from "./new-animal-form/new-animal-form.component";

interface AnimalInfo {
  animal: Animal;
  bill: object;
  treatments: object;
}

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent {
  protected animalInfos: AnimalInfo[] = [];
  protected displayedColumns: string[] = ["traitement", "quantite", "cout"];
  protected searchInput: FormControl;
  protected submitted: boolean;

  public constructor (private readonly dialog: MatDialog, private readonly communicationService: CommunicationService) {
    this.searchInput = new FormControl("", [Validators.required]);
    this.submitted = false;
  }

  protected submit(): void {
    if (this.searchInput.invalid) {
      return;
    }
    this.submitted = true;
    this.communicationService.getAnimalsFromName(this.searchInput.value).subscribe((animals: Animal[]) => {
      this.animalInfos = [];
      for (let i: number = 0; i < animals.length; ++i) {
        animals[i].dateNaissance = new Date(animals[i].dateNaissance);
        animals[i].dateInscription = new Date(animals[i].dateInscription);
        this.animalInfos.push({ animal: animals[i] } as AnimalInfo);
        this.getAnimalTreatments(i);
        this.getAnimalBill(i);
      }
      console.log(animals);
    });
  }

  protected openModal(): void {
    this.dialog.open(NewAnimalFormComponent);
  }

  protected editAnimal(animal: Animal, i: number): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = animal;
    this.dialog.open(NewAnimalFormComponent, config).afterClosed().subscribe((animalM: Animal) => {
      if (animalM) {
        this.animalInfos[i].animal = animalM;
      } else {
        // TODO : Gestion d'erreur.
      }
    });
  }

  protected getAnimalTreatments(animalIndex: number): void {
    this.communicationService.getTreatments(
      this.animalInfos[animalIndex].animal.numAnimal,
      this.animalInfos[animalIndex].animal.numClinique)
      .subscribe((treatments: object) => {
        this.animalInfos[animalIndex].treatments = treatments;
        console.log(treatments);
      });
  }

  protected getAnimalBill(animalIndex: number): void {
    this.communicationService.getBill(
      this.animalInfos[animalIndex].animal.numAnimal,
      this.animalInfos[animalIndex].animal.numClinique)
      .subscribe((bill: object) => {
        this.animalInfos[animalIndex].bill = bill;
        console.log(bill);
      });
  }
}
