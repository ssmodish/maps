// TS allows an interface to be made so that any Object that wants to be able to add a marker
// must satisfy specific requirements without having to be being expressly defined

export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
  color: string
}

// now any object with a location.lat and location.lng property can be sent to this object

export class CustomMap {
  private googleMap: google.maps.Map

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    })
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      })

      infoWindow.open(this.googleMap, marker)
    })
  }
}
