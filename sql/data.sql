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
    'The name3',
    'Une adresse tres longue3',
    '5142222224',
    '1950-06-16',
    'F',
    '123456790',
    200000,
    'Veterinaire'
);

INSERT INTO Clinique VALUES
(
    'C0000',
    '("La rue","la ville","la province","H2R1V1")',
    '5141111111',
    '5141112222',
    'E000'
),
(
    'C0001',
    '("La rue2","la ville","la province","H2R1V1")',
    '5141111112',
    '5141112223',
    'E000'
);

INSERT INTO Embauche VALUES
(
    'E0001',
    'C000'
),
(
    'E0002',
    'C0001'
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
    ,
    1,
    '2019-04-13',
    '2019-04-13'
),
(
    'R0001',
    'A0001',
    'T0000',
    'C0000',
    ,
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
);