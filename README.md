# Initialisation de la base de données
1. Sur *PGAdmin*, ouvrir une base de données
2. Ouvrir l'onglet *Query Tool* de cette base de données
3. Copier le contenu du fichier **bdschema.sql** dans cet onglet
4. Éxecuter la query
5. Copier le contenu du fichier **data.sql** dans cet onglet
6. Éxecuter la query

# Installation de notre application
1. Aller dans le dossier Client
2. Éxécuter la commande `npm install`
3. Aller dans le dossier Server
4. Éxecuter la commande `npm install`

# Configuration de l'application
1. Ouvrier le fichier **database.service.ts**
2. Modifier la propriété `connectionConfig`  de sorte à ce que le `user` et le `password` correspondent à ceux de l'utilisateur utilisé dans l'initialisation de la base de données et que `database` corresponde au nom de la database utilisée.
3. Sauvegarder

# Lancement de l'application
1. Aller dans le dossier Client
2. Éxecuter la commande `npm start`
3. Dans un autre terminal, aller dans le dossier Server
4. Éxecuter la commande `npm start`
5. Tout devrait être fonctionnel