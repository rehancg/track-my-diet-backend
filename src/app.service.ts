import { Injectable } from '@nestjs/common';
import { Firebase } from './shared/firebase';
import * as sortByDistance from 'sort-by-distance';

@Injectable()
export class AppService {
  async getNearestShops(lat: number, long: number): Promise<object> {
    const origin = { longitude: long, latitude: lat};
    const firebase = await Firebase.getFirebase();
    const result = await firebase.get('Shops/');
    const ids = Object.keys(result);
    const shops = [];
    for (const iterator of ids) {
      const shop = result[iterator];
      const distance = this.getDistance(shop.location.lat, shop.location.long, origin.latitude, origin.longitude);
      shop.distance = distance;
      shops.push(shop);
    }
    shops.sort(function(a, b) {
      return a.distance - b.distance;
    });

    return shops[0];

  }
getDistance(lat1, lon1, lat2, lon2) {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    return dist;
  }
}
