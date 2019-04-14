import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { Bill } from "../../../common/tables/Bill";
import { PrescriptionTreatment } from "../../../common/tables/PrescriptionTraitement";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor (private http: HttpClient) { }

    public getAnimalsFromName(name: string): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.BASE_URL + `/animal/${name}`).pipe(
            catchError(this.handleError<Animal[]>("getAnimals"))
        );
    }

    public getBill(numAnimal: string, numClinique: string): Observable<Bill> {
        return this.http.get<Bill>(this.BASE_URL + "/bill", {params: {numAnimal, numClinique}}).pipe(
            catchError(this.handleError<Bill>("getBill"))
        );
    }

    public getTreatments(numAnimal: string, numClinique: string): Observable<PrescriptionTreatment> {
        return this.http.get<PrescriptionTreatment>(this.BASE_URL + "/treatments", {params: {numAnimal, numClinique}}).pipe(
            catchError(this.handleError<PrescriptionTreatment>("getTreatments"))
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
