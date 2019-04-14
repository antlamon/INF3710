import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { Bill } from "../../../common/tables/Bill";
import { ClinicSimple } from "../../../common/tables/Clinic";
import { OwnerSimple } from "../../../common/tables/Owner";
import { PrescriptionTreatment } from "../../../common/tables/PrescriptionTraitement";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor (private http: HttpClient) { }

    public postAnimal(animal: Animal): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/animal", animal).pipe(
            catchError(this.handleError<number>("postAnimal"))
        );
    }

    public putAnimal(animal: Animal): Observable<number> {
        return this.http.put<number>(
            this.BASE_URL + "/animal", animal,
            { params: { numClinique: animal.numClinique, numAnimal: animal.numAnimal } }).pipe(
                catchError(this.handleError<number>("putAnimal"))
            );
    }

    public getAnimalsFromName(name: string): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.BASE_URL + `/animal/${name}`).pipe(
            catchError(this.handleError<Animal[]>("getAnimals"))
        );
    }

    public getAnimalsFromPk(numClinique: string, numAnimal: string): Observable<Animal> {
        return this.http.get<Animal>(this.BASE_URL + `/animal`, {params: {numClinique, numAnimal}}).pipe(
            catchError(this.handleError<Animal>("getAnimal"))
        );
    }
    public getBill(numAnimal: string, numClinique: string): Observable<Bill> {
        return this.http.get<Bill>(this.BASE_URL + "/bill", {params: {numAnimal, numClinique}}).pipe(
            catchError(this.handleError<Bill>("getBill"))
        );
    }

    public getTreatments(numAnimal: string, numClinique: string): Observable<PrescriptionTreatment[]> {
        return this.http.get<PrescriptionTreatment[]>(this.BASE_URL + "/treatments", {params: {numAnimal, numClinique}}).pipe(
            catchError(this.handleError<PrescriptionTreatment[]>("getTreatments"))
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

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
