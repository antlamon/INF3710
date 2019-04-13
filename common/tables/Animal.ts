export enum ETAT {
    Vivant = "Vivant",
    Decede = "Decede"
}

export interface Animal {
    "numAnimal": string;
    "numProprietaire": string;
    "numClinique": string;
    "nom": string;
    "type": string;
    "description": string;
    "dateNaissance": Date;
    "dateInscription": Date;
    "etat": ETAT;
}
