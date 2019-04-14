import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent {
  protected animals: Animal[] = [];
  protected searchInput: FormControl;
  protected submitted: boolean;

  public constructor (public readonly communicationService: CommunicationService) {
    this.searchInput = new FormControl("", [Validators.required]);
    this.submitted = false;
  }

  protected submit(): void {
    if (this.searchInput.invalid) {
      return;
    }
    this.submitted = true;
    this.communicationService.getAnimalsFromName(this.searchInput.value).subscribe((animals: Animal[]) => {
      this.animals = animals;
      console.log(animals);
    })
  }
}
