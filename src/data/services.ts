// src/data/services.ts

export const supportIcon  = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M14 42l10-10 12 12-10 10a6 6 0 01-8.49 0 6 6 0 010-8.49z"/>
  <path d="M45 19l-6-6a4 4 0 00-5.66 0l-4 4"/>
</svg> 
`;

export const securityIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 2 L12 12v20c0 13 20 28 20 28s20-15 20-28V12L32 2z"/>
  <path d="M32 22v18" />
</svg>
`;

export const installationIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="32" r="10" />
  <path d="M32 2v8M32 54v8M2 32h8M54 32h8M12 12l5.5 5.5M46.5 46.5l5.5 5.5M12 52l5.5-5.5M46.5 17.5l5.5-5.5"/>
</svg>
`;

export const servicesIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="32" r="30"/>
  <path d="M2 32h60M32 2a58 58 0 010 60"/>
  <path d="M12 12c8 8 8 32 0 40M52 12c-8 8-8 32 0 40"/>
</svg>
`;

export const reseauIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="12" cy="32" r="6"/>
  <circle cx="32" cy="32" r="6"/>
  <circle cx="52" cy="32" r="6"/>
  <path d="M18 32h8M38 32h8"/>
</svg>
`;

export interface ModalSection {
    title: string;
    items: string[];
  }
  

export interface ServiceItem {
    id: string
    title: string
    highlight: string
    description: string
    icon: string
    image: string
    modalSections: ModalSection[];
  }
  
  export const services: ServiceItem[] = [
  {
    // --------------------------------------------------------------------------
    // 1) SUPPORT & MAINTENANCE
    // --------------------------------------------------------------------------
    id: "support",
    title: "Support & maintenance Informatique",
    highlight: "Un service de proximité, réactif et sur mesure",
    description: `
      Que vous soyez un utilisateur à domicile ou une entreprise, bénéficiez d’un accompagnement complet :
      ordinateurs, réseaux, serveurs, imprimantes, WiFi, téléphonie et plus encore.
    `,
    icon: supportIcon,
    image: "/maintenance-logiciel-vdn.avif",
    modalSections: [
      {
        title: "🖥️ Support & maintenance",
        items: [
          "Contrats de support disponibles (mensuels ou à la demande)",
          "Téléassistance rapide (TeamViewer, AnyDesk…)",
          "Support utilisateur : messagerie, bureautique, fichiers, accès distant",
          "Réparation express d’ordinateurs et périphériques",
          "Diagnostic et résolution de pannes matérielles / logicielles",
          "Mise en réseau (LAN, Wi-Fi pro sécurisé)"
        ]
      },
      {
        title: "🔐 Sécurité informatique",
        items: [
          "Mise en place d’antivirus professionnels",
          "Sécurisation de postes et accès (pare-feu, mots de passe)",
          "Maintenance préventive : mises à jour, vérifications de sécurité",
          "Sauvegarde automatique des données d’entreprise",
          "Sensibilisation aux risques cyber"
        ]
      },
      {
        title: "⚙️ Installation & Déploiement",
        items: [
          "Configuration de parc informatique (PC, imprimantes, serveurs, switches…)",
          "Installation Google Workspace & Office 365",
          "Création d’adresses email professionnelles",
          "Installation de NAS (serveur de fichiers)"
        ]
      },
      {
        title: "🌐 Services web de base",
        items: [
          "Création de site vitrine (WordPress, Wix)",
          "Conseils hébergement, nom de domaine, email pro",
          "Référencement local Google Business"
        ]
      },
      {
        title: "📋 Support logiciel métier",
        items: [
          "Utilisation et migration de logiciels métiers (Sage, EBP, caisse…)",
          "Automatisation de tâches (scripts, Excel…)"
        ]
      },
      {
        title: "💡 Services bonus",
        items: [
          "Abonnements mensuels (ex : assistance illimitée + visite mensuelle)",
          "Audit gratuit de votre installation",
          "Pack « démarrage informatique »"
        ]
      },
      {
        title: "✅ Avantages",
        items: [
          "⚡ Réactivité : assistance sous 24h",
          "🧠 Expertise claire et pédagogique",
          "🏠 Flexibilité : distance, domicile ou entreprise",
          "📞 Suivi client, rapport, conseils",
          "🔐 Confidentialité garantie"
        ]
      }
    ]
  },
  
    // --------------------------------------------------------------------------
    // The next sections are ready for you to fill later
    // --------------------------------------------------------------------------
  
    {
      id: "infogerance",
      title: "Infogérance & Conseil IT",
      highlight: "Nous prenons en charge votre système d’information",
      description: "Contrats d’infogérance • Gestion de parc • Supervision • Maintenance préventive",
      icon: securityIcon,
      image: "/istockphoto.jpg",
      modalSections: [] // you will fill this later
    },
  
    {
      id: "cyber",
      title: "Cybersécurité & Protection des Données",
      highlight: "Protège vos systèmes, vos données et votre réputation",
      description: "Solutions de sécurité adaptées à votre structure, conformité RGPD.",
      icon: installationIcon,
      image: "/istockphoto.jpg",
      modalSections: []
    },
  
    {
      id: "telephonie",
      title: "Solutions & Support Téléphonie",
      highlight: "Optimisez vos communications",
      description: "Téléphonie IP / VoIP, installation, gestion, maintenance.",
      icon: servicesIcon,
      image: "/istockphoto.jpg",
      modalSections: []
    },
  
    {
      id: "reseau",
      title: "Administration Systèmes & Réseaux",
      highlight: "Optimisez la connectivité de votre entreprise",
      description: "Installation, migration, sécurisation de réseaux.",
      icon: reseauIcon,
      image: "/istockphoto.jpg",
      modalSections: []
    },
  
    {
      id: "cloud",
      title: "Solutions Cloud & Collaboration",
      highlight: "Accélérez votre transformation numérique",
      description: "Cloud, mobilité, productivité, outils collaboratifs.",
      icon: servicesIcon,
      image: "/istockphoto.jpg",
      modalSections: []
    }
  
  ]