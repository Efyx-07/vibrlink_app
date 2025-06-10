# VibrLink

#### _- Partie frontend -_

#### SaaS de génération de fanlinks pour promotion musicale

# • • •

## Description

VibrLink est un SaaS de génération de fanlinks pour sorties musicales, outil promotionnel indispensable pour les artistes. Basé sur l’API Spotify, cette application a été développée selon 3 axes principaux : UX (usage intuitif et agréable car destinée à des utilisateurs non techniques), l’UI design de la page du fanlink généré (page publique partagée sur les réseaux sociaux) et son optimisation SEO (reconnaissance des metabalises par les bots des réseaux sociaux).

## Fonctionnalités

- **Connexion et authentification :** App multi-users. A la connexion, l'utilisateur accède à son dashboard. L'authentification est assurée par un token stocké dans les cookies (httpOnly) et l'accès aux pages autorisé par un middleware qui redirige selon le statut de validité de la session.
- **Création du fanlink :** L'utilisateur renseigne l'url Spotify de la sortie musicale qu'il souhaite promouvoir. A la soumission, cela génère automatiquement les liens Spotify, Deezer et Youtube de sa sortie. Les fanlinks créés sont ensuite affichés sur la page "my-links".
- **Mise à jour du fanlink :** L'app génère automatiquement les 3 liens principaux(Spotify, Deezer, Youtube). L'utilisateur peut, via le "link-editor", ajouter manuellement jusqu'à 9 autres plateformes en renseignant les différentes URL. Il peut également gérer individuellement la visibilité de chaque plateforme.
- **Landing page du fanlink :** La page finale du fanlink est accessible publiquement, avec une URL optimisée (slug de la sortie). Le SEO est optimisé pour le partage sur les réseaux sociaux(miniature, titre et description).
- **Suppression de données :** Un fanlink peut être supprimé individuellement. Le compte utilisateur peut aussi être supprimé (cela entraine la suppression définitive de tous les fanlinks relatifs au compte).
- **Interface :** Entièrement responsive. La landing page du fanlink a 2 designs optimisés (version desktop / version mobile).

## Technologies utilisées

- **Next.js / React :** Pour la création de l’interface utilisateur. Architecture pensée pour la scalabilité et maintenabilité de l'app.
- **TypeScript :** Pour le typage des données.
- **Tanstack-query :** Pour la gestion des états serveurs (fetch et modification des données).
- **Zustand :** Pour la gestion et partage des états clients.
- **TailwindCSS :** Pour le design des composants.
- **Framer motion :** Pour des animations agréables et fluides.
- **Jest / Testing Library :** Pour les tests unitaires et d'intégration.

## Configuration

### Communication avec le backend

La partie frontend détaillée ici communique avec un backend en NodeJs (non partagé ici pour des raisons de confidentialité).

1. Créez un fichier `.env` à la racine du projet avec les URL du backend et du frontend comme suit :
   ```plaintext
   BACKEND_URL=URL DU BACKEND
   NEXT_PUBLIC_APP_URL=URL DU FRONTEND
   ```
2. Assurez-vous que votre fichier `.env` est ignoré par Git. Le fichier .gitignore doit inclure .env pour éviter que la clé ne soit exposée publiquement.

## Installation

1. Clonez le dépôt:
   ```plaintext
   git clone url depot
   ```
2. Accédez au projet:
   ```plaintext
   cd nom projet
   ```
3. Installez les dépendances:
   ```plaintext
   npm install
   ```
4. Lancez le serveur de développement:
   ```plaintext
   npm run dev
   ```
5. Ouvrez votre navigateur et accédez à http://localhost:3000 pour voir l'application en action.

## Tests

Des tests unitaires ont été écrits pour assurer le bon fonctionnement des fonctionnalités critiques de l’application. Pour les exécuter, utilisez la commande suivante:

```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

## Screenshots

1. Interface: Présentation de l'app.

![Screenshot 1](./screenshots/presentation.png)

2. Interface: Accueil du dashboard invitant à la création du compte.

![Screenshot 2](./screenshots/home.png)

3. Interface: Point d'entrée "Créer un nouveau fanlink".

![Screenshot 3](./screenshots/new-link.png)

4. Interface: Liste des fanlinks créés.

![Screenshot 4](./screenshots/my-links.png)

5. Interface: Edition d'un fanlink (modifier url, supprimer plateforme, rendre visible ou invisible une plateforme).

![Screenshot 5](./screenshots/link-editor.png)

6. Interface: Exemple de la page publique à partager (version desktop).

![Screenshot 6](./screenshots/landing-desktop.png)

## Note

Ce dépôt ne concerne que la partie frontend de l'application. Pour fonctionner celle-ci est indissociable de son backend réalisé en NodeJs.

## Démo

L'app est entiérement utilisable est déployée sur Vercel. Suivez le lien pour la tester:
→ <a href="https://vibrlink-app.vercel.app/">VibrLink</a>

##

**Bonne découverte !**

FX.
