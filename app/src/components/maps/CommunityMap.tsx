import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import L from 'leaflet'

// 32x32 PNG airplane icon encoded as base64 so we don't store binary assets
const planeIconUrl =
  'data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAwFBMVEVHcEy+GTHKLELM1t3qWW7qW' +
  'W7BPVK+GTHM1t3M1t2+GTHM' +
  '1t0qOke+GTHqWW4pLzPM1t2+GTG+GTHgS2DM1t0pLzPG0NdKPUXYPlVBZ4TqWW7qWW61ITu+GTHM1' +
  't0laJtmdX/TV2opLzMpLzOO' +
  'MVHbQ1kpLzPqWW6+GTFmdX9mdX/FcYHM1t2+GTFmdX8pLzPLyNHqWW4iZpnEJj3DYHJ+jJWotLzFe' +
  'onJrbjHj53iTWPBHTXnVWqz' +
  'vsYtbZ2swdBZ8y3kAAAALHRSTlMAzxBs7i3+oRCcMO9NXczJ036/RDAQtyT7eGeb5O9K7++A74CAy' +
  'q+vj8+v78XwN+sAAAMcSURB' +
  'VHhepdcJlqIwEAbgGBAVQQW7Vdrd3qanE3Bfepm5/60mwc6r0SQE5D/A96rKyitEquAgCLrIlNBHh' +
  'rhjylIzQRVaw5kOHnHHLLmU' +
  'VrIkXKE0n+RnSzVKi0isMrUz/PjMKXlR9MTKrlGl9LBaaaX7l7YnlLo1Xa/X06expu7qaqWV7ttJk' +
  'vxIVpP8/cOlka7soUoCJ3lM' +
  'nQZhSaX1aExD1cRxSyGBs+gLR0jTJ80WVG219JLwROAYpe5KKaUFxbO+cECKfM2chkrJY315s/i3c' +
  'ECKEJN8ldRSSv3HPoriuEfI' +
  'leQh5FZCFYRtpcTztifkSpoCoBiTTuoRKRbKyINGaux3cby7qKpZR1l5VUjcidPszAXBXiqkBiHf1' +
  '1IDGVK1ZWlLWHYggWMekywt' +
  'z9IeHFOGACmkHTjGwPNVdZfDgTGBI9dESA/lTVc4Uk28tX38u8/ejZdHmjNHKX3H+95bHM+iRZLkk' +
  'kKqkfZsPtEsTlgWeSA80kjp' +
  'nL2Ep43yxKVKKXX6i9S5R7niy4x4wY9FHGSdtJJXxJkQkiG1X/I6d02ilwqkzpwSEjid1Ckv9Qgp' +
  'LcFBLS9ZhCilT+m2GH8wpfT5' +
  'Id0W46BliTvKe2ceNMTyf5xCUuOaaU4QckfcKSRNJOeO8/iZIXrJPGjSEXd5bpAMg+7Bfe/aWRKu' +
  'hYE0IM15r7aUEvxpCLF6E0nT' +
  'ki+nLAmHZewrB9S5k6+5LUtd4fD8wjAgaTyX7UlSgPDzYCOkkSsGZPhqwa9CAojhXxuA0w1aLmEL' +
  'c37T+YjDIDmcOG2WMB45sAcg' +
  'VRCyL6QjA7b0dG6rbvioA6nSZ4P7XzqwtrZ0q/zV9V/26epcSA5znLMDbRnb+xCLDdKRO85S05Zu' +
  'Dx44AtKANSac5QTlDB7a3AGJ' +
  'O45wjpsA5Q6+LJE5m+WPc6CUuujGuGN6ODtHJ90LfLPknJ2DeHfo1nS4wzAR/0bH2jLnsKFU7Pj4' +
  'tubq73Tb4eUMvoQU3gTN6bvF' +
  'Jz6Ad0eDW6DRnK+yyxwulShJei1wG8pJsEplJXDKSQNwyknP4JSSWsWdf/8TZ0KzzJR0AAAAAElF' +
  'TkSuQmCC'
import { useAppSelector } from '../../storeHooks'
import { selectLiveFlights } from '../../liveFlightsSlice'

type LatLngTuple = [number, number]

const planeIcon = L.icon({
  iconUrl: planeIconUrl,
  iconSize: [32, 32],
})

export default function CommunityMap() {
  const flights = useAppSelector(selectLiveFlights)
  const [center, setCenter] = useState<LatLngTuple | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setCenter([0, 0])
      return
    }
    navigator.geolocation.getCurrentPosition(pos => {
      setCenter([pos.coords.latitude, pos.coords.longitude])
    }, () => setCenter([0, 0]))
  }, [])

  if (!center) return null

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="w-full h-full rounded-lg"
      scrollWheelZoom
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {flights.map(f => (
          <Marker key={f.id} position={[f.lat, f.lng]} icon={planeIcon}>
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">{f.callsign}</div>
                <div className="text-sm text-gray-600">
                  Altitude: {Math.round(f.altitude)} ft
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
