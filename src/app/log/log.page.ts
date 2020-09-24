import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  data:any = this.allSleepData;

  constructor(public sleepService:SleepService, public alertController:AlertController) { }

  ngOnInit() {
    console.log(this.data);
  }

	get allSleepData() {
		return SleepService.AllSleepData.sort((a, b) => {
      return b.loggedAt.getTime() - a.loggedAt.getTime();
    });
  }
  
  clearStorage() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Are you sure you want to clear all of your logs?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.sleepService.clearStorage();
          }
        }]
    });

    await alert.present();
  }

}
