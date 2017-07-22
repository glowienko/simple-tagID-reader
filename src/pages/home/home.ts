import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, platform: Platform, private nfc: NFC) {
    nfc.enabled().then(
      (info) => {
        this.onNfcEnabled(info);
      },
      (reason) => this.onNfcDisabled(reason));

    platform.ready().then(() => {
      nfc.addNdefListener(this.tagReadSuccess, this.failureReadTag).subscribe(
        (tagEvent) => this.tagReadSuccess(tagEvent),
        (error) => this.failureReadTag(error)
      );

      nfc.addTagDiscoveredListener(this.tagReadSuccess, this.failureReadTag).subscribe(
        (tagEvent) => this.tagReadSuccess(tagEvent),
        (error) => this.failureReadTag(error)
      );
    });
  }

  tagReadSuccess(tagEvent: any) {
    this.popAlertOnDataRead(tagEvent.tag);
  }

  failureReadTag(error) {
    let alert = this.alertCtrl.create({
      title: 'Tag read failure!',
      message: error,
      buttons: ['Ok']
    });
    alert.present();
  }

  popAlertOnDataRead(tagJson: any) {
    let alert = this.alertCtrl.create({
      title: 'Tag read success',
      subTitle: 'Tag ID :',
      message: JSON.stringify(tagJson.id),
      buttons: ['Ok']
    });
    alert.present();
  }

  onNfcEnabled(info) {
  }

  onNfcDisabled(reason) {
    let alert = this.alertCtrl.create({
      title: 'Switch on NFC in your smartphone',
      buttons: ['Ok']
    });
    alert.present();
  }
}
