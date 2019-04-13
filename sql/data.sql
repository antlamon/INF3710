SET search_path=VetoDB;

INSERT INTO Employe VALUES
(
    'E0000',
    'The name',
    'Une adresse tres longue',
    '5142222222',
    '1980-06-15',
    'F',
    '123456789',
    20000,
    'Gestionnaire'
),
(
    'E0001',
    'The name2',
    'Une adresse tres longue2',
    '5142222223',
    '1980-06-16',
    'M',
    '123456780',
    200000,
    'Veterinaire'
),
(
    'E0002',
    'The name3',
    'Une adresse tres longue3',
    '5142222224',
    '1950-06-16',
    'F',
    '123456790',
    200000,
    'Veterinaire'
),
(
    'E0003',
    'The name4',
    'Une adresse tres longue4',
    '5142222225',
    '1960-06-16',
    'M',
    '123459790',
    20000,
    'Secretaire'
),
(
    'E0004',
    'The name5',
    'Une adresse tres longue5',
    '5142222226',
    '1975-06-16',
    'M',
    '133459790',
    70000,
    'Gestionnaire'
),
(
    'E0005',
    'The name6',
    'Une adresse tres longue5',
    '5142222226',
    '1980-06-16',
    'M',
    '135459790',
    70000,
    'Personnel entretien'
),
(
    'E0006',
    'The name7',
    'Une adresse tres longue7',
    '5142222726',
    '1990-06-16',
    'F',
    '135457790',
    200000,
    'Veterinaire'
),
(
    'E0007',
    'Jean Tremblay',
    'Une adresse tres longue8',
    '5142522726',
    '1990-06-16',
    'M',
    '136457790',
    200000,
    'Veterinaire'
);

INSERT INTO Clinique VALUES
(
    'C0000',
    '("La rue","la ville","la province","H2R1V1")',
    'Uno',
    '5141111111',
    '5141112222',
    'E0000'
),
(
    'C0001',
    '("La rue2","la ville","la province","H2R1V1")',
    'Dos',
    '5141111112',
    '5141112223',
    'E0000'
),
(
    'C0002',
    '("La rue3","la ville","la province","H2R1V1")',
    'Tres',
    '5141112112',
    '5141212223',
    'E0004'
);

INSERT INTO Embauche VALUES
(
    'E0001',
    'C0000'
),
(
    'E0002',
    'C0001'
),
(
    'E0003',
    'C0001'
),
(
    'E0005',
    'C0002'
),
(
    'E0006',
    'C0002'
),
(
    'E0000',
    'C0000'
),
(
    'E0000',
    'C0001'
),
(
    'E0004',
    'C0002'
);

INSERT INTO Proprietaire VALUES
(
    'P0000',
    'C0000',
    'Proprietaire Malsaint',
    '11 rue des chatons',
    '4504192252'
),
(
    'P0001',
    'C0000',
    'Proprietaire Propre',
    '11 rue des chiens',
    '4504193333'
),
(
    'P0000',
    'C0001',
    'Pas original',
    '11 rue des rats',
    '4504194333'
),
(
    'P0000',
    'C0002',
    'Un nom où blay est inclus',
    '11 rue des crocodile',
    '4504294333'
);

INSERT INTO Animal VALUES
(
    'A0000',
    'P0000',
    'C0000',
    'Boulette troisiere du nom',
    'Chat',
    'Chat incompetent qui ne fait que dormir dans le salon. Il aime bien la lasagne',
    '2000-01-01',
    '2019-04-13',
    'Vivant'
),
(
    'A0001',
    'P0001',
    'C0000',
    'Monsieur Roi',
    'Chien',
    'Hes a good boy',
    '2000-05-08',
    '2019-04-12',
    'Vivant'
),
(
    'A0002',
    'P0001',
    'C0000',
    'Monsieur nouille',
    'Chat',
    'Not a good boy',
    '2000-01-01',
    '2019-04-12',
    'Vivant'
),
(
    'A0000',
    'P0000',
    'C0001',
    'Bella',
    'Rat',
    'Rat numéro 1',
    '2000-05-08',
    '2019-04-12',
    'Vivant'
),
(
    'A0001',
    'P0000',
    'C0001',
    'Bella',
    'Rat',
    'Rat numéro 2',
    '2000-05-08',
    '2019-04-12',
    'Vivant'
),
(
    'A0000',
    'P0000',
    'C0002',
    'Miaou',
    'Chat',
    'Très indépendant',
    '2000-05-08',
    '2019-04-12',
    'Vivant'
),
(
    'A0001',
    'P0000',
    'C0002',
    'Wouf',
    'Chien',
    'Stupide',
    '2000-05-08',
    '2019-04-12',
    'Vivant'
);

INSERT INTO Traitement VALUES
(
    'T0000',
    'Examen',
    20.00
),
(
    'T0110',
    'Traitement à la Pénicilline',
    50.00
),
(
    'T0112',
    'Vaccination contre la grippe',
    70.00
);

INSERT INTO Prescription VALUES
(
    'R0000',
    'A0000',
    'T0000',
    'C0000',
    NULL,
    1,
    '2019-04-13',
    '2019-04-13'
),
(
    'R0001',
    'A0001',
    'T0000',
    'C0000',
    NULL,
    1,
    '2019-04-13',
    '2019-04-13'
),
(
    'R0004',
    'A0000',
    'T0000',
    'C0002',
    NULL,
    1,
    '2019-04-13',
    '2019-04-13'
),
(
    'R0005',
    'A0001',
    'T0000',
    'C0002',
    NULL,
    1,
    '2019-04-13',
    '2019-04-13'
);

INSERT INTO Examen VALUES
(
    'R0000',
    'E0001',
    '12:00',
    'Examen annuel'
), 
(    
    'R0001',
    'E0002',
    '12:00',
    'Examen annuel'
), 
(    
    'R0004',
    'E0006',
    '12:00',
    'Examen annuel'
), 
(    
    'R0005',
    'E0006',
    '12:00',
    'Examen annuel'
);

INSERT INTO Prescription VALUES
(
    'R0002',
    'A0000',
    'T0110',
    'C0000',
    'R0000',
    2,
    '2019-04-13',
    '2019-04-20'
),
(
    'R0003',
    'A0000',
    'T0112',
    'C0000',
    'R0000',
    1,
    '2019-04-13',
    '2019-04-17'
),
(
    'R0006',
    'A0000',
    'T0112',
    'C0002',
    'R0004',
    1,
    '2019-04-14',
    '2019-04-14'
),
(
    'R0007',
    'A0001',
    'T0112',
    'C0002',
    'R0005',
    1,
    '2019-04-14',
    '2019-04-14'
);
