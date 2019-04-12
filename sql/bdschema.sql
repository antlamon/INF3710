DROP SCHEMA IF EXISTS VetoDB CASCADE;

CREATE SCHEMA VetoDB;

CREATE TYPE VetoDB.sexe AS ENUM('M', 'F');

CREATE TYPE VetoDB.fonction AS ENUM('Gestionnaire', 'Veterinaire', 'Infirmiere', 'Secretaire', 'Personnel entretien');

CREATE TYPE VetoDB.etat AS ENUM('Vivant', 'Decede');

CREATE TYPE VetoDB.adresse AS (
    rue         VARCHAR(20),
    ville       VARCHAR(20),
    province    VARCHAR(20),
    codePostal  CHAR(6)
);

CREATE TABLE IF NOT EXISTS VetoDB.Employe (
    numEmploye          VARCHAR(5)      NOT NULL PRIMARY KEY,
    nom                 VARCHAR(30)     NOT NULL,
    adresse             VARCHAR(40)     NOT NULL,
    numTel              VARCHAR(11)     NOT NULL,
    dateNaissance       DATE            NOT NULL,
    sexe                VetoDB.sexe     NOT NULL,
    nas                 VARCHAR(9)      NOT NULL,
    salaire             NUMERIC(6,0)    NOT NULL    CHECK (salaire > 0),
    fonction            VetoDB.fonction NOT NULL
);

CREATE TABLE IF NOT EXISTS VetoDB.Clinique (
    numClinique         VARCHAR(5)      NOT NULL PRIMARY KEY,
    adresse             VetoDB.adresse  NOT NULL,
    numTel              VARCHAR(11)     NOT NULL,
    numFax              VARCHAR(11)     NOT NULL,
    numGestionnaire     VARCHAR(5)      NOT NULL REFERENCES VetoDB.Employe(numEmploye)
                                        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS VetoDB.Embauche (
    numEmploye          VARCHAR(5)      NOT NULL REFERENCES VetoDB.Employe
                                        ON DELETE CASCADE,
    numClinique         VARCHAR(5)      NOT NULL REFERENCES VetoDB.Clinique
                                        ON DELETE CASCADE,
    PRIMARY KEY(numEmploye, numClinique)
);

CREATE TABLE IF NOT EXISTS VetoDB.Proprietaire (
    numProprietaire     VARCHAR(5)      NOT NULL,
    numClinique         VARCHAR(5)      NOT NULL REFERENCES VetoDB.Clinique
                                        ON DELETE CASCADE,
    nom                 VARCHAR(30)     NOT NULL,
    adresse             VARCHAR(40)     NOT NULL,
    numTel              VARCHAR(11)     NOT NULL,
    PRIMARY KEY (numProprietaire, numClinique)
);

CREATE TABLE IF NOT EXISTS VetoDB.Animal (
    numAnimal           VARCHAR(5)      NOT NULL,
    numProprietaire     VARCHAR(5)      NOT NULL,
    numClinique         VARCHAR(5)      NOT NULL REFERENCES VetoDB.Clinique
                                        ON DELETE CASCADE,
    nom                 VARCHAR(30)     NOT NULL,
    type                VARCHAR(10)     NOT NULL,
    description         VARCHAR         NOT NULL,
    dateNaissance       DATE            NOT NULL,
    dateInscription     DATE            NOT NULL,
    etat                VetoDB.etat     NOT NULL,
    PRIMARY KEY (numAnimal, numClinique),
    FOREIGN KEY (numProprietaire, numClinique) REFERENCES VetoDB.Proprietaire
                                        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VetoDB.Traitement (
    numTraitement       VARCHAR(5)      NOT NULL PRIMARY KEY,
    description         VARCHAR         NOT NULL,
    cout                NUMERIC(5, 2)   NOT NULL
);

CREATE TABLE IF NOT EXISTS VetoDB.Prescription (
    numPrescription     VARCHAR(5)      NOT NULL PRIMARY KEY,
    numAnimal           VARCHAR(5)      NOT NULL,
    numTraitement       VARCHAR(5)      NOT NULL REFERENCES VetoDB.Traitement
                                        ON DELETE RESTRICT,
    numClinique         VARCHAR(5)      NOT NULL REFERENCES VetoDB.Clinique
                                        ON DELETE RESTRICT,
    numExamen           VARCHAR(5),
    quantite            INTEGER         NOT NULL,
    dateDebut           DATE            NOT NULL,
    dateFin             DATE            NOT NULL,
    FOREIGN KEY (numAnimal, numClinique) REFERENCES VetoDB.Animal
);

CREATE TABLE IF NOT EXISTS VetoDB.Examen (
    numPrescription     VARCHAR(5)      NOT NULL PRIMARY KEY,
    numVeterinaire      VARCHAR(5)      NOT NULL REFERENCES VetoDB.Employe(numEmploye)
                                        ON DELETE RESTRICT,
    heure               TIME            NOT NULL,
    description         VARCHAR         NOT NULL,
    FOREIGN KEY (numPrescription) REFERENCES VetoDB.Prescription
);

ALTER TABLE VetoDB.Prescription
ADD CONSTRAINT examRef FOREIGN KEY (numExamen) REFERENCES VetoDB.Examen(numPrescription) ON DELETE RESTRICT;

/* TODO : Ajout trigger gestionnaire + Veterinaire*/
CREATE OR REPLACE FUNCTION processValGest() RETURNS TRIGGER AS $valGest$
    BEGIN
        IF (TG_OP = 'UPDATE') THEN
            RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            RETURN NEW;
        END IF;
        RETURN NULL;
    END;
$valGest$ LANGUAGE plpgsql;

CREATE TRIGGER valGest
    AFTER INSERT OR UPDATE ON VetoDB.Clinique
    FOR EACH ROW EXECUTE PROCEDURE processValGest();