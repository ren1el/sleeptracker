import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {
	bedtime:string;
  waketime:string;
  
  constructor(public sleepService:SleepService, public alertController:AlertController) { }

  ngOnInit() {
  }

  onSubmit() {
    var bed:Date = new Date(this.bedtime);
    var wake:Date = new Date(this.waketime);

    if(this.bedtime === null || this.waketime == null || wake.getTime() < bed.getTime()) {
			this.presentAlert();
		} else {
      this.presentSuccess();
      var data:OvernightSleepData = new OvernightSleepData(bed, wake);
      this.sleepService.logOvernightData(data);
		}
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Something doesn\'t look right',
      message: 'Your times don\'t quite add up. Try again?',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'You have successfully logged your sleep.',
      buttons: ['OK']
    });

    await alert.present();
  }
}