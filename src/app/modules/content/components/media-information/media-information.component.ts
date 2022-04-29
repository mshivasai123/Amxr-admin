import { Component, Input, OnInit,
  forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
// import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ManageMediaService } from '../../manage-media.service';


export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-media-information',
  templateUrl: './media-information.component.html',
  styleUrls: ['./media-information.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediaInformationComponent),
      multi: true,
    },
  ],
})

export class MediaInformationComponent implements OnInit {
  @Input() selectedLanguages: any = [];
  @Input() mainLanguage: any = '';
  mediaTypeData: string = '';
  _max: Moment;
  _min: Moment;
  _inputCtrl: FormControl = new FormControl();
  languagesControl = new FormControl([]);
  languages: string[] = ['Telugu','English', 'Hindi', 'Tamil', 'Kannada'];
  subtitlesAllowed = true;
  mediaSubtitlesAllowed = true;
  isWebSeries = false;

  constructor(public manageMediaService : ManageMediaService) {
    this.manageMediaService.mediaType.subscribe(data=>{
      this.mediaTypeData = data;
      return this.isWebSeries = (data === 'Movies') ? false : true;
    })
   }

  ngOnInit(): void {
    console.log(this.selectedLanguages, this.mainLanguage);
  }

  onCatRemoved(cat: string) {
    const categories = this.languagesControl.value as string[];
    this.removeFirst(categories, cat);
    this.languagesControl.setValue(categories); 
  }

  toggleView() {
    this.isWebSeries = !this.isWebSeries;
  }

  private removeFirst(array: any, toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  _yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    // console.log(chosenDate);
    
    datepicker.close();
    // let  chosenDates = _moment(chosenDate,"DD/MM/YYYY").year();
    // console.log(chosenDates);
    if (!this._isYearEnabled(_moment(chosenDate,"DD/MM/YYYY").year())) {
      return;
    }

    _moment(chosenDate).set({ date: 1 });

    this._inputCtrl.setValue(chosenDate, { emitEvent: false });
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  onChange = (year: Date) => { };
  onTouched = () => { };

    /** Whether the given year is enabled. */
    private _isYearEnabled(year: number) {
      // disable if the year is greater than maxDate lower than minDate
      if (
        year === undefined ||
        year === null ||
        (this._max && year > this._max.year()) ||
        (this._min && year < this._min.year())
      ) {
        return false;
      }
  
      return true;
    }

}
