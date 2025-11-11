// /src/data/sections.ts
import WrenchIcon from '@/assets/icons/wrench.svg'
import BoxIcon from '@/assets/icons/box.svg'
import CloudIcon from '@/assets/icons/cloud.svg'
import MobileIcon from '@/assets/icons/mobile.svg'
import GraduationIcon from '@/assets/icons/graduation.svg'

export const sectionIcons = {
  depannage: WrenchIcon,
  installation: BoxIcon,
  sauvegarde: CloudIcon,
  'assistance-mobile': MobileIcon,
  formation: GraduationIcon,
}

export type SectionId = keyof typeof sectionIcons

export interface SectionData {
  id: SectionId
  label: string
  content: string[]
  details: string[]
}

export const sections: SectionData[] = [
  { 
    id: 'depannage',
    label: 'Dépannage',
    content: ['Réparation PC/Mac','Suppression virus','Optimisation','Réinstallation'],
    details: [
      'Réparation de PC / Mac (système lent, bugs, écran bleu, etc.)',
      'Suppression de virus, malware, publicités',
      'Nettoyage et optimisation des performances',
      "Réinstallation complète ou mise à jour du système d’exploitation"
    ]
  },
  {
    id: 'installation',
    label: 'Installation',
    content: ['Installation périphériques','Configuration email','Wi-Fi setup'],
    details: [
      'Installation d’imprimantes, réseaux, périphériques, box Internet',
      'Mise en place du Wi-Fi à domicile',
      'Configuration de comptes (emails, cloud, antivirus)',
      'Installation de logiciels courants'
    ]
  },
  {
    id: 'sauvegarde',
    label: 'Sauvegarde',
    content: ['Sauvegarde Cloud/disque','Récupération','Clonage SSD'],
    details: [
      'Sauvegarde automatique sur disque ou cloud',
      'Récupération de données perdues',
      'Clonage ou migration vers SSD',
      'Sécurisation (antivirus, pare-feu, contrôle parental)'
    ]
  },
  {
    id: 'assistance-mobile',
    label: 'Assistance',
    content: ['Smartphones/tablettes','Connexion téléphone-PC','Apps utiles'],
    details: [
      'Aide à l’utilisation de smartphones / tablettes',
      'Connexion téléphone–PC (sauvegarde, synchronisation)',
      'Installation d’applications utiles ou contrôle parental'
    ]
  },
  {
    id: 'formation',
    label: 'Formation',
    content: ['Initiation informatique','Séances seniors','Sécurité numérique'],
    details: [
      'Initiation à l’informatique (email, Internet, Word…)',
      'Séances personnalisées pour seniors',
      'Sécurité numérique : éviter les arnaques en ligne'
    ]
  },
]
