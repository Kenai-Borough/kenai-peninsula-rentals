import type {
  AvailabilityDay,
  Booking,
  HostPayout,
  LongTermApplication,
  Message,
  Profile,
  Property,
  RentalType,
  Review,
  Testimonial,
} from '../types'

const photoSets = {
  kenai: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
  ],
  soldotna: [
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&w=1600&q=80',
  ],
  homer: [
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
  ],
  seward: [
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
  ],
  cooper: [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  ],
  sterling: [
    'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
  ],
  anchor: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
  ],
} as const

const amenityPool = [
  'WiFi', 'Kitchen', 'Laundry', 'Hot tub', 'Sauna', 'Fireplace', 'Lake access', 'Boat dock', 'Fishing access',
  'Mountain view', 'Pet friendly', 'Wheelchair accessible', 'EV charger', 'Fire pit', 'Kayaks', 'Snowmachine parking',
  'Blackout curtains', 'Smart TV', 'Dedicated workspace', 'BBQ grill', 'Gear drying room', 'Aurora deck', 'Mud room',
  'Covered parking', 'Ocean view', 'Board games', 'Self check-in', 'Generator backup', 'Stocked pantry', 'Washer/dryer',
  'Crib', 'Boat trailer parking', 'Garden', 'Lakefront deck', 'Fish freezer', 'Coffee bar'
]

export const communities = ['Kenai', 'Soldotna', 'Homer', 'Seward', 'Cooper Landing', 'Sterling', 'Anchor Point', 'Nikiski', 'Kasilof', 'Hope']
export const rentalTypes: RentalType[] = ['cabin', 'house', 'apartment', 'condo', 'lodge', 'yurt', 'glamping', 'rv-spot']
export const browseAmenities = amenityPool

export const hostProfiles: Profile[] = [
  {
    id: 'host-1',
    email: 'mila@kenairentals.com',
    fullName: 'Mila North',
    role: 'host',
    phone: '(907) 555-1401',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    bio: 'Superhost specializing in salmon-fishing cabins and riverfront stays with fish freezer setups and easy launch access.',
    responseTimeHours: 1,
    isSuperhost: true,
    rating: 4.97,
    reviewCount: 88,
    createdAt: '2023-01-10T08:00:00Z',
  },
  {
    id: 'host-2',
    email: 'rowan@peninsulalodges.com',
    fullName: 'Rowan Hale',
    role: 'host',
    phone: '(907) 555-1402',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Homer-based host curating bluff-view cabins, artist retreats, and shoulder-season aurora stays.',
    responseTimeHours: 2,
    isSuperhost: true,
    rating: 4.93,
    reviewCount: 74,
    createdAt: '2022-11-14T10:00:00Z',
  },
  {
    id: 'host-3',
    email: 'alden@harborhomes.com',
    fullName: 'Alden Shore',
    role: 'host',
    phone: '(907) 555-1403',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    bio: 'Seward and Cooper Landing host focused on mountain access, harbor views, wilderness basecamps, and weather-ready arrivals.',
    responseTimeHours: 3,
    isSuperhost: false,
    rating: 4.88,
    reviewCount: 61,
    createdAt: '2022-06-18T08:00:00Z',
  },
  {
    id: 'host-4',
    email: 'tessa@soldotnastays.com',
    fullName: 'Tessa Brooks',
    role: 'host',
    phone: '(907) 555-1404',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80',
    bio: 'Long-term and family-friendly homes in Soldotna, Sterling, and Kenai with practical amenities for work and school.',
    responseTimeHours: 4,
    isSuperhost: false,
    rating: 4.82,
    reviewCount: 43,
    createdAt: '2021-09-07T08:00:00Z',
  },
  {
    id: 'guest-1',
    email: 'traveler@example.com',
    fullName: 'Evan Rivers',
    role: 'guest',
    phone: '(907) 555-2401',
    avatarUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=256&q=80',
    bio: 'Returning angler, remote worker, and road-trip planner.',
    responseTimeHours: 5,
    isSuperhost: false,
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2024-01-02T08:00:00Z',
  },
  {
    id: 'admin-1',
    email: 'admin@kenaipeninsularentals.com',
    fullName: 'KPR Admin',
    role: 'admin',
    phone: '(907) 555-3000',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    bio: 'Marketplace operations, trust and safety, and host success.',
    responseTimeHours: 1,
    isSuperhost: false,
    rating: 5,
    reviewCount: 4,
    createdAt: '2021-01-01T00:00:00Z',
  },
]

