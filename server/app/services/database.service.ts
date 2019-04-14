import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Animal } from "../../../common/tables/Animal";
import { schema } from "../createSchema";
import { data } from "../populateDB";

@injectable()
export class DatabaseService {

    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "postgres",
        password: "admin",
        port: 5432,
        host: "127.0.0.1",
        keepAlive: true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    /*

    METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {
       this.pool.connect();

       return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`SELECT * FROM VetoDB.${tableName};`);
    }

    public createAnimal(animal: Animal): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            animal.numAnimal,
            animal.numProprietaire,
            animal.numClinique,
            animal.nom,
            animal.type,
            animal.description,
            animal.dateNaissance.toString(),
            animal.dateInscription.toString(),
            animal.etat
        ];

        const queryText: string = `INSERT INTO VetoDB.ANIMAL VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

        return this.pool.query(queryText, values);
    }

    public deleteAnimal(numAnimal: string, numClinique: string): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`DELETE FROM VetoDB.Animal WHERE numAnimal = \'${numAnimal}\' AND numClinique = \'${numClinique}\';`);
    }

    public updateAnimal(numAnimal: string, numClinique: string, newParams: object): Promise<pg.QueryResult> {
        this.pool.connect();
        let query: string = `UPDATE VetoDB.Animal \n`;
        const keys: string[] = Object.keys(newParams);
        if (keys.length > 0) {
            query = query.concat(`SET ${keys[0]} = \'${newParams[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`, ${value} = \'${newParams[value]}\'`);
        }

        query = query.concat(`\nWHERE numAnimal = \'${numAnimal}\' AND numClinique = \'${numClinique}\';`);

        return this.pool.query(query);
    }

    public getTreatmentsFromAnimal(numAnimal: string, numClinique: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const query: string = `
        SELECT * FROM
        vetodb.animal NATURAL JOIN (SELECT p.*, description as descriptionTraitement, cout
                                    FROM vetodb.prescription p NATURAL JOIN vetodb.traitement) AS PT
        WHERE numAnimal = 'A0000' AND numClinique = 'C0000';
        `;

        return this.pool.query(query);
    }

    public async getBill(numAnimal: string, numClinique: string): Promise<object> {
        const result: pg.QueryResult = await this.getTreatmentsFromAnimal(numAnimal, numClinique);

        const animal: Animal = {
            numAnimal: result.rows[0].numanimal,
            numProprietaire: result.rows[0].numproprietaire,
            numClinique: result.rows[0].numclinique,
            nom: result.rows[0].nom,
            description: result.rows[0].description,
            dateInscription: result.rows[0].dateinscription,
            dateNaissance: result.rows[0].datenaissance,
            type: result.rows[0].type,
            etat: result.rows[0].etat,
        };

        const treatments: object[] = [];
        result.rows.forEach((row: any) => {
            treatments.push({
                numTraitement: row.numtraitement,
                quantite: row.quantite,
                prix: row.quantite * row.cout,
            });
        });
        const totalPrice: number = treatments.reduce((price: number, treatment: any) => {
            return price + treatment.prix;
        },                                           0);

        return {animal, treatments, totalPrice};
    }
}
