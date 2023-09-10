import { FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject, numberAttribute } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-google-map-angular',
  templateUrl: './google-map-angular.component.html',
  styleUrls: ['./google-map-angular.component.css']
})

export class GoogleMapAngularComponent implements OnInit, AfterViewInit{
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  }

  originLatLng?: google.maps.LatLngLiteral
  destinationLatLng?: google.maps.LatLngLiteral

  markers: google.maps.Marker[] = []
  originMarker ?: google.maps.Marker
  destinationMarker ?: google.maps.Marker

  @ViewChild('googleMap')
  googleMap !: GoogleMap

  originAutoComplete!: google.maps.places.Autocomplete | undefined;
  destinationAutoComplete!: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = "";

  travelForm !: FormGroup
  fb = inject(FormBuilder)

  ngOnInit(): void {
    this.travelForm = this.createForm()
    this.center = {lat : 1.3521 , lng: 103.8198}
    // this.getCurrentLocation();
  }

  originChange() {
    const input = document.getElementById('origin') as HTMLInputElement
    this.locationChange(input, 0)
  }

  destinationChange() {
    const input = document.getElementById('destination') as HTMLInputElement
    this.locationChange(input, 1)
  }

  locationChange(input : HTMLInputElement, markerIndex: number) {
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        //trying to add and remove markers, check if marker exists
        this.markers.push(this.addMarker(place))
        markerIndex == 1 ? this.destinationLatLng = place.geometry.location.toJSON() : this.originLatLng = place.geometry.location.toJSON()
        //store location of the marker
        this.getRoute()
      } else {
        window.alert("No details avaiable for input: " + place?.name + "'")
      }
  } )
  }

  getRoute() {

    console.log(this.travelForm.value['mode'])

    if (this.destinationLatLng && this.originLatLng && this.travelForm.value['mode']) {

     const directionsService = new google.maps.DirectionsService();
     const directionsRenderer = new google.maps.DirectionsRenderer({ map : this.googleMap.googleMap});
     const req = {
        origin: this.originLatLng,
        destination: this.destinationLatLng,
        travelMode: this.travelForm.value['mode']
      }
      directionsService.route(req, function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result)
        }
      })
    }
  }

  addMarker(place : google.maps.places.PlaceResult) {
    return new google.maps.Marker(
      {
        position: place.geometry!.location,
        map: this.googleMap.googleMap
      }
    )
  }

  resetFields () {
    this.travelForm.controls['origin'].reset()
    this.travelForm.controls['destination'].reset()
    this.markers.forEach((marker, index) => {
      this.markers[index].setMap(null)
    })
  }

  processForm() {

  }

  ngAfterViewInit(): void {
    // this.getCurrentLocation();
  }



  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom < this.options.minZoom!) this.zoom--;
  }

    // getCurrentLocation() {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //   });
    // }

  onMapClick(event : any) {
    console.log(Object.values(event.latLng.toJSON()))
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: Object.values(event.latLng.toJSON())[0] as number,
        lng: Object.values(event.latLng.toJSON())[1] as number,
      };
      const newPos =  {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      // this.addMarker(newPos)
    });

  }

  // addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
  //   console.log("placing marker")
  //     new google.maps.Marker({
  //       position: position,
  //       map : this.googleMap
  //     }
  //     )
  // }

  createForm() {
    return this.fb.group(
      {origin: this.fb.control<string>(''),
      destination: this.fb.control<string>(''),
      mode: this.fb.control<string>('DRIVING'),
      startDate: this.fb.control<Date>(new Date(0)),
      endDate: this.fb.control<Date>(new Date(0))}
    )
  }


}
