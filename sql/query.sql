SET search_path = VetoDb;

/* 1) Lister les le numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le
numéro de clinique. */
SELECT numClinique, nom, adresse, numGestionnaire
FROM Clinique
ORDER BY numClinique;

/* 2) Lister les noms des animaux sans doublons dans toutes les cliniques. */
SELECT DISTINCT nom
FROM Animal;

/* 3) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs
animaux dans une clinique donnée (à vous de la choisir). */
SELECT a.*, p.nom AS nomProprietaire
FROM Animal AS A JOIN Proprietaire AS p ON a.numClinique = p.numClinique AND a.numProprietaire = p.numProprietaire
WHERE a.numClinique = 'C0000';

/* 4) Lister l’ensemble des examens d’un animal donné. */
SELECT *
FROM Examen NATURAL JOIN Prescription
WHERE numClinique = 'C0000' AND numAnimal = 'A0000';

/* 5) Lister le détail des traitements d’un animal suite à un examen donné. */
SELECT *
FROM Prescription NATURAL JOIN Traitement
WHERE numExamen = 'R0000';

/* 6) Lister le salaire total des employés par clinique ordonné par numéro de clinique. */
SELECT numClinique, SUM(salaire) AS salaireTotal
FROM Employe NATURAL JOIN Embauche
GROUP BY numClinique
ORDER BY numClinique;

/* 7) Lister le nombre total d’animaux d’un type donné (vous pouvez le choisir) dans chaque
clinique. */
SELECT Clinique.numClinique, COUNT(type)
FROM Clinique LEFT JOIN (SELECT * FROM Animal WHERE type='Chat') As Chat ON Clinique.numClinique = Chat.numClinique
GROUP BY Clinique.numClinique;

/* 8) Lister le coût minimum, maximum et moyen des traitements. */
SELECT MIN(cout) AS coutMin, MAX(cout) AS coutMax, AVG(cout) AS coutMoyen
FROM Traitement;

/* 9) Quels sont les noms des employés de plus de 50 ans ordonnés par nom ? */
SELECT nom
FROM Employe
WHERE EXTRACT(YEAR FROM AGE(dateNaissance)) > 50
ORDER BY nom;

/* 10) Quels sont les propriétaires dont le nom contient « blay » ? */
SELECT *
FROM Proprietaire
WHERE nom LIKE '%blay%';

/* 11) Supprimez le vétérinaire « Jean Tremblay ». */
DELETE
FROM Employe
WHERE fonction = 'Veterinaire' AND nom = 'Jean Tremblay';

/* 12) Lister les détails des propriétaires qui ont un chat et un chien. */
SELECT DISTINCT p.*
FROM Proprietaire AS p JOIN (
SELECT numClinique, numProprietaire FROM Animal WHERE type = 'Chat'
INTERSECT
SELECT numClinique, numProprietaire FROM Animal WHERE type = 'Chien'
) AS c ON p.numClinique = c.numClinique AND p.numProprietaire = c.numProprietaire; 

/* 13) Lister les détails des propriétaires qui ont un chat ou un chien. */
SELECT DISTINCT *
FROM Proprietaire AS p JOIN (
SELECT numClinique, numProprietaire FROM Animal WHERE type = 'Chat' OR type = 'Chien'
) AS c ON p.numClinique = c.numClinique AND p.numProprietaire = c.numProprietaire; 

/* 14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la
grippe (la condition vacciné contre la grippe ne s’applique qu’aux chiens). */
SELECT DISTINCT p.*
FROM Proprietaire AS p JOIN (
SELECT numClinique, numProprietaire FROM Animal WHERE type = 'Chat'
EXCEPT
SELECT a.numClinique, numProprietaire FROM Animal AS a, Examen AS e, (SELECT * FROM Prescription WHERE numTraitement = 'T0112') AS g
WHERE a.type = 'Chien' AND a.numClinique = g.numClinique AND a.numAnimal = g.numAnimal AND e.numPrescription = g.numExamen
) AS c ON p.numClinique = c.numClinique AND p.numProprietaire = c.numProprietaire; 

/* 15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le
cas contraire, affichez null. */
SELECT *
FROM Animal LEFT JOIN Prescription NATURAL LEFT JOIN Examen JOIN Traitement
ON Traitement.numTraitement = Prescription.numTraitement
ON Animal.numAnimal = Prescription.numAnimal AND Animal.numClinique = Prescription.numClinique
WHERE Animal.numClinique = 'C0000';
