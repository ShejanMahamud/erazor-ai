import { NavItem } from '@/types';

// CDN Configuration
export const CDN_URL =
  process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL ||
  'https://pub-7c5475f69164473cb8f82ee5ae4a5718.r2.dev';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Background Remover',
    url: '/dashboard/background-remover',
    icon: 'media',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Image Editor',
    url: '/dashboard/image-editor',
    icon: 'userPen',
    shortcut: ['i', 'i'],
    isActive: false,
    items: []
  },
  {
    title: 'Image History',
    url: '/dashboard/image-history',
    icon: 'history',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Billing',
    url: '/dashboard/billing',
    icon: 'billing',
    shortcut: ['b', 'b'],
    isActive: false,
    items: []
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: 'user',
    shortcut: ['b', 'b'],
    isActive: false,
    items: []
  }
];


export const reviews = [
  {
    name: 'Sarah Chen',
    username: '@sarahdesigns',
    body: 'Game changer for my e-commerce store! Background removal that used to take me hours now takes seconds. The quality is incredible.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=SarahChen'
  },
  {
    name: 'Marcus Rodriguez',
    username: '@marcusphoto',
    body: "As a photographer, I'm blown away by the precision. It handles complex hair and edges better than expensive desktop software.",
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=MarcusRodriguez'
  },
  {
    name: 'Emily Watson',
    username: '@emilycreates',
    body: 'Perfect for social media content creation. The AI is so smart - it even preserves fine details like jewelry and accessories.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=EmilyWatson'
  },
  {
    name: 'David Park',
    username: '@davidstudio',
    body: 'I run a small design agency and this tool has 10x our productivity. Clients love the quick turnaround times.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=DavidPark'
  },
  {
    name: 'Lisa Thompson',
    username: '@lisashop',
    body: 'Switched from expensive alternatives and never looked back. The batch processing feature saves me so much time for product photos.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=LisaThompson'
  },
  {
    name: 'Alex Kumar',
    username: '@alexmarketing',
    body: 'The API integration was seamless. We process thousands of images daily and the consistency is remarkable. Highly recommend!',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=AlexKumar'
  },
  {
    name: 'Rachel Green',
    username: '@rachelcontent',
    body: 'Finally, a background removal tool that actually works on mobile! Perfect for creating content on the go.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=RachelGreen'
  },
  {
    name: 'Tom Wilson',
    username: '@tomdigital',
    body: "The before/after quality blew my mind. It's like having a professional photo editor in your pocket. Worth every penny.",
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=TomWilson'
  },
  {
    name: 'Priya Patel',
    username: '@priyatech',
    body: 'Integrated this into our workflow and cut editing time by 80%. The AI handles complex backgrounds flawlessly.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=PriyaPatel'
  },
  {
    name: 'Jake Morrison',
    username: '@jakecreative',
    body: 'Best investment for my freelance business. Clients are impressed with the lightning-fast delivery and professional results.',
    img: 'https://testingbot.com/free-online-tools/random-avatar/300?u=JakeMorrison'
  }
];

export const useCases = {
  branding: [
    {
      before: `${CDN_URL}/assets/product-1.jpg`,
      after: `${CDN_URL}/assets/product-1-removed.png`
    },
    {
      before: `${CDN_URL}/assets/product-2.jpg`,
      after: `${CDN_URL}/assets/product-2-removed.png`
    },
    {
      before: `${CDN_URL}/assets/product-3.jpg`,
      after: `${CDN_URL}/assets/product-3-removed.png`
    }
  ],
  portraits: [
    {
      before: `${CDN_URL}/assets/portrait-1.jpg`,
      after: `${CDN_URL}/assets/portrait-1-removed.png`
    },
    {
      before: `${CDN_URL}/assets/portrait-2.jpg`,
      after: `${CDN_URL}/assets/portrait-2-removed.png`
    },
    {
      before: `${CDN_URL}/assets/portrait-3.jpg`,
      after: `${CDN_URL}/assets/portrait-3-removed.png`
    }
  ],
  creative: [
    {
      before: `${CDN_URL}/assets/creative-1.jpg`,
      after: `${CDN_URL}/assets/creative-1-removed.png`
    },
    {
      before: `${CDN_URL}/assets/creative-2.jpg`,
      after: `${CDN_URL}/assets/creative-2-removed.png`
    },
    {
      before: `${CDN_URL}/assets/creative-3.jpg`,
      after: `${CDN_URL}/assets/creative-3-removed.png`
    }
  ],
  social: [
    {
      before: `${CDN_URL}/assets/social-1.jpg`,
      after: `${CDN_URL}/assets/social-1-removed.png`
    },
    {
      before: `${CDN_URL}/assets/social-2.jpg`,
      after: `${CDN_URL}/assets/social-2-removed.png`
    },
    {
      before: `${CDN_URL}/assets/social-3.jpg`,
      after: `${CDN_URL}/assets/social-3-removed.png`
    }
  ]
};

export const recentUseCases = [
  {
    before: `${CDN_URL}/assets/product-1.jpg`,
    after: `${CDN_URL}/assets/product-1-removed.png`
  },
  {
    before: `${CDN_URL}/assets/product-2.jpg`,
    after: `${CDN_URL}/assets/product-2-removed.png`
  },
  {
    before: `${CDN_URL}/assets/product-3.jpg`,
    after: `${CDN_URL}/assets/product-3-removed.png`
  },
  {
    before: `${CDN_URL}/assets/portrait-1.jpg`,
    after: `${CDN_URL}/assets/portrait-1-removed.png`
  },
  {
    before: `${CDN_URL}/assets/portrait-2.jpg`,
    after: `${CDN_URL}/assets/portrait-2-removed.png`
  },
  {
    before: `${CDN_URL}/assets/portrait-3.jpg`,
    after: `${CDN_URL}/assets/portrait-3-removed.png`
  },
  {
    before: `${CDN_URL}/assets/creative-1.jpg`,
    after: `${CDN_URL}/assets/creative-1-removed.png`
  },
  {
    before: `${CDN_URL}/assets/creative-2.jpg`,
    after: `${CDN_URL}/assets/creative-2-removed.png`
  },
  {
    before: `${CDN_URL}/assets/creative-3.jpg`,
    after: `${CDN_URL}/assets/creative-3-removed.png`
  },
  {
    before: `${CDN_URL}/assets/social-1.jpg`,
    after: `${CDN_URL}/assets/social-1-removed.png`
  },
  {
    before: `${CDN_URL}/assets/social-2.jpg`,
    after: `${CDN_URL}/assets/social-2-removed.png`
  },
  {
    before: `${CDN_URL}/assets/social-3.jpg`,
    after: `${CDN_URL}/assets/social-3-removed.png`
  }
]