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
      description: "Confiez-nous la gestion partielle ou totale de votre système d'information, et concentrez-vous sur l’essentiel : votre activité.",
      icon: securityIcon,
      image: "/infogerance.avif",
      modalSections: [
        {
          title: "🔧 Maintenance préventive & corrective",
          items: [
            "Surveillance proactive 24/7 des postes, serveurs et réseaux",
            "Intervention à distance ou sur site en cas d’incident",
            "Mises à jour régulières des logiciels et systèmes d’exploitation",
            "Réduction des risques de pannes grâce aux contrôles préventifs"
          ]
        },
        {
          title: "🖥️ Administration des postes et serveurs",
          items: [
            "Gestion des comptes utilisateurs et des droits d’accès",
            "Administration des messageries professionnelles",
            "Supervision de serveurs Windows et Linux",
            "Gestion de l’infrastructure virtualisée",
            "Optimisation des performances et de la disponibilité des services"
          ]
        },
        {
          title: "🛡️ Sécurité informatique",
          items: [
            "Déploiement de politiques de sécurité (pare-feu, antivirus, antispam)",
            "Mise en place de sauvegardes automatisées locales et externalisées",
            "Audits de vulnérabilité et conformité RGPD",
            "Protection des données et plan de reprise après sinistre"
          ]
        },
        {
          title: "🌐 Gestion réseau & connectivité",
          items: [
            "Supervision des connexions internet, VPN et accès distants",
            "Configuration de routeurs, bornes Wi-Fi et switches",
            "Diagnostic et résolution des problèmes de réseau",
            "Optimisation de la stabilité et de la performance réseau"
          ]
        },
        {
          title: "📊 Suivi & reporting",
          items: [
            "Tableau de bord complet de votre infrastructure",
            "Rapports mensuels : performances, incidents, interventions",
            "Recommandations d’amélioration continue",
            "Visibilité totale sur vos équipements et leur état"
          ]
        },
        {
          title: "👥 À qui s’adresse notre service ?",
          items: [
            "TPE / PME : gestion complète ou partielle du parc informatique",
            "Professions libérales : environnement sécurisé et fiable",
            "Associations / collectivités : infrastructure optimisée et encadrée",
            "Bureaux multisites : solutions cloud et synchronisation"
          ]
        },
        {
          title: "📁 Contrats & support",
          items: [
            "Contrats flexibles : à l’heure, au forfait ou en abonnement mensuel",
            "Support dédié avec accès prioritaire",
            "Accompagnement personnalisé selon vos besoins"
          ]
        },
        {
          title: "🌍 Zone d’intervention",
          items: [
            "Basés à Lyon, interventions partout en France",
            "Prestations sur site ou à distance selon vos besoins"
          ]
        }
      ]
      
    },
  
    {
      id: "cyber",
      title: "Cybersécurité & Protection des Données",
      highlight: "Protège vos systèmes, vos données et votre réputation",
      description: "Solutions de sécurité adaptées à votre structure, conformité RGPD.",
      icon: installationIcon,
      image: "/cyber.avif",
      modalSections: [
        {
          title: "🛡️ Nos services clés",
          items: [
            "Audit complet de sécurité et diagnostic des vulnérabilités",
            "Sécurisation des postes et réseaux (antivirus pro, pare-feu, filtrage web)",
            "Sauvegardes automatiques locales et cloud",
            "Mise en place de VPN et double authentification (MFA)",
            "Sensibilisation des utilisateurs : formations anti-phishing",
            "Accompagnement à la conformité RGPD"
          ]
        },
        {
          title: "🧪 Audit de sécurité & évaluation des risques",
          items: [
            "Identification des vulnérabilités systèmes et réseau",
            "Cartographie des données sensibles et zones critiques",
            "Recommandations techniques et organisationnelles",
            "Analyse des risques internes et externes"
          ]
        },
        {
          title: "🖥️ Sécurisation des postes & serveurs",
          items: [
            "Installation et gestion de solutions antivirus / anti-malware professionnelles",
            "Configuration de pare-feux logiciels et matériels",
            "Contrôle des accès administrateurs et segmentation des droits",
            "Durcissement des postes (hardening) et bonnes pratiques"
          ]
        },
        {
          title: "🌐 Sécurisation réseau & connexions",
          items: [
            "Déploiement de VPN chiffrés pour le télétravail",
            "Configuration de pare-feux professionnels (Ubiquiti, Fortinet, pfSense…)",
            "Segmentation réseau (VLAN) et filtrage web",
            "Détection et prévention d’intrusions (IDS/IPS)"
          ]
        },
        {
          title: "💾 Sauvegardes & reprise après sinistre",
          items: [
            "Sauvegardes automatiques locales, cloud ou hybrides",
            "Test de restauration et plans PRA / PCA",
            "Gestion des versions et protection contre les ransomwares",
            "Surveillance des sauvegardes et alertes en temps réel"
          ]
        },
        {
          title: "👨‍💻 Formation & sensibilisation",
          items: [
            "Formations à la sécurité informatique (anti-phishing, mots de passe, bonnes pratiques)",
            "Simulations de phishing et analyse des comportements",
            "Création de chartes de bonne conduite informatique",
            "Amélioration de la culture cyber au sein de l’entreprise"
          ]
        },
        {
          title: "📜 Conformité RGPD & protection des données",
          items: [
            "Évaluation de conformité RGPD : collecte, traitement, stockage",
            "Mise en place de politiques internes de confidentialité",
            "Aide à la documentation et tenue des registres obligatoires",
            "Conseils sur la protection des données sensibles"
          ]
        }
      ]
      
    },
  
    {
      id: "telephonie",
      title: "Solutions & Support Téléphonie",
      highlight: "Optimisez vos communications",
      description: "Téléphonie IP / VoIP, installation, gestion, maintenance.",
      icon: servicesIcon,
      image: "/telephonie.avif",
      modalSections: [
        {
          title: "📞 Téléphonie IP & VoIP pour entreprises",
          items: [
            "Mise en place de solutions VoIP adaptées à votre structure",
            "Installation et configuration de PABX, IPBX, Centrex et softphones",
            "Numéros géographiques, SVI, files d’attente et messagerie vocale",
            "Intégration avec Microsoft Teams, Zoom et Google Meet"
          ]
        },
        {
          title: "🏢 Standard téléphonique (physique ou virtuel)",
          items: [
            "Déploiement de standards téléphoniques professionnels",
            "Gestion des appels entrants et sortants (transfert, conférence, renvoi…)",
            "Standard virtuel hébergé : idéal télétravail et sites multiples",
            "Fonctionnalités avancées : musique d’attente, message d’accueil, routage intelligent"
          ]
        },
        {
          title: "🛠️ Support & maintenance téléphonie",
          items: [
            "Assistance technique téléphonique et à distance",
            "Dépannage rapide en cas de panne",
            "Maintenance préventive et corrective",
            "Gestion des mises à jour et de la sécurité de la solution téléphonique"
          ]
        },
        {
          title: "📊 Conseil & gestion de projet télécom",
          items: [
            "Audit complet de vos besoins téléphoniques",
            "Conseil sur les meilleures solutions (matériel, logiciels, abonnements)",
            "Migration vers la VoIP ou modernisation de votre solution existante",
            "Formation des utilisateurs et accompagnement au changement"
          ]
        },
        {
          title: "⚙️ Optimisation & gestion avancée",
          items: [
            "Optimisation de votre infrastructure téléphonique",
            "Gestion MDM / appareils mobiles",
            "Gestion via Microsoft Intune",
            "Amélioration continue et suivi des performances"
          ]
        }
      ]
      
    },
  
    {
      id: "reseau",
      title: "Administration Systèmes & Réseaux",
      highlight: "Optimisez la connectivité de votre entreprise",
      description: "Installation, migration, sécurisation de réseaux.",
      icon: reseauIcon,
      image: "/network.avif",
      modalSections: [
        {
          title: "🖥️ Administration systèmes",
          items: [
            "Installation, configuration et maintenance de serveurs (Linux, Windows, VMware)",
            "Gestion des utilisateurs et des droits d’accès (AD, LDAP, Azure AD, GPO)",
            "Supervision et monitoring (Zabbix, Centreon, Nagios)",
            "Automatisation de tâches (scripts Bash / Python)",
            "Sauvegardes et restauration avec Veeam, Acronis"
          ]
        },
        {
          title: "🌐 Administration réseaux",
          items: [
            "Gestion et sécurisation des réseaux LAN, WAN et VPN",
            "Installation et configuration de routeurs, switches et firewalls (Cisco, Fortinet, Ubiquiti)",
            "Mise en place de réseaux Wi-Fi sécurisés pour entreprises",
            "Optimisation des performances réseau",
            "Supervision réseau en temps réel"
          ]
        },
        {
          title: "🛡️ Sécurité informatique",
          items: [
            "Audit de sécurité et tests de vulnérabilité",
            "Déploiement d'antivirus, anti-malware et solutions EDR",
            "Gestion complète des pare-feux et VPN",
            "Sauvegardes chiffrées et mise en place de PRA / PCA"
          ]
        },
        {
          title: "☁️ Cloud & virtualisation",
          items: [
            "Solutions cloud : Microsoft 365, Azure, AWS",
            "Virtualisation : VMware, Hyper-V, Proxmox",
            "Hébergement sécurisé des données et applications",
            "Migration vers le cloud ou environnements hybrides"
          ]
        },
        {
          title: "⭐ Pourquoi nous choisir ?",
          items: [
            "Expertise certifiée : plus de 10 ans d’expérience en administration IT",
            "Support réactif et disponible 24/7 selon contrat",
            "Sécurité renforcée contre les menaces modernes",
            "Accompagnement sur mesure, adapté à votre budget et vos besoins"
          ]
        }
      ]
      
    },
  
    {
      id: "cloud",
      title: "Solutions Cloud & Collaboration",
      highlight: "Accélérez votre transformation numérique",
      description: "Cloud, mobilité, productivité, outils collaboratifs.",
      icon: servicesIcon,
      image: "/cloud.avif",
      modalSections: [
        {
          title: "🌐 Solutions cloud & collaboratives",
          items: [
            "Installation, migration et gestion Microsoft 365 / Google Workspace / Azure AD",
            "Configuration de comptes, boîtes mail professionnelles et partages",
            "Synchronisation multi-appareils et sécurisation des accès",
            "Gestion des licences et optimisation des abonnements"
          ]
        },
        {
          title: "📂 Stockage & partage de fichiers",
          items: [
            "Solutions de stockage cloud sécurisé (OneDrive, Google Drive, Dropbox, Synology Drive)",
            "Organisation des dossiers et gestion des droits d’accès",
            "Coédition en temps réel et collaboration simplifiée",
            "Sauvegardes journalières : cloud, local ou hybride"
          ]
        },
        {
          title: "🧑‍🤝‍🧑 Collaboration & télétravail",
          items: [
            "Installation et paramétrage de Teams, Google Meet, Zoom, Slack, SharePoint",
            "Création de groupes, canaux et espaces de travail collaboratifs",
            "Intégration d’outils tiers dans vos environnements cloud",
            "Formation des utilisateurs aux outils collaboratifs"
          ]
        },
        {
          title: "🧠 Cloud privé & cloud hybride",
          items: [
            "Déploiement de solutions cloud privé (NAS, serveurs hébergés)",
            "Accès à distance sécurisé via VPN ou RDP",
            "Mise en place d’architectures cloud hybrides",
            "Synchronisation entre données locales et cloud"
          ]
        },
        {
          title: "🔒 Sécurité & conformité",
          items: [
            "Authentification multifacteur (MFA) et gestion des identités",
            "Chiffrement et contrôle avancé des accès",
            "Protection des données dans le cloud",
            "Conformité RGPD et archivage légal des emails"
          ]
        }
      ]
      
    }
  
  ]