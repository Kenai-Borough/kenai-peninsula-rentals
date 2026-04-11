import {
  availability,
  bookings,
  hostPayouts,
  hostProfiles,
  longTermApplications,
  messages,
  properties,
  reviews,
  savedPropertyIds,
  testimonials,
} from '../data/rentals'
import type { Profile, Property, UserRole } from '../types'

export const marketplace = {
  properties,
  reviews,
  bookings,
  messages,
  hostPayouts,
  testimonials,
  longTermApplications,
  savedPropertyIds,
  availability,
  getProperty(id: string) {
    return properties.find((property) => property.id === id)
  },
  getProfile(id: string) {
    return hostProfiles.find((profile) => profile.id === id)
  },
  getPropertyReviews(propertyId: string) {
    return reviews.filter((review) => review.propertyId === propertyId)
  },
  getSimilarProperties(property: Property) {
    return properties
      .filter((candidate) => candidate.id !== property.id && (candidate.city === property.city || candidate.type === property.type))
      .slice(0, 3)
  },
  getHostProperties(hostId: string) {
    return properties.filter((property) => property.hostId === hostId)
  },
  getDashboardProfile(role: UserRole): Profile {
    return hostProfiles.find((entry) => entry.role === role) ?? hostProfiles[0]
  },
}
