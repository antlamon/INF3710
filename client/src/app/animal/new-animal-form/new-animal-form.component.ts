import { CommunicationService } from "src/app/communication.service";

import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Animal, ETAT } from "../../../../../common/tables/Animal";
import { ClinicSimple } from "../../../../../common/tables/Clinic";
import { OwnerSimple } from "../../../../../common/tables/Owner";

@Component({
  selector: "app-new-animal-form",
  templateUrl: "./new-animal-form.component.html",
  styleUrls: ["./new-animal-form.component.css"]
})
export class NewAnimalFormComponent implements OnInit {
  protected clinics: ClinicSimple[];
  protected owners: OwnerSimple[];
  protected newAnimal: boolean;
  protected readonly clinicForm: FormGroup;
  protected readonly ownerForm: FormGroup;
  protected readonly animalForm: FormGroup;

  public constructor (
    private readonly dialogRef: MatDialogRef<NewAnimalFormComponent>,
    private readonly communicationService: CommunicationService,
    @Inject(MAT_DIALOG_DATA) private readonly data: Animal
  ) {
    this.clinics = [];
    this.owners = [];
    this.newAnimal = !this.data;
    this.clinicForm = new FormGroup({
      clinic: new FormControl(this.data ? this.data.numClinique : "", [Validators.required]),
    });
    if (!this.newAnimal) {
      this.fetchOwners();
    }
    this.ownerForm = new FormGroup({
      owner: new FormControl(this.data ? this.data.numProprietaire : "", [Validators.required]),
    });
    this.animalForm = new FormGroup({
      numAnimal: new FormControl(this.data ? this.data.numAnimal : "", [Validators.required]),
      nom: new FormControl(this.data ? this.data.nom : "", [Validators.required]),
      type: new FormControl(this.data ? this.data.type : "", [Validators.required]),
      description: new FormControl(this.data ? this.data.description : "", [Validators.required]),
      dateNaissance: new FormControl(this.data ? this.data.dateNaissance : "", [Validators.required]),
      dateInscription: new FormControl(this.data ? this.data.dateInscription : new Date(), [Validators.required]),
      etat: new FormControl(this.data ? this.data.etat : ETAT.Vivant, [Validators.required])
    });
  }

  public ngOnInit(): void {
    this.communicationService.getAllClinics().subscribe((clinics: ClinicSimple[]) => {
      for (const clinic of clinics) {
        this.clinics.push(clinic);
      }
    });
  }

  protected fetchOwners(): void {
    this.owners.length = 0;
    if (this.ownerForm) {
      this.ownerForm.controls.owner.patchValue(undefined);
    }
    this.communicationService.getOwnersFromClinic(this.clinicForm.controls.clinic.value)
      .subscribe((owners: OwnerSimple[]) => {
        for (const owner of owners) {
          this.owners.push(owner);
        }
      });
  }

  protected submit(): void {
    if (this.clinicForm.invalid || this.ownerForm.invalid || this.animalForm.invalid) {
      return;
    }

    const animal: Animal = {
      numAnimal: this.animalForm.controls.numAnimal.value,
      numProprietaire: this.ownerForm.controls.owner.value,
      numClinique: this.clinicForm.controls.clinic.value,
      nom: this.animalForm.controls.nom.value,
      type: this.animalForm.controls.type.value,
      description: this.animalForm.controls.description.value,
      dateNaissance: this.animalForm.controls.dateNaissance.value,
      dateInscription: this.animalForm.controls.dateInscription.value,
      etat: this.animalForm.controls.etat.value
    };

    if (this.newAnimal) {
      this.communicationService.postAnimal(animal).subscribe((success: number) => {
        this.dialogRef.close(success);
      });
    } else {
      this.communicationService.putAnimal(animal).subscribe((success) => {
        this.dialogRef.close(animal);
      });
    }
  }
}
