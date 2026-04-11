import L from 'leaflet'
import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { Property } from '../types'
import { formatCurrency } from '../lib/utils'

interface MapProps {
  properties: Property[]
  selectedId?: string
  height?: string
  onSelect?: (propertyId: string) => void
}

function Recenter({ properties }: { properties: Property[] }) {
  const map = useMap()
  if (properties.length) {
    const bounds = L.latLngBounds(properties.map((property) => [property.lat, property.lng] as [number, number]))
    map.fitBounds(bounds.pad(0.18))
  }
  return null
}

export default function InteractiveMap({ properties, selectedId, height = '420px', onSelect }: MapProps) {
  const center = useMemo<[number, number]>(() => {
    if (!properties.length) return [60.32, -151.16]
    return [properties[0].lat, properties[0].lng]
  }, [properties])

  return (
    <div style={{ height }} className="overflow-hidden rounded-[28px] border border-white/10">
      <MapContainer center={center} zoom={7} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Recenter properties={properties} />
        {properties.map((property) => {
          const active = property.id === selectedId
          const price = formatCurrency(property.isLongTerm ? property.monthlyRate || property.nightlyRate * 30 : property.nightlyRate)
          const icon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:' + (active ? '#d4a338' : '#1a472a') + ';color:#f8f5ef;border-radius:999px;padding:8px 12px;font-weight:700;box-shadow:0 10px 24px rgba(15,23,42,.28)">' + price + '</div>',
          })
          return (
            <Marker key={property.id} position={[property.lat, property.lng]} icon={icon} eventHandlers={{ click: () => onSelect?.(property.id) }}>
              <Popup>
                <div className="space-y-1">
                  <strong>{property.title}</strong>
                  <div>{property.city}, Alaska</div>
                  <div>{price}{property.isLongTerm ? '/mo' : '/night'}</div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
