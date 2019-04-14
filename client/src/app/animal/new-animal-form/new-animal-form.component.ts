import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-new-animal-form",
  templateUrl: "./new-animal-form.component.html",
  styleUrls: ["./new-animal-form.component.css"]
})
export class NewAnimalFormComponent implements OnInit {
  protected readonly animalForm: FormGroup;

  public constructor (public dialogRef: MatDialogRef<NewAnimalFormComponent>) {
    this.animalForm = new FormGroup({
      clinique: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
  }

  protected submit(): void {
    console.log(this.animalForm.controls.clinique.value)
  }

}
