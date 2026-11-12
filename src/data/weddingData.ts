export interface ScheduleItem {
  id: string;
  timeRange: string;
  ethiopianTime: string;
  title: string;
  description?: string;
  category: 'groom' | 'bride' | 'church' | 'reception';
  highlight?: boolean;
}

export interface WishItem {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  amharicText?: string;
  timestamp: number;
  likes: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: 'story' | 'engagement' | 'family';
  imageUrl: string;
  isUserUploaded?: boolean;
}

export const WEDDING_DATE_STRING = '2026-11-14T14:00:00+03:00'; // Addis Ababa UTC+3
export const WEDDING_DATE = new Date(WEDDING_DATE_STRING);

export const SCHEDULE_DATA: { phase: string; category: 'groom' | 'bride' | 'church' | 'reception'; items: ScheduleItem[] }[] = [
  {
    phase: "The Groom's Home",
    category: 'groom',
    items: [
      {
        id: 'sch-1',
        timeRange: '10:00 – 11:00 AM',
        ethiopianTime: '4:00 – 5:00 ET',
        title: "Groom's Home: Breakfast, Prayer & Family Photos",
        description: 'The program begins at the groom’s family home with breakfast, elders’ prayers, and portraits with the groom’s family.',
        category: 'groom',
        highlight: true,
      },
      {
        id: 'sch-2',
        timeRange: '11:00 – 11:30 AM',
        ethiopianTime: '5:00 – 5:30 ET',
        title: 'Groomsmen Preparation & Departure Blessing',
        description: 'Final preparation of the groom and his entourage, followed by a blessing from the parents.',
        category: 'groom',
      },
      {
        id: 'sch-3',
        timeRange: '11:30 AM – 12:00 PM',
        ethiopianTime: '5:30 – 6:00 ET',
        title: "Procession from the Groom's House to the Bride's House",
        description: 'The groom and his entourage depart in convoy, singing traditional celebration songs on the way to the bride.',
        category: 'groom',
      },
    ],
  },
  {
    phase: "The Bride's Home",
    category: 'bride',
    items: [
      {
        id: 'sch-4',
        timeRange: '12:00 – 12:30 PM',
        ethiopianTime: '6:00 – 6:30 ET',
        title: "Arrival & Family Welcome at the Bride's House",
        description: 'Warm welcome by the bride’s parents, gift presentation, and the first reveal of the bride.',
        category: 'bride',
      },
      {
        id: 'sch-5',
        timeRange: '12:30 – 1:00 PM',
        ethiopianTime: '6:30 – 7:00 ET',
        title: "Traditional Celebration & Family Portraits",
        description: 'Traditional songs, coffee ceremony, and group photographs with the bride’s family and friends.',
        category: 'bride',
      },
      {
        id: 'sch-6',
        timeRange: '1:00 – 1:30 PM',
        ethiopianTime: '7:00 – 7:30 ET',
        title: 'Parental Blessings & Traditional Send-Off',
        description: 'Elders and parents bestow heartfelt prayers and blessings as the bride is sent off with the groom.',
        category: 'bride',
        highlight: true,
      },
      {
        id: 'sch-7',
        timeRange: '1:30 – 2:00 PM',
        ethiopianTime: '7:30 – 8:00 ET',
        title: 'Wedding Convoy Travels to the Church',
        description: 'All guests and wedding parties journey together toward Gerji Muluwengel Church.',
        category: 'bride',
      },
    ],
  },
  {
    phase: 'Holy Matrimony & Worship',
    category: 'church',
    items: [
      {
        id: 'sch-8',
        timeRange: '2:00 – 2:30 PM',
        ethiopianTime: '8:00 – 8:30 ET',
        title: 'Church Program Begins: Opening Worship & Entrance',
        description: 'The church program starts at 8:00 Ethiopian time with hymns and the ceremonial entrance of the groom and bride.',
        category: 'church',
        highlight: true,
      },
      {
        id: 'sch-9',
        timeRange: '2:30 – 3:00 PM',
        ethiopianTime: '8:30 – 9:00 ET',
        title: 'Praise & Worship Service',
        description: 'Congregational worship celebrating the goodness of the Lord.',
        category: 'church',
      },
      {
        id: 'sch-10',
        timeRange: '3:00 – 3:30 PM',
        ethiopianTime: '9:00 – 9:30 ET',
        title: 'Word of God (Sermon on Marriage)',
        description: 'Biblical exhortation and pastoral charge on covenant and eternal love.',
        category: 'church',
      },
      {
        id: 'sch-11',
        timeRange: '3:30 – 4:00 PM',
        ethiopianTime: '9:30 – 10:00 ET',
        title: 'Exchange of Sacred Vows & Rings',
        description: 'Covenant pronouncement and holy matrimony blessing.',
        category: 'church',
        highlight: true,
      },
      {
        id: 'sch-12',
        timeRange: '4:00 – 4:30 PM',
        ethiopianTime: '10:00 – 10:30 ET',
        title: 'Closing Benediction & Joyful Praise',
        description: 'Congratulations, family recessional, and congregational joy.',
        category: 'church',
      },
    ],
  },
  {
    phase: 'Break & Sunset Preparation',
    category: 'reception',
    items: [
      {
        id: 'sch-13',
        timeRange: '4:30 – 5:30 PM',
        ethiopianTime: '10:30 – 11:30 ET',
        title: 'Rest, Outfit Change & Evening Touch-Up',
        description: 'Brief interlude for the couple to refresh into formal evening attire.',
        category: 'reception',
      },
      {
        id: 'sch-14',
        timeRange: '5:30 – 6:00 PM',
        ethiopianTime: '11:30 – 12:00 ET',
        title: 'Guest Arrival, Registration & Seating',
        description: 'Dinner guests arrive at The Glasshouse and are kindly seated by 6:00 PM. The couple arrives separately for their 6:30 PM grand entrance.',
        category: 'reception',
        highlight: true,
      },
    ],
  },
  {
    phase: 'Dinner & Evening Celebration',
    category: 'reception',
    items: [
      {
        id: 'sch-15',
        timeRange: '6:30 – 6:45 PM',
        ethiopianTime: '12:30 – 12:45 ET',
        title: 'Grand Entrance with Praise & Family Welcome',
        description: 'The newlyweds enter the hall welcomed by singing, clapping, and flowers.',
        category: 'reception',
        highlight: true,
      },
      {
        id: 'sch-16',
        timeRange: '6:45 – 7:00 PM',
        ethiopianTime: '12:45 – 1:00 ET',
        title: 'Evening Songs of Praise',
        description: 'Worship music celebrating union and joyful gratitude.',
        category: 'reception',
      },
      {
        id: 'sch-17',
        timeRange: '7:00 – 7:15 PM',
        ethiopianTime: '1:00 – 1:15 ET',
        title: 'Sharing the Gospel & Prayer of Blessing over Dinner',
        description: 'Thanksgiving prayer before the grand banquet.',
        category: 'reception',
      },
      {
        id: 'sch-18',
        timeRange: '7:15 – 7:45 PM',
        ethiopianTime: '1:15 – 1:45 ET',
        title: 'Wedding Dinner Banquet',
        description: 'Exquisite Ethiopian and international culinary dining experience.',
        category: 'reception',
      },
      {
        id: 'sch-19',
        timeRange: '7:45 – 8:00 PM',
        ethiopianTime: '1:45 – 2:00 ET',
        title: 'Parental Blessings & Words of Gratitude',
        description: 'Heartfelt speeches from parents thanking family, neighbors, and guests.',
        category: 'reception',
      },
      {
        id: 'sch-20',
        timeRange: '8:00 – 8:30 PM',
        ethiopianTime: '2:00 – 2:30 ET',
        title: 'Worship & Musical Celebrations',
        description: 'Live gospel praise and uplifting acoustic fellowship.',
        category: 'reception',
      },
      {
        id: 'sch-21',
        timeRange: '8:30 – 9:30 PM',
        ethiopianTime: '2:30 – 3:30 ET',
        title: 'Cake Cutting Ceremony & Fellowship',
        description: 'Cutting the wedding cake, champagne/cider toast, and group worship.',
        category: 'reception',
        highlight: true,
      },
      {
        id: 'sch-22',
        timeRange: '9:30 – 10:30 PM',
        ethiopianTime: '3:30 – 4:30 ET',
        title: 'Group Photographs & Presentation of Gifts',
        description: 'Commemorative group pictures with friends, colleagues, and extended families.',
        category: 'reception',
      },
      {
        id: 'sch-23',
        timeRange: '10:30 – 11:00 PM',
        ethiopianTime: '4:30 – 5:00 ET',
        title: 'Couple’s Sparkler Farewell & Suite Departure',
        description: 'Warm send-off as Biniyam & Lamirot embark on their marital journey.',
        category: 'reception',
      },
    ],
  },
];

export const INITIAL_WISHES: WishItem[] = [];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'p-hero-veil',
    title: 'Under the Veil',
    subtitle: 'An evening portrait wrapped in lace and candlelight',
    category: 'story',
    imageUrl: '/images/couple-veil.jpg',
  },
  {
    id: 'p-lakeside',
    title: 'By the Lakeside',
    subtitle: 'Still water, white blossoms, and a shared smile',
    category: 'engagement',
    imageUrl: '/images/couple-lakeside.jpg',
  },
];
