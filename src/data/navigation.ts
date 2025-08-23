// src/data/navigation.ts

export const navigationLinks = [
    {
        label: 'Acceuil',
        basePath: '/',
      },
    {
      label: 'Nos services',
      children: [
        {
          label: 'Particuliers',
          children: [
            { label: 'Dépannage informatique', anchor: 'depannage' },
            { label: 'Installation & configuration', anchor: 'installation' },
            { label: 'Sauvegarde & données', anchor: 'sauvegarde' },
            { label: 'Assistance mobile', anchor: 'assistance-mobile' },
            { label: 'Formation à domicile', anchor: 'formation' },
          ],
          basePath: '/particuliers',
        },
        {
          label: 'Professionnels',
          basePath: '/professionnels',
        },
      ],
    },
    {
      label: 'À propos',
      basePath: '/apropos',
    },
  ]
  