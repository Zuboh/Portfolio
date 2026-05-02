export interface SocialLink {
  key: string
  label: string
  value: string
  href: string
  showInNav: boolean
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: 'github',
    label: 'github',
    value: 'github.com/zuboh',
    href: 'https://github.com/zuboh',
    showInNav: true,
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    value: '/in/lorenzo-zubani',
    href: 'https://www.linkedin.com/in/lorenzo-zubani/',
    showInNav: true,
  },
  {
    key: 'email',
    label: 'email',
    value: 'lorenzozubani1999@gmail.com',
    href: 'mailto:lorenzozubani1999@gmail.com',
    showInNav: true,
  },
  {
    key: 'twitter',
    label: 'twitter',
    value: '@zuboh_',
    href: 'https://twitter.com/zuboh_',
    showInNav: false,
  },
]
