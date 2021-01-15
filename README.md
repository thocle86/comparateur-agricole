# HACKATHON COMPARATEUR AGRICOLE

## Du 13 au 15 janvier 2021

## Créer une carte communautaire à destination des agriculteurs ComparateurAgricole.com

## Objectif principal :
### Réaliser une application web sur un fond de carte avec des points anonymisés représentant chacun de nos agriculteurs.

**Cahier des charges** :

* L'expérience utilisateur doit être votre leitmotiv, l’UI doit être pensée en mobile-first et adaptée pour tablette et desktop.
* Les points doivent être anonymisés, à vous de trouver comment rendre cela attrayant quand même.
* Imaginez une carte évolutive (cf objectifs secondaires), la carte doit pouvoir être enrichie avec d’autres informations.
* Le site doit être sous le format fond de carte full page et devrait pouvoir être intégré sur une page du site ComparateurAgricole.com
* Hébergez le code source sur un repo github publique et mettre le lien dans votre channel discord.

## Objectifs secondaires :

* Agréger des données et afficher des statistiques à l’utilisateur comme par exemple :

    * Est-ce que l’agriculteur est client ?
    * Quelle est le prix de vente moyen par production et par agriculteur ?
    * Quelle est le prix de vente moyen par production ?
    * Quelle est la surface de culture moyenne par département ? 
    * …

* Afficher plus de points :

    * Les locaux de ComparateurAgricole.com (nous sommes à Chartres).
    * Les acheteurs.

* Vous avez d’autres idées ? Laissez parler votre imagination, c’est ce que l’on veut !

## Jeux de données (.csv) :

Les différentes données peuvent avoir des liens entre elles, ceux-ci se feront toujours via les champs id.

* Liste des acheteurs : une liste de 8 acheteurs réels avec lesquels nous travaillons.
* Liste des villes : une base de donnée des villes de France métropolitaine avec coordonnées GPS.
* Liste des agriculteurs : une liste d’agriculteurs (utilisateurs ComparateurAgricole.com). (farm_size = surface de la ferme / surface cultivée)
* Liste des produits : une liste de 23 produits faisant partie de notre catalogue produit.
* Liste des transactions : une liste de transactions (pour rappel un agriculteur vend sa récolte à un acheteur). La quantité est toujours exprimée en Tonne (T) et le prix en euros par Tonne (€/T).