const cityGuides = {
  Kenai: { photos: photoSets.kenai, nearby: ['Kenai River', 'Captain Cook State Recreation Area', 'Kenai Beach', 'Dockside restaurants'] },
  Soldotna: { photos: photoSets.soldotna, nearby: ['Soldotna Creek Park', 'Kenai River Brewing', 'Swiftwater Park', 'Community trails'] },
  Homer: { photos: photoSets.homer, nearby: ['Homer Spit', 'Bishop’s Beach', 'Kachemak Bay trails', 'Artist co-ops'] },
  Seward: { photos: photoSets.seward, nearby: ['Small Boat Harbor', 'Exit Glacier', 'Waterfront Park', 'Kenai Fjords tours'] },
  'Cooper Landing': { photos: photoSets.cooper, nearby: ['Russian River', 'Kenai Lake', 'Quartz Creek', 'Wildlife viewpoint pullouts'] },
  Sterling: { photos: photoSets.sterling, nearby: ['Skilak Lake', 'Morgan’s Landing', 'Bings Landing', 'Moose River access'] },
  'Anchor Point': { photos: photoSets.anchor, nearby: ['Anchor Point Beach', 'North Fork trails', 'Cook Inlet outlooks', 'Halibut charters'] },
} as const

const propertySeeds = [
  ['prop-1', 'Kenai River King Cabin', 'Kenai', 'cabin', 60.5544, -151.2583, 2, 1, 5, 980, 225, 1350, 4200, false, 'Riverfront cabin built for salmon fishing weekends and northern lights shoulder seasons.'],
  ['prop-2', 'Driftwood Lodge Retreat', 'Kenai', 'lodge', 60.5571, -151.2402, 5, 4, 12, 3200, 395, 2370, 7800, false, 'Large-group fishing lodge with fish cleaning station, boat parking, and glacier flightseeing access.'],
  ['prop-3', 'Salmon Run Chalet', 'Kenai', 'house', 60.5812, -151.2433, 3, 2, 8, 1760, 285, 1710, 5200, false, 'Family-ready chalet with riverbank fire pit, wildlife viewing, and easy dipnet logistics.'],
  ['prop-4', 'Soldotna Trailside Townhome', 'Soldotna', 'condo', 60.4874, -151.0628, 2, 2, 6, 1180, 175, 1100, 2300, true, 'Furnished townhome for traveling professionals, anglers, and winter remote workers.'],
  ['prop-5', 'Bear Creek Family House', 'Soldotna', 'house', 60.4941, -151.0596, 4, 3, 9, 2140, 240, 1500, 2600, true, 'Spacious long-term home with fenced yard, garage, and school-friendly layout.'],
  ['prop-6', 'Peninsula Basecamp Apartment', 'Soldotna', 'apartment', 60.4788, -151.0709, 1, 1, 3, 720, 110, 720, 1600, true, 'Compact furnished apartment with dedicated workspace and blackout curtains.'],
  ['prop-7', 'Bluff View Aurora Cabin', 'Homer', 'cabin', 59.6425, -151.5483, 2, 2, 5, 1040, 215, 1290, 3700, false, 'Glass-front cabin for aurora viewing, fall colors, and quiet artist retreats.'],
  ['prop-8', 'Kachemak Artist Studio', 'Homer', 'apartment', 59.6421, -151.5251, 1, 1, 2, 650, 135, 850, 2100, true, 'Stylish long-stay studio with harbor views, reading nook, and gallery district access.'],
  ['prop-9', 'Halibut Cove Bluff House', 'Homer', 'house', 59.6501, -151.5314, 3, 2, 7, 1625, 295, 1770, 4500, false, 'Ocean-facing bluff house with chef kitchen and sunset soaking tub.'],
  ['prop-10', 'Harbor Lights Condo', 'Seward', 'condo', 60.1041, -149.4422, 2, 2, 6, 980, 215, 1290, 3400, false, 'Harbor condo with mountain backdrop, wildlife cruises, and walkable restaurants.'],
  ['prop-11', 'Exit Glacier Ridge Cabin', 'Seward', 'cabin', 60.1271, -149.4578, 3, 2, 8, 1410, 260, 1560, 3900, false, 'Mountain cabin with sauna, gear-drying room, and glacier day-trip access.'],
  ['prop-12', 'Resurrection Bay Overlook', 'Seward', 'house', 60.1137, -149.4353, 4, 3, 10, 2100, 300, 1800, 5100, false, 'Upscale group stay for reunions, harbor charters, and shoulder-season whale watching.'],
  ['prop-13', 'Russian River Cedar Cabin', 'Cooper Landing', 'cabin', 60.4908, -149.8265, 2, 1, 4, 870, 245, 1470, 3600, false, 'Classic cedar cabin steps from trout runs, rafting meetups, and trailheads.'],
  ['prop-14', 'Kenai Lake Wilderness Lodge', 'Cooper Landing', 'lodge', 60.4867, -149.8345, 6, 5, 14, 3640, 500, 3000, 8900, false, 'Premium wilderness lodge for fishing trips, destination dinners, and wedding weekends.'],
  ['prop-15', 'Quartz Creek Yurt Escape', 'Cooper Landing', 'yurt', 60.4924, -149.8161, 1, 1, 3, 540, 175, 1050, 2400, false, 'Warm yurt with wood stove, lake access, and aurora deck for adventurous guests.'],
  ['prop-16', 'Skilak Lake Cabin', 'Sterling', 'cabin', 60.5409, -150.7659, 2, 1, 5, 900, 165, 990, 2500, false, 'Lakeside cabin with kayaks, fish smoker, and sunrise wildlife watching.'],
  ['prop-17', 'Moose Meadow House', 'Sterling', 'house', 60.5313, -150.7461, 3, 2, 7, 1510, 205, 1260, 2400, true, 'Quiet long-term home with storage, workspace, and quick Kenai access.'],
  ['prop-18', 'Loon Call Loft', 'Sterling', 'apartment', 60.5537, -150.7721, 1, 1, 2, 680, 105, 700, 1550, true, 'Budget-friendly loft with shared laundry, lake views, and practical monthly pricing.'],
  ['prop-19', 'Cook Inlet Ocean Cabin', 'Anchor Point', 'cabin', 59.7768, -151.8311, 2, 1, 4, 830, 145, 900, 2200, false, 'Ocean-view cabin for halibut charters, beachcombing, and storm watching.'],
  ['prop-20', 'Anchor Point Sunset House', 'Anchor Point', 'house', 59.7789, -151.8296, 3, 2, 8, 1650, 195, 1200, 2350, true, 'Coastal long-term house with greenhouse, mud room, and homeschooling nook.'],
  ['prop-21', 'Kenai Dockside Glamping Dome', 'Kenai', 'glamping', 60.5532, -151.2507, 1, 1, 2, 410, 150, 900, 0, false, 'Luxury glamping dome with river access, fire pit, and clear-roof aurora views.'],
  ['prop-22', 'Soldotna RV Hookup at Moose Bend', 'Soldotna', 'rv-spot', 60.4816, -151.0413, 0, 1, 6, 300, 90, 560, 0, false, 'Full-hookup RV spot close to launches, grocery runs, and family campfire nights.'],
  ['prop-23', 'Homer Harbor Hideaway Condo', 'Homer', 'condo', 59.6464, -151.5362, 2, 2, 4, 980, 185, 1110, 3000, false, 'Modern harbor condo with artist touches, glacier views, and walkable dining.'],
  ['prop-24', 'Seward Basecamp Bungalow', 'Seward', 'house', 60.1011, -149.4477, 2, 1, 5, 930, 170, 1020, 2900, false, 'Compact bungalow with secure kayak storage and easy departure mornings.'],
  ['prop-25', 'Kasilof Drift Fishing Cabin', 'Kenai', 'cabin', 60.3584, -151.2951, 2, 1, 5, 890, 190, 1140, 3300, false, 'South-of-Kenai cabin tailored for drift boats, fish freezers, and quiet sunsets.'],
  ['prop-26', 'Homer Bluff Tiny Cabin', 'Homer', 'cabin', 59.6517, -151.5412, 1, 1, 2, 460, 120, 760, 2100, false, 'Cozy tiny cabin with bluff views, wildlife sightings, and a coffee bar for slow mornings.'],
  ['prop-27', 'Cooper Landing River House', 'Cooper Landing', 'house', 60.4894, -149.8233, 3, 2, 8, 1600, 320, 1920, 4800, false, 'River house with raft parking, sauna, and hiking access.'],
  ['prop-28', 'Soldotna Creekside Duplex', 'Soldotna', 'apartment', 60.487, -151.0636, 2, 1, 4, 920, 125, 800, 1750, true, 'Month-to-month duplex favored by medical staff, fish processors, and relocating families.'],
] as const

const houseRules = [
  'Quiet hours from 10pm to 7am',
  'Remove muddy boots in the entry mud room',
  'No fish cleaning inside the home',
  'Respect wildlife distance and secure food outdoors',
  'Only registered guests allowed overnight',
]

const propertyHosts = ['host-1', 'host-1', 'host-1', 'host-4', 'host-4', 'host-4', 'host-2', 'host-2', 'host-2', 'host-3', 'host-3', 'host-3', 'host-3', 'host-3', 'host-3', 'host-4', 'host-4', 'host-4', 'host-2', 'host-4', 'host-1', 'host-4', 'host-2', 'host-3', 'host-1', 'host-2', 'host-3', 'host-4'] as const

function seasonPlan(propertyId: string) {
  return [
    { id: propertyId + '-summer', propertyId, name: 'Peak salmon season', startDate: '2025-06-01', endDate: '2025-08-31', priceMultiplier: 2, label: 'Summer fishing Jun–Aug' },
    { id: propertyId + '-shoulder', propertyId, name: 'Shoulder season value', startDate: '2025-05-01', endDate: '2025-09-30', priceMultiplier: 1.5, label: 'Fall colors & spring May/Sep' },
    { id: propertyId + '-winter', propertyId, name: 'Winter standard rate', startDate: '2025-11-01', endDate: '2026-03-31', priceMultiplier: 1, label: 'Winter aurora Nov–Mar' },
  ]
}

export const properties: Property[] = propertySeeds.map((seed, index) => {
  const [id, title, city, type, lat, lng, bedrooms, bathrooms, maxGuests, sqft, nightlyRate, weeklyRate, monthlyRate, isLongTerm, summary] = seed
  const guide = cityGuides[city as keyof typeof cityGuides] ?? cityGuides.Kenai
  const createdAt = new Date(Date.UTC(2024, (index * 2) % 12, 3 + index)).toISOString()
  const amenities = Array.from(
    new Set([
      'WiFi',
      'Kitchen',
      'Laundry',
      'Mountain view',
      'Fishing access',
      ...amenityPool.slice(index % 10, index % 10 + 9),
      ...(index % 2 === 0 ? ['Fish freezer', 'Boat trailer parking'] : ['Hot tub', 'Aurora deck']),
      ...(isLongTerm ? ['Dedicated workspace', 'Washer/dryer'] : ['Self check-in', 'Fire pit']),
    ]),
  ).slice(0, 14)

  return {
    id,
    hostId: propertyHosts[index],
    title,
    description: summary + ' Expect warm wood interiors, local guidebook notes, salmon fishing access, glacier day-trip logistics, and Alaska-ready details like gear drying space, winter prep tips, and wildlife awareness.',
    summary,
    type,
    address: String(100 + index) + ' Peninsula Outlook Rd',
    city,
    lat,
    lng,
    bedrooms,
    bathrooms,
    maxGuests,
    sqft,
    amenities,
    photos: [...guide.photos],
    houseRules,
    cancellationPolicy: isLongTerm
      ? 'Application fee refundable within 48 hours. After approval, lease terms and notice periods apply.'
      : 'Free cancellation up to 7 days before arrival, then first night and fees are non-refundable.',
    nightlyRate,
    weeklyRate,
    monthlyRate,
    cleaningFee: type === 'rv-spot' ? 35 : type === 'glamping' ? 55 : 95 + bedrooms * 15,
    minStay: isLongTerm ? 30 : type === 'rv-spot' ? 2 : 3,
    maxStay: isLongTerm ? 365 : 28,
    isLongTerm,
    petFriendly: amenities.includes('Pet friendly') || index % 3 !== 0,
    status: 'active',
    rating: Number((4.72 + (index % 5) * 0.05).toFixed(2)),
    reviewCount: 18 + index * 3,
    viewCount: 260 + index * 39,
    featured: index < 10,
    popularityScore: 90 + index,
    featuredLabel: isLongTerm ? 'Extended stay favorite' : index % 2 === 0 ? 'Fishing favorite' : 'Aurora ready',
    hostResponseTime: String(1 + (index % 4)) + ' hour' + (index % 4 === 0 ? '' : 's'),
    nearbyAttractions: [...guide.nearby],
    durationOptions: isLongTerm ? ['monthly', 'long-term'] : ['nightly', 'weekly', 'monthly'],
    seasonalPricing: seasonPlan(id),
    createdAt,
    updatedAt: createdAt,
  }
})

export const reviews: Review[] = properties.slice(0, 20).map((property, index) => ({
  id: 'review-' + String(index + 1),
  bookingId: 'booking-' + String(index + 1),
  reviewerId: 'guest-1',
  revieweeId: property.hostId,
  propertyId: property.id,
  rating: index % 3 === 0 ? 5 : 4,
  cleanliness: 5,
  communication: 5,
  location: 4 + (index % 2),
  value: 4 + (index % 2),
  comment: [
    'Spotless arrival, excellent fish freezer setup, and clear host communication before a late-night check-in.',
    'Perfect jumping-off point for glacier tours and harbor mornings; the local recommendations were gold.',
    'Warm cabin finishes, easy booking flow, and exactly the kind of local stay we hoped for.',
  ][index % 3],
  createdAt: new Date(Date.UTC(2025, index % 6, 10 + index)).toISOString(),
}))

export const bookings: Booking[] = properties.slice(0, 12).map((property, index) => ({
  id: 'booking-' + String(index + 1),
  propertyId: property.id,
  guestId: 'guest-1',
  checkIn: new Date(Date.UTC(2025, 5 + (index % 3), 4 + index)).toISOString(),
  checkOut: new Date(Date.UTC(2025, 5 + (index % 3), 7 + index)).toISOString(),
  guests: Math.min(property.maxGuests, 2 + (index % 4)),
  totalPrice: property.nightlyRate * 3 + property.cleaningFee + Math.round(property.nightlyRate * 0.12),
  cleaningFee: property.cleaningFee,
  serviceFee: Math.round(property.nightlyRate * 0.12),
  status: index < 4 ? 'confirmed' : index < 8 ? 'completed' : 'pending',
  specialRequests: index % 2 === 0 ? 'Interested in salmon run timing and boat launch parking.' : 'Need late arrival instructions for the family.',
  createdAt: new Date(Date.UTC(2025, index % 4, 2 + index)).toISOString(),
}))

export const messages: Message[] = bookings.slice(0, 8).map((booking, index) => ({
  id: 'message-' + String(index + 1),
  bookingId: booking.id,
  senderId: index % 2 === 0 ? 'guest-1' : properties[index].hostId,
  receiverId: index % 2 === 0 ? properties[index].hostId : 'guest-1',
  content: index % 2 === 0 ? 'Can you confirm if the fish cleaning table is covered in case of rain?' : 'Absolutely—covered station, fresh water hose, and room for coolers in the shed.',
  read: index % 3 !== 0,
  createdAt: new Date(Date.UTC(2025, 4, 8 + index)).toISOString(),
}))

export const savedPropertyIds = ['prop-7', 'prop-10', 'prop-13', 'prop-19', 'prop-28']

export const hostPayouts: HostPayout[] = bookings.slice(0, 6).map((booking, index) => ({
  id: 'payout-' + String(index + 1),
  hostId: properties[index].hostId,
  bookingId: booking.id,
  amount: Math.round(booking.totalPrice * 0.88),
  status: index < 4 ? 'paid' : 'pending',
  paidAt: new Date(Date.UTC(2025, 4, 12 + index)).toISOString(),
}))

export const longTermApplications: LongTermApplication[] = [
  {
    id: 'application-1',
    propertyId: 'prop-4',
    applicantId: 'guest-1',
    employment: 'RN at Central Peninsula Hospital',
    income: '$7,200/mo',
    references: [{ name: 'Dana Holt', relationship: 'Employer' }, { name: 'Chris Meyer', relationship: 'Former landlord' }],
    status: 'reviewing',
    createdAt: '2025-03-01T09:00:00Z',
  },
]

export const testimonials: Testimonial[] = [
  { name: 'Hannah & Luke', location: 'Anchorage', quote: 'We found a riverfront Kenai cabin in minutes, and the host even shared tide timing for our first salmon trip.', rating: 5 },
  { name: 'Marcus W.', location: 'Fairbanks', quote: 'The long-term Soldotna filters saved weeks compared to combing generic listing sites.', rating: 5 },
  { name: 'Naomi R.', location: 'Seattle', quote: 'This finally feels like an Alaska-first marketplace—real details on fishing access, weather prep, and local hosts.', rating: 5 },
]

export const seasonalHighlights = [
  { title: 'Summer fishing · Jun–Aug', summary: 'Peak salmon season pushes river cabins and lodges to 2x winter rates, so early planning matters.' },
  { title: 'Fall colors · Sep–Oct', summary: 'Shoulder-season pricing and quieter roads make Homer, Cooper Landing, and Sterling feel extra local.' },
  { title: 'Winter aurora · Nov–Mar', summary: 'Cabins with saunas, fireplaces, mud rooms, and snow-ready access shine for dark-sky escapes.' },
]

export const emergencyContacts = [
  { label: 'Alaska State Troopers', value: '(907) 262-4453' },
  { label: 'Central Peninsula Hospital', value: '(907) 714-4000' },
  { label: 'South Peninsula Hospital', value: '(907) 235-8101' },
  { label: 'Seward Providence ER', value: '(907) 224-5205' },
]

export const availability: AvailabilityDay[] = properties.flatMap((property, propertyIndex) =>
  Array.from({ length: 120 }, (_, dayIndex) => {
    const date = new Date(Date.UTC(2025, 4, dayIndex + 1))
    const state = (dayIndex + propertyIndex) % 9 === 0 ? 'blocked' : (dayIndex + propertyIndex) % 5 === 0 ? 'booked' : 'available'
    return {
      propertyId: property.id,
      date: date.toISOString(),
      status: state,
      priceOverride: state === 'available' && dayIndex % 14 === 0 ? Math.round(property.nightlyRate * 2) : undefined,
    }
  }),
)
