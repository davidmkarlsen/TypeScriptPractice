import { Loader } from "@googlemaps/js-api-loader"
import axios from 'axios';

const form = document.querySelector('form')!;
const adressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyAgLyCnkIcjQnSMF8-EaunVirXDl_LrkD0';

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = adressInput.value;

    axios
        .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)},+CA&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if(response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }
            const coordinates = response.data.results[0].geometry.location;
            // @ts-ignore
            let map: google.maps.Map;
            const loader = new Loader({
                apiKey: "AIzaSyAgLyCnkIcjQnSMF8-EaunVirXDl_LrkD0",
                version: "weekly",
            });

            loader.load().then(async () => {
                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                map = new Map(document.getElementById('map') as HTMLElement, {
                    center: coordinates,
                    zoom: 8
                });
                new google.maps.Marker({position: coordinates, map: map})
            });
        })
        .catch(err => {
            alert(err.message)
            console.log(err);
        })
}

form.addEventListener('submit', searchAddressHandler);