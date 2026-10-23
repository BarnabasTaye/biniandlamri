export interface ScheduleItem {
  id: string;
  timeRange: string;
  ethiopianTime: string;
  title: string;
  description?: string;
  category: 'prep' | 'home' | 'church' | 'reception';
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

export interface RsvpEntry {
  id: string;
  name: string;
  contact: string;
  attending: 'yes' | 'no';
  guests: number;
  dietary: string;
  message: string;
  timestamp: number;
}

export const WEDDING_DATE_STRING = '2026-11-14T14:30:00+03:00'; // Addis Ababa UTC+3
export const WEDDING_DATE = new Date(WEDDING_DATE_STRING);

export const SCHEDULE_DATA: { phase: string; category: 'prep' | 'home' | 'church' | 'reception'; items: ScheduleItem[] }[] = [
  {
    phase: 'Early Morning Preparation',
    category: 'prep',
    items: [
      {
        id: 'sch-1',
        timeRange: '3:00 – 6:00 AM',
        ethiopianTime: '9:00 – 12:00 ET (night/morning)',
        title: "Bride's Makeup & Hair Preparation",
        description: 'Morning styling and preparation for the bride and her bridal party.',
        category: 'prep',
      },
      {
        id: 'sch-2',
        timeRange: '7:00 – 10:00 AM',
        ethiopianTime: '1:00 – 4:00 ET',
        title: 'Bride & Groom Morning Photoshoot',
        description: 'Private couple portraits and cinematic photoshoot at the hotel.',
        category: 'prep',
        highlight: true,
      },
    ],
  },
  {
    phase: 'Morning at Family Homes',
    category: 'home',
    items: [
      {
        id: 'sch-3',
        timeRange: '10:30 AM – 1:00 PM',
        ethiopianTime: '4:30 – 7:00 ET',
        title: "Bride's Home: Breakfast & Family Portraits",
        description: 'Intimate breakfast, traditional blessings, and photo session with the bride’s family.',
        category: 'home',
      },
      {
        id: 'sch-4',
        timeRange: '10:30 AM – 12:00 PM',
        ethiopianTime: '4:30 – 6:00 ET',
        title: "Groom's Home: Breakfast & Family Photo Session",
        description: 'Gathering of the groom’s family, groomsmen prep, and fellowship.',
        category: 'home',
      },
      {
        id: 'sch-5',
        timeRange: '12:00 – 12:30 PM',
        ethiopianTime: '6:00 – 6:30 ET',
        title: "Departure from the Groom's House",
        description: 'The groom and entourage depart in convoy to greet the bride.',
        category: 'home',
      },
    ],
  },
  {
    phase: "Ceremony at the Bride's Residence",
    category: 'home',
    items: [
      {
        id: 'sch-6',
        timeRange: '12:30 – 1:00 PM',
        ethiopianTime: '6:30 – 7:00 ET',
        title: "Procession to the Bride's House",
        description: 'Arrival of the groom and singing traditional celebration songs.',
        category: 'home',
      },
      {
        id: 'sch-7',
        timeRange: '1:00 – 1:30 PM',
        ethiopianTime: '7:00 – 7:30 ET',
        title: "Reception & Family Time at Bride's Residence",
        description: 'Warm welcome by the bride’s parents and first reveal.',
        category: 'home',
      },
      {
        id: 'sch-8',
        timeRange: '1:30 – 2:00 PM',
        ethiopianTime: '7:30 – 8:00 ET',
        title: 'Traditional Send-Off Ceremony & Parental Blessings',
        description: 'Elders and parents bestow heartfelt prayers and blessings on the couple.',
        category: 'home',
        highlight: true,
      },
      {
        id: 'sch-9',
        timeRange: '2:00 – 2:30 PM',
        ethiopianTime: '8:00 – 8:30 ET',
        title: 'Wedding Convoy Travels to the Church',
        description: 'All guests and wedding parties journey together toward Gerji Muluwengel Church.',
        category: 'home',
      },
    ],
  },
  {
    phase: 'Holy Matrimony & Worship',
    category: 'church',
    items: [
      {
        id: 'sch-10',
        timeRange: '2:30 – 3:00 PM',
        ethiopianTime: '8:30 – 9:00 ET',
        title: 'Opening Worship & Entrance of the Bride & Groom',
        description: 'Ceremonial entrance down the aisle surrounded by hymns and thanksgiving.',
        category: 'church',
        highlight: true,
      },
      {
        id: 'sch-11',
        timeRange: '3:00 – 3:30 PM',
        ethiopianTime: '9:00 – 9:30 ET',
        title: 'Praise & Worship Service',
        description: 'Congregational worship celebrating the goodness of the Lord.',
        category: 'church',
      },
      {
        id: 'sch-12',
        timeRange: '3:30 – 4:00 PM',
        ethiopianTime: '9:30 – 10:00 ET',
        title: 'Word of God (Sermon on Marriage)',
        description: 'Biblical exhortation and pastoral charge on covenant and eternal love.',
        category: 'church',
      },
      {
        id: 'sch-13',
        timeRange: '4:00 – 4:30 PM',
        ethiopianTime: '10:00 – 10:30 ET',
        title: 'Exchange of Sacred Vows & Rings',
        description: 'Covenant pronouncement and holy matrimony blessing.',
        category: 'church',
        highlight: true,
      },
      {
        id: 'sch-14',
        timeRange: '4:30 – 5:00 PM',
        ethiopianTime: '10:30 – 11:00 ET',
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
        id: 'sch-15',
        timeRange: '5:00 – 6:00 PM',
        ethiopianTime: '11:00 – 12:00 ET',
        title: 'Rest, Outfit Change & Evening Touch-Up',
        description: 'Brief interlude for the couple to refresh into formal evening attire.',
        category: 'reception',
      },
      {
        id: 'sch-16',
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
        id: 'sch-17',
        timeRange: '6:30 – 6:45 PM',
        ethiopianTime: '12:30 – 12:45 ET',
        title: 'Grand Entrance with Praise & Family Welcome',
        description: 'The newlyweds enter the hall welcomed by singing, clapping, and flowers.',
        category: 'reception',
        highlight: true,
      },
      {
        id: 'sch-18',
        timeRange: '6:45 – 7:00 PM',
        ethiopianTime: '12:45 – 1:00 ET',
        title: 'Evening Songs of Praise',
        description: 'Worship music celebrating union and joyful gratitude.',
        category: 'reception',
      },
      {
        id: 'sch-19',
        timeRange: '7:00 – 7:15 PM',
        ethiopianTime: '1:00 – 1:15 ET',
        title: 'Sharing the Gospel & Prayer of Blessing over Dinner',
        description: 'Thanksgiving prayer before the grand banquet.',
        category: 'reception',
      },
      {
        id: 'sch-20',
        timeRange: '7:15 – 7:45 PM',
        ethiopianTime: '1:15 – 1:45 ET',
        title: 'Wedding Dinner Banquet',
        description: 'Exquisite Ethiopian and international culinary dining experience.',
        category: 'reception',
      },
      {
        id: 'sch-21',
        timeRange: '7:45 – 8:00 PM',
        ethiopianTime: '1:45 – 2:00 ET',
        title: 'Parental Blessings & Words of Gratitude',
        description: 'Heartfelt speeches from parents thanking family, neighbors, and guests.',
        category: 'reception',
      },
      {
        id: 'sch-22',
        timeRange: '8:00 – 8:30 PM',
        ethiopianTime: '2:00 – 2:30 ET',
        title: 'Worship & Musical Celebrations',
        description: 'Live gospel praise and uplifting acoustic fellowship.',
        category: 'reception',
      },
      {
        id: 'sch-23',
        timeRange: '8:30 – 9:30 PM',
        ethiopianTime: '2:30 – 3:30 ET',
        title: 'Cake Cutting Ceremony & Fellowship',
        description: 'Cutting the wedding cake, champagne/cider toast, and group worship.',
        category: 'reception',
        highlight: true,
      },
      {
        id: 'sch-24',
        timeRange: '9:30 – 10:30 PM',
        ethiopianTime: '3:30 – 4:30 ET',
        title: 'Group Photographs & Presentation of Gifts',
        description: 'Commemorative group pictures with friends, colleagues, and extended families.',
        category: 'reception',
      },
      {
        id: 'sch-25',
        timeRange: '10:30 – 11:00 PM',
        ethiopianTime: '4:30 – 5:00 ET',
        title: 'Couple’s Sparkler Farewell & Suite Departure',
        description: 'Warm send-off as Lamirot & Biniyam embark on their marital journey.',
        category: 'reception',
      },
    ],
  },
];

export const INITIAL_WISHES: WishItem[] = [
  {
    id: 'w-1',
    name: 'Ato Yohannes & W/ro Rahel',
    relationship: 'Family Elders',
    amharicText: 'መልካም የጋብቻ ዘመን ይሁንላችሁ! እግዚአብሔር ቤታችሁን በበረከት፣ በፍቅርና በሰላም ይሙላው።',
    message: 'May the Almighty God bless your union abundantly. May your home be a sanctuary of unending peace, laughter, and grace!',
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
    likes: 24,
  },
  {
    id: 'w-2',
    name: 'Marta & Dawit (Washington D.C.)',
    relationship: 'Cousins & Diaspora Family',
    message: 'So overjoyed for you both! Watching your love story flourish across the years has been pure joy. Can’t wait to celebrate in Addis this November!',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    likes: 19,
  },
  {
    id: 'w-3',
    name: 'Pastor Samuel & Church Youth Fellowship',
    relationship: 'Gerji Muluwengel Church',
    amharicText: 'ፍቅር ይታገሣል፥ ቸርነትንም ያደርጋል፤ ፍቅር አይቀናም፤ ፍቅር አይመካም (1 ቆሮ 13:4)',
    message: 'Congratulations Bini & Lami! You are both shining lights and an inspiration to our community. Standing with you in constant prayer and thanksgiving.',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    likes: 31,
  },
  {
    id: 'w-4',
    name: 'Kalkidan Assefa',
    relationship: 'Maid of Honor & Lifelong Friend',
    message: 'To my dearest Lami and Bini: two of the kindest souls entering into God’s most sacred covenant. Count down is real!',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    likes: 28,
  },
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'p-1',
    title: 'Our First Hello',
    subtitle: 'Where laughter and destiny crossed paths',
    category: 'story',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-2',
    title: 'Golden Sunset Moments',
    subtitle: 'Cherishing quiet afternoons overlooking Entoto hills',
    category: 'engagement',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-3',
    title: 'The Sacred Vows Ahead',
    subtitle: 'Preparing our hearts for Holy Matrimony',
    category: 'story',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-4',
    title: 'Family Gathering & Blessings',
    subtitle: 'Surrounded by the prayers of parents and elders',
    category: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-5',
    title: 'A Promise for Tomorrow',
    subtitle: 'Hand in hand through every season of life',
    category: 'engagement',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-6',
    title: 'Celebration of Joy',
    subtitle: 'Counting the days until November 14, 2026',
    category: 'story',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
  },
];

export const INITIAL_RSVPS: RsvpEntry[] = [
  {
    id: 'r-1',
    name: 'Dr. Michael Tadesse',
    contact: 'michael.tadesse@example.com',
    attending: 'yes',
    guests: 2,
    dietary: 'Standard Ethiopian',
    message: 'Can’t wait to be there to witness your union! Blessings to you both.',
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
  },
  {
    id: 'r-2',
    name: 'Bethlehem Mengistu',
    contact: '+251 911 234567',
    attending: 'yes',
    guests: 1,
    dietary: 'Ethiopian Fasting / Vegan (Tsom)',
    message: 'So honored to celebrate with you Bini & Lami! Congratulations!',
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
  },
];
