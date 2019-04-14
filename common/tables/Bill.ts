export interface Bill {
    totalPrice: number;
    treatments: Treatment[];
}

export interface Treatment {
    numTraitement: string;
    quantite: string;
    prix: number;
}