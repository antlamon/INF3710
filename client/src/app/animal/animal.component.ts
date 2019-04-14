import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";

import { Animal } from "../../../../common/tables/Animal";
import { Bill } from "../../../../common/tables/Bill";
import { PrescriptionTreatment } from "../../../../common/tables/PrescriptionTraitement";
import { CommunicationService } from "../communication.service";
import { NewAnimalFormComponent } from "./new-animal-form/new-animal-form.component";

interface AnimalInfo {
  animal: Animal;
  bill: Bill;
  treatments: PrescriptionTreatment[];
}

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent {
  protected animalInfos: AnimalInfo[] = [];
  protected displayedColumnsBill: string[] = ["numTraitement", "quantite", "cout"];
  protected displayedColumnsTreatments: string[] = ["numPrescription", "numTraitement", "numExamen", "quantite",
                                                    "dateDebut", "dateFin", "descriptionTraitement", "cout"];
  protected searchInput: FormControl;
  protected searchOneInputs: FormControl[];
  protected submitted: boolean;

  public constructor (
    private readonly dialog: MatDialog,
    private readonly communicationService: CommunicationService,
    private readonly matSnackBar: MatSnackBar) {
    this.searchInput = new FormControl("", [Validators.required]);
    this.searchOneInputs = [];
    this.searchOneInputs.push(new FormControl("", [Validators.required]));
    this.searchOneInputs.push(new FormControl("", [Validators.required]));

    this.submitted = false;
  }

  protected submit(): void {
    if (this.searchInput.invalid) {
      return;
    }
    this.searchOneInputs.forEach((formControl: FormControl) => formControl.reset(""));
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
    });
  }

  protected submitOne(): void {
    if (this.searchOneInputs[0].invalid || this.searchOneInputs[1].invalid) {
      return;
    }
    this.searchInput.reset("");
    this.submitted = true;
    this.communicationService.getAnimalsFromPk(this.searchOneInputs[0].value, this.searchOneInputs[1].value).subscribe((animal: Animal) => {
      this.animalInfos = [];
      if (animal) {
        animal.dateNaissance = new Date(animal.dateNaissance);
        animal.dateInscription = new Date(animal.dateInscription);
        this.animalInfos.push({ animal } as AnimalInfo);
        this.getAnimalTreatments(0);
        this.getAnimalBill(0);
      }

    });
  }

  protected openModal(): void {
    this.dialog.open(NewAnimalFormComponent).afterClosed().subscribe((success: number) => {
      if (success === 1) {
        this.matSnackBar.open("Animal ajouté", "Ok", {
          duration: 2000,
        });
      } else {
        this.matSnackBar.open("Une erreur est survenue dans la base de donnée", "Ok", {
          duration: 2000,
        });
      }
    });
  }

  protected editAnimal(animal: Animal, i: number): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = animal;
    this.dialog.open(NewAnimalFormComponent, config).afterClosed().subscribe((animalM: Animal) => {
      if (animalM) {
        this.animalInfos[i].animal = animalM;
        this.matSnackBar.open("Modifications apportées", "Ok", {
          duration: 2000,
        });
      } else {
        this.matSnackBar.open("Une erreur est survenue dans la base de donnée", "Ok", {
          duration: 2000,
        });
      }
    });
  }

  protected deleteAnimal(numAnimal: string, numClinique: string, i: number): void {
    this.communicationService.deleteAnimal(numAnimal, numClinique).subscribe((success: number) => {
      if (success) {
        this.animalInfos.splice(i, 1);
        this.matSnackBar.open("Animal supprimé", "Ok", {
          duration: 2000,
        });
      } else {
        this.matSnackBar.open("Une erreur est survenue dans la base de donnée", "Ok", {
          duration: 2000,
        });
      }
    });
  }

  protected getAnimalTreatments(animalIndex: number): void {
    this.communicationService.getTreatments(
      this.animalInfos[animalIndex].animal.numAnimal,
      this.animalInfos[animalIndex].animal.numClinique)
      .subscribe((treatments: PrescriptionTreatment[]) => {
        treatments.forEach((treatment: PrescriptionTreatment) => {
          treatment.dateDebut = new Date(treatment.dateDebut);
          treatment.dateFin = new Date(treatment.dateFin);
        });
        this.animalInfos[animalIndex].treatments = treatments;
      });
  }

  protected getAnimalBill(animalIndex: number): void {
    this.communicationService.getBill(
      this.animalInfos[animalIndex].animal.numAnimal,
      this.animalInfos[animalIndex].animal.numClinique)
      .subscribe((bill: Bill) => {
        this.animalInfos[animalIndex].bill = bill;
      });
  }
}
