export interface OwnerSimple {
    "numproprietaire": string;
    "nom": string;
}

export interface Owner extends OwnerSimple{
    "numclinique": string;
    "adresse": string;
    "numtel": string;
}