import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from "../../../common/tables/Animal";
import { Room } from '../../../common/tables/Room';
import { Hotel } from '../../../common/tables/Hotel';

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor (@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.createSchema().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/populateDb",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.populateDb().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/animal/:name",
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getAnimalsLikeName(req.params.name).then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((an: any) => (
                        {
                            numAnimal: an.numAnimal,
                            numProprietaire: an.numProprietaire,
                            numClinique: an.numClinique,
                            nom: an.nom,
                            type: an.type,
                            description: an.description,
                            dateNaissance: an.dateNaissance,
                            dateInscription: an.dateInscription,
                            etat: an.etat
                        }));
                    res.json(animals);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/animal",
            (req: Request, res: Response, next: NextFunction) => {
                const animal: Animal = req.body;
                this.databaseService.createAnimal(animal).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.delete("/animal",
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

        router.put("/animal",
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

        router.get("/treatments",
            (req: Request, res: Response, next: NextFunction) => {
                const numAnimal: string = req.query.numAnimal;
                const numClinique: string = req.query.numClinique;
                this.databaseService.getTreatmentsFromAnimal(numAnimal, numClinique).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get("/anel",
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getHotels().then((result: pg.QueryResult) => {
                    const hotels: Hotel[] = result.rows.map((an: any) => (
                        {
                            hotelno: an.anelno,
                            hotelname: an.anelname,
                            city: an.city
                        }));
                    res.json(hotels);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/anel/anelNo",
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                    const anelPKs: string[] = result.rows.map((row: any) => row.anelno);
                    res.json(anelPKs);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/anel/insert",
            (req: Request, res: Response, next: NextFunction) => {
                const anelNo: string = req.body.anelNo;
                const anelName: string = req.body.anelName;
                const city: string = req.body.city;
                this.databaseService.createHotel(anelNo, anelName, city).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get("/rooms",
            (req: Request, res: Response, next: NextFunction) => {

                // this.databaseService.getRoomFromanel(req.query.anelNo, req.query.roomType, req.query.price)
                this.databaseService.getRoomFromHotelParams(req.query)
                    .then((result: pg.QueryResult) => {
                        const rooms: Room[] = result.rows.map((room: Room) => (
                            {
                                hotelno: room.hotelno,
                                roomno: room.roomno,
                                typeroom: room.typeroom,
                                price: parseFloat(room.price.toString())
                            }));
                        res.json(rooms);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/rooms/insert",
            (req: Request, res: Response, next: NextFunction) => {
                const room: Room = {
                    hotelno: req.body.hotelno,
                    roomno: req.body.roomno,
                    typeroom: req.body.typeroom,
                    price: parseFloat(req.body.price)
                };
                console.log(room);

                this.databaseService.createRoom(room)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
            });

        router.get("/tables/:tableName",
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
