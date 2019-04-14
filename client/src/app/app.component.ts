import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public route: string;

    public constructor (location: Location, router: Router) {
        router.events.subscribe((val) => {
            this.route = location.path() !== "" ? location.path() : "";
        });
    }
}