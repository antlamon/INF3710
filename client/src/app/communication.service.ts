import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor (private http: HttpClient) { }

    public getAnimalsFromName(name: string): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.BASE_URL + `/animal/${name}`).pipe(
            catchError(this.handleError<Animal[]>("getAnimals"))
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
