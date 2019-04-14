import { Component, OnInit } from "@angular/core";
import { Owner } from "../../../../common/tables/Owner";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-proprietaire",
  templateUrl: "./proprietaire.component.html",
  styleUrls: ["./proprietaire.component.css"]
})
export class ProprietaireComponent implements OnInit {

  protected displayedColumns: string[] = ["numproprietaire", "numclinique", "nom", "adresse", "numtel"];
  protected owners: Owner[];

  public constructor(private readonly communicationService: CommunicationService) {
    this.owners = [];
  }

  public ngOnInit(): void {
    this.communicationService.getAllOwners().subscribe((owners: Owner[]) => {
      this.owners = owners;
    });
  }

}
