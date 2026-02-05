# 🕰️ TimeTravel Agency - Agence de Voyages Temporels de Luxe

Une application web premium présentant une agence fictive de voyages temporels. Conçue avec Next.js, TypeScript, Tailwind CSS et Framer Motion, cette webapp offre une expérience utilisateur sophistiquée avec un chatbot IA alimenté par Gemini.

## ✨ Caractéristiques

### Interface Premium
- **Design dark mode** avec palette charcoal et accents dorés
- **Animations fluides** avec Framer Motion
- **Texture de bruit** pour un rendu luxueux
- **Responsive** - optimisé mobile et desktop

### Sections Principales
- 🏠 **Hero** - Section héro avec fond vidéo et CTA
- 🌍 **Destinations** - 3 cartes interactives avec modals détaillés
  - Paris 1889 (Belle Époque)
  - Crétacé -65M (Mésozoïque)
  - Florence 1504 (Renaissance)
- 💼 **À Propos** - Présentation de l'agence
- 📅 **Réservation** - Formulaire avec validation
- 🤖 **Chatbot IA** - Assistant virtuel Gemini

### Fonctionnalités Avancées
- Navigation sticky avec ancres
- Modals avec contenu structuré (highlights, safety, pricing)
- 3 niveaux de forfaits par destination
- Chatbot IA conversationnel
- Accessibilité clavier (ESC, Enter, Tab)
- Optimisation SEO

## 🛠️ Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **IA**: Google Gemini API
- **Fonts**: Inter, Playfair Display (Google Fonts)

## 📦 Installation

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Installer les dépendances**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configurer les variables d'environnement**
   
   Créez un fichier \`.env.local\` :
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

3. **Obtenir une clé API Gemini**
   - Allez sur [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Créez une clé API gratuite
   - Ajoutez-la dans \`.env.local\` :
   \`\`\`
   GEMINI_API_KEY=votre_clé_api
   \`\`\`

4. **Lancer le serveur de développement**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Ouvrir dans le navigateur**
   
   Visitez [http://localhost:3000](http://localhost:3000)

## 🧪 Tests du Chatbot

Essayez ces questions avec le concierge IA :

1. "Je veux un voyage romantique et élégant, tu conseilles quoi ?"
2. "Quel budget pour Paris 1889 en pack Prestige ?"
3. "Je veux voir des dinosaures mais je suis stressé, c'est dangereux ?"
4. "Florence 1504 : que voir en 2 jours ?"
5. "Quelle destination pour un fan d'histoire de l'art ?"
6. "FAQ : annulation, sécurité, assurance, accompagnement ?"

## 📝 Commandes Disponibles

\`\`\`bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Linter
\`\`\`

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Ajoutez la variable d'environnement \`GEMINI_API_KEY\`
4. Déployez !

L'application sera automatiquement optimisée et déployée.

## 🎨 Personnalisation

### Ajouter des Images
Placez vos images dans \`/public/destinations/\` :
- \`paris-1889.jpg\`
- \`cretaceous.jpg\`
- \`florence-1504.jpg\`

Les images seront automatiquement utilisées par les cartes et modals.

### Ajouter une Vidéo Héro
Ajoutez \`hero.mp4\` dans \`/public/\` et décommentez le code vidéo dans \`components/Hero.tsx\`.

### Modifier les Destinations
Éditez \`lib/destinations.ts\` pour modifier le contenu, les prix, ou ajouter des destinations.

## 🤖 Transparence IA

Cette application utilise :
- **Google Gemini** (gemini-1.5-flash) pour le chatbot
- Instructions système personnalisées pour le rôle de concierge
- Contexte limité à 12 messages pour optimiser les coûts
- Max 350 tokens par réponse

## 📄 Licence

Projet pédagogique - Usage éducatif uniquement.

## 👨‍💻 Crédits

Développé avec ❤️ comme projet de démonstration pour illustrer :
- Les capacités de Next.js 15 et App Router
- L'intégration d'IA conversationnelle
- Les animations web modernes
- Le design premium et accessible

---

**Note**: Cette application est entièrement fictive. Les voyages temporels n'existent pas (encore) ! 🚀
