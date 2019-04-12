SET search_path=VetoDB;

INSERT INTO Employe VALUES (
    'E000',
    'The name',
    'Une adresse tres longue',
    '5142222222',
    '1980-06-15',
    'F',
    '123456789',
    20000,
    'Gestionnaire'
);

INSERT INTO Clinique VALUES (
    'C000',
    '("La rue","la ville","la province","H2R1V1")',
    '5141111111',
    '5141112222',
    'E000'
);