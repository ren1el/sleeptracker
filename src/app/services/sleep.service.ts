import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = false;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

  constructor(private storage:Storage) {
  	if(SleepService.LoadDefaultData) {
      this.addDefaultData();
  		SleepService.LoadDefaultData = false;
    }

    this.getStorageData();
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 17, 2019 01:03:00'), new Date('November 17, 2019 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 17, 2019 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 18, 2019 23:11:00'), new Date('November 18, 2019 08:03:00')));
  }

  public logOvernightData(sleepData:OvernightSleepData) {
  	SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);

    this.storage.set(sleepData.id, sleepData);
  }

  public logSleepinessData(sleepData:StanfordSleepinessData) {
  	SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    
    this.storage.set(sleepData.id, sleepData);
  }

  getStorageData() {
    this.storage.forEach((v, k) => {
      if(v.type == 'sleep') {
        var newData:OvernightSleepData = new OvernightSleepData(new Date(v['sleepStart']), new Date(v['sleepEnd']));
        SleepService.AllSleepData.push(newData);
      } else if (v.type == 'sleepiness') {
        var sleepinessData:StanfordSleepinessData = new StanfordSleepinessData(v.loggedValue, new Date(v.loggedAt));
        SleepService.AllSleepData.push(sleepinessData);
      }
    });
    SleepService.AllSleepData.sort((a, b) => {
      return b.loggedAt.getTime() - a.loggedAt.getTime();
    });
  }

  clearStorage() {
    SleepService.AllSleepData = [];
    this.storage.clear();
  }
}
