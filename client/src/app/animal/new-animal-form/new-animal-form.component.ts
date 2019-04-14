import { CommunicationService } from "src/app/communication.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

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
  protected readonly clinicForm: FormGroup;
  protected readonly ownerForm: FormGroup;
  protected readonly animalForm: FormGroup;

  public constructor (
    private readonly dialogRef: MatDialogRef<NewAnimalFormComponent>,
    private readonly communicationService: CommunicationService
  ) {
    this.clinicForm = new FormGroup({
      clinic: new FormControl("", [Validators.required]),
    });
    this.ownerForm = new FormGroup({
      owner: new FormControl("", [Validators.required]),
    });
    this.animalForm = new FormGroup({
      numAnimal: new FormControl("", [Validators.required]),
      nom: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      dateNaissance: new FormControl("", [Validators.required]),
      etat: new FormControl("", [Validators.required]),
    });
    this.clinics = [];
    this.owners = [];
  }

  public ngOnInit(): void {
    this.communicationService.getAllClinics().subscribe((clinics: ClinicSimple[]) => {
      for (const clinic of clinics) {
        this.clinics.push(clinic);
      }
    });
  }

  protected fetchOwners(): void {
    this.communicationService.getOwnersFromClinic(this.clinicForm.controls.clinic.value)
      .subscribe((owners: OwnerSimple[]) => {
        this.owners.length = 0;
        this.ownerForm.controls.owner.patchValue(undefined);
        for (const owner of owners) {
          this.owners.push(owner);
        }
      });
  }

  protected submit(): void {
    console.log(this.animalForm.valid);
    console.log(this.clinicForm.controls.clinic.value);
    console.log(this.ownerForm.controls.owner.value);
    console.log(this.animalForm.controls.numAnimal.value);
    console.log(this.animalForm.controls.nom.value);
    console.log(this.animalForm.controls.type.value);
    console.log(this.animalForm.controls.description.value);
    console.log(this.animalForm.controls.dateNaissance.value);
    console.log(this.animalForm.controls.etat.value);
    this.dialogRef.close();
  }

}
