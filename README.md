
# Discord Self-Bot - Commande de gestion avec Whitelist

Ce projet contient un **self-bot** Discord qui permet de gérer certaines commandes via une whitelist. Le bot utilise des commandes pour ajouter, retirer et lister des utilisateurs dans une whitelist spécifique pour chaque commande.

> **Avertissement :** Ce projet est un **self-bot** et est **destiné uniquement à des fins éducatives**. L'utilisation de **self-bots** enfreint les [Conditions d'utilisation de Discord](https://discord.com/terms), ce qui peut entraîner la suspension ou la suppression de votre compte Discord. **L'auteur de ce projet n'est en aucun cas responsable des conséquences de son utilisation**.

## Prérequis

Avant de lancer le bot, assurez-vous que vous avez installé les outils suivants :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (le gestionnaire de paquets pour Node.js)

## Installation

1. **Clonez le repository :**

   Si vous n'avez pas déjà le code source du projet, clonez-le avec la commande suivante :

   ```bash
   git clone <url-du-repository>
   cd <nom-du-dossier-du-projet>
   ```

2. **Installez les dépendances :**

   Ouvrez une console ou un terminal dans le dossier du projet et exécutez la commande suivante pour installer toutes les dépendances du projet :

   ```bash
   npm install
   ```

   Si vous ne voulez pas installer les modules manuellement à chaque fois, vous pouvez également utiliser le fichier `start.bat` qui s'assurera que les modules sont installés avant de lancer le bot.

3. **Configurez les variables d'environnement :**

   Créez un fichier `.env` à la racine du projet et ajoutez-y votre token Discord :

   ```
   DISCORD_TOKEN=your-bot-token-here
   ```

   Remplacez `your-bot-token-here` par le token de votre compte Discord. **Ne partagez pas ce token avec d'autres personnes**.

## Lancer le bot

Pour lancer le bot, exécutez le fichier `start.bat` en double-cliquant dessus, ou vous pouvez également lancer le bot manuellement avec la commande suivante :

```bash
npm start
```

Si vous utilisez `start.bat`, le script vérifiera si les modules sont installés, et s'ils ne le sont pas, il les installera automatiquement avant de démarrer le bot.

## Commandes disponibles

### `!whitelist <add|remove|list> <commande> [@user]`

Cette commande permet de gérer la whitelist pour une commande spécifique. Le bot peut ajouter, retirer ou lister les utilisateurs autorisés pour une commande particulière.

#### Actions disponibles :

- `add` : Ajoute un utilisateur à la whitelist de la commande spécifiée.
- `remove` : Retire un utilisateur de la whitelist de la commande spécifiée.
- `list` : Affiche la liste des utilisateurs dans la whitelist pour une commande donnée.

### Autres commandes personnalisées

Le bot peut être configuré pour exécuter d'autres actions comme la gestion des salons vocaux, l'affichage des informations sur l'utilisateur, etc. Consultez le code pour plus de détails sur les commandes disponibles.

## Développement

Si vous souhaitez contribuer ou ajouter de nouvelles fonctionnalités, vous pouvez cloner le repository, créer une branche pour vos modifications, puis soumettre une pull request.

1. Clonez ce repository.
2. Créez une nouvelle branche (`git checkout -b feature-nom-de-la-fonctionnalité`).
3. Apportez vos modifications.
4. Commitez vos changements (`git commit -m 'Ajout de nouvelle fonctionnalité'`).
5. Poussez vos changements (`git push origin feature-nom-de-la-fonctionnalité`).
6. Créez une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Avertissement final :** N'oubliez pas que l'utilisation de self-bots enfreint les conditions d'utilisation de Discord. Utilisez ce code à vos propres risques, et uniquement à des fins éducatives.
```
