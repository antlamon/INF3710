import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { ClinicSimple } from "../../../common/tables/Clinic";
import { OwnerSimple } from "../../../common/tables/Owner";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor (private http: HttpClient) { }

    public getAnimalsFromName(name: string): Observable<Animal[]> {
        console.log("sending");
        return this.http.get<Animal[]>(this.BASE_URL + `/animal/${name}`).pipe(
            catchError(this.handleError<Animal[]>("getAnimals"))
        );
    }

    public getAllClinics(): Observable<ClinicSimple[]> {
        return this.http.get<ClinicSimple[]>(this.BASE_URL + `/clinics`).pipe(
            catchError(this.handleError<ClinicSimple[]>("getClinics"))
        );
    }

    public getOwnersFromClinic(numClinique: string): Observable<OwnerSimple[]> {
        return this.http.get<OwnerSimple[]>(this.BASE_URL + `/owners`, { params: { numClinique } }).pipe(
            catchError(this.handleError<OwnerSimple[]>("getClinics"))
        );
    }
    public getBill(numAnimal: string, numClinique: string): Observable<object> {
        return this.http.get<object>(this.BASE_URL + "/bill", { params: { numAnimal, numClinique } }).pipe(
            catchError(this.handleError<object>("getBill"))
        );
    }

    public getTreatments(numAnimal: string, numClinique: string): Observable<object> {
        return this.http.get<object>(this.BASE_URL + "/treatments", { params: { numAnimal, numClinique } }).pipe(
            catchError(this.handleError<object>("getTreatments"))
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
