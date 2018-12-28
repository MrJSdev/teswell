var mapStylesMixin = {
  data () {
    return {
      mapStyles: [
        {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
        {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#616161'}]},
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#bdbdbd'}]
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#eeeeee'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [{color: '#eee'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#757575'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#b2ff8c'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9e9e9e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#ffffff'}]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{color: '#333'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [{color: '#757575'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#dadada'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#616161'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9e9e9e'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#e5e5e5'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#eee'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#a2e1ff'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    }
  }
}
export default mapStylesMixin
