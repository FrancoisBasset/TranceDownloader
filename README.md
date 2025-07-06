# TranceDownloader

TranceDownloader est une application Node.js et Vue 3 permettant de constituer facilement une bibliothèque de morceaux de trance récupérés sur YouTube.

## Fonctionnalités

- Recherche de vidéos sur YouTube et téléchargement de la piste audio au format MP3.
- Attribution automatique des tags ID3 (artiste, titre et genre) et renommage cohérent du fichier.
- Gestion d'une liste de souhaits pour retrouver les morceaux que vous souhaitez télécharger plus tard.
- Génération d'un fichier `library.json` recensant les titres présents dans votre collection.
- Récupération des genres et artistes depuis [EveryNoise](https://everynoise.com/) pour explorer de nouveaux sons.
- Interface front-end développée avec Vue 3, Pinia et Tailwind CSS.

## Installation

1. Clonez ce dépôt et installez les dépendances :

```bash
npm install
```

2. Assurez-vous que l'utilitaire `ffmpeg` est disponible sur votre machine.

3. Définissez les variables d'environnement nécessaires dans un fichier `.env` (voir l'exemple fourni) : le port d'écoute (`PORT`) et le répertoire de musique (`MUSIC_DIR`).

## Utilisation

### Lancer le back‑end

```bash
npm start
```

### Développement du front

```bash
npm run dev
```

### Construction pour la production

```bash
npm run build
```

### Prévisualisation du build

```bash
npm run preview
```

### Nettoyage du projet

```bash
npm run clean
```

### Formattage du code

```bash
npm run format
```

Une fois l'application lancée, accédez à `http://<HOST>:<PORT>` pour gérer votre bibliothèque de musique.
