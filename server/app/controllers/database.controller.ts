import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from "../../../common/tables/Animal";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/createSchema",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.createSchema().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post(
            "/populateDb",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.populateDb().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get(
            "/owners",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getOwners().then((result: pg.QueryResult) => {
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get(
            "/clinics",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getClinics().then((result: pg.QueryResult) => {
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get(
            "/animal/:name",
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getAnimalsLikeName(req.params.name).then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((an: any) => (
                        {
                            numAnimal: an.numanimal,
                            numProprietaire: an.numaroprietaire,
                            numClinique: an.numclinique,
                            nom: an.nom,
                            type: an.type,
                            description: an.description,
                            dateNaissance: an.datenaissance,
                            dateInscription: an.dateinscription,
                            etat: an.etat
                        }));
                    res.json(animals);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post(
            "/animal",
            (req: Request, res: Response, next: NextFunction) => {
                const animal: Animal = req.body;
                this.databaseService.createAnimal(animal).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.delete(
            "/animal",
            (req: Request, res: Response, next: NextFunction) => {
                const numAnimal: string = req.query.numAnimal;
                const numClinique: string = req.query.numClinique;
                this.databaseService.deleteAnimal(numAnimal, numClinique).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.put(
            "/animal",
            (req: Request, res: Response, next: NextFunction) => {
                const numAnimal: string = req.query.numAnimal;
                const numClinique: string = req.query.numClinique;
                this.databaseService.updateAnimal(numAnimal, numClinique, req.body).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get(
            "/treatments",
            (req: Request, res: Response, next: NextFunction) => {
                const numAnimal: string = req.query.numAnimal;
                const numClinique: string = req.query.numClinique;
                this.databaseService.getTreatmentsFromAnimal(numAnimal, numClinique).then((result: pg.QueryResult) => {
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get(
            "/bill",
            (req: Request, res: Response, next: NextFunction) => {
                const numAnimal: string = req.query.numAnimal;
                const numClinique: string = req.query.numClinique;
                this.databaseService.getBill(numAnimal, numClinique).then((bill: object) => {
                    res.json(bill);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get(
            "/tables/:tableName",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
