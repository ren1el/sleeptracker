import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  sleepinessValue:number;

  constructor(public sleepService:SleepService, public alertController:AlertController) { }

  ngOnInit() {
    this.sleepinessValue = 1;
  }

  onSubmit() {
    var data:StanfordSleepinessData = new StanfordSleepinessData(this.sleepinessValue);
    this.sleepService.logSleepinessData(data);

    this.presentSuccess();
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'You have successfully logged your sleepiness.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
