import {
  Component, Input, OnInit,
  forwardRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
// import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { cloneDeep } from 'lodash';
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
import { DomSanitizer } from '@angular/platform-browser';
import { CertificationsService } from 'src/app/modules/settings/components/certifications/certifications.service';
import { MediatypeService } from 'src/app/modules/settings/components/media-type/mediatype.service';
import { GenresService } from 'src/app/modules/settings/components/genres/genres.service';
import { ProviderService } from 'src/app/modules/settings/components/media-provider/provider.service';
import { LanguagesService } from 'src/app/modules/settings/components/languages/languages.service';


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
  // languages: string[] = ['Telugu','English', 'Hindi', 'Tamil', 'Kannada'];
  subtitlesAllowed = true;
  mediaSubtitlesAllowed = true;
  isWebSeries = false;
  objectURL_1: any = '';
  objectURL_2: any = '';
  objectURL_3: any = '';
  objectURL_4: any = '';
  file: any
  certification: any = [];
  mediaType: any = [];
  mediaGener: any = [];
  mediaProvider: any = [];
  languages: any = []
  mediaData: any = {
    mediaInformation: {
      mediaTitle: "",
      mediaYear: this._inputCtrl,
      mediaCertificateId: "",
      resolution: "",
      sourceVendor: "",
      mediaTypeId: "",
      mediaLength: "",
      genreId: "",
    },
    uploadtrailer: {
      mediaUrl:"",
      audioSrcUrl:"",
      selectedLanguages: [],
      languageUrls: [],
    },
    uploadFullMedia: {
      series: {
        introUrl:"",
        episodes: []
      },
      Movies: {}
    }
  }
  eachEpisodeData: any = {
    selectedLanguages: [],
    languageUrls: [],
    episodetitle: "",
    mediaUrl: "",
    audioUrl: "",
    introDuration: "",
    skipEnd: ""
  }
  constructor(
    public manageMediaService: ManageMediaService,
    private sanitizer: DomSanitizer,
    public certificationsService: CertificationsService,
    public mediatypeService: MediatypeService,
    private generService: GenresService,
    public providerService: ProviderService,
    public languageService: LanguagesService
  ) {
    this.manageMediaService.mediaType.subscribe(data => {
      this.mediaTypeData = data;
      return this.isWebSeries = (data === 'Movies') ? false : true;
    })
  }



  ngOnInit(): void {
    this.getCertifications();
    this.getType();
    this.getGener();
    this.getProviders();
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.getLanguage().subscribe(response => {
      this.languages = response?.data || [];

    })
  }

  getCertifications() {
    this.certificationsService.getCertification().subscribe(response => {
      this.certification = response?.data || [];
    })
  }

  getType() {
    this.mediatypeService.getType().subscribe(response => {
      this.mediaType = response?.data || [];
    })
  }

  getGener() {
    this.generService.getGener().subscribe(response => {
      this.mediaGener = response?.data || [];
    })
  }

  getProviders() {
    this.providerService.getProvider().subscribe(response => {
      this.mediaGener = response?.data || [];
    })
  }

  uploadImage(event: any, id: number) {
    console.log(event)
    this.file = event.target.files[0]
    // let dataObject:any = 'this'+'.'+'objectURL_'+id
    // console.log(dataObject)
    if (this.objectURL_1) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(this.objectURL_1);
    }
    const fileD = this.file;
    this.objectURL_1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    if (id === 1) {
      if (this.objectURL_1) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_1);
      }
      const fileD = this.file;
      this.objectURL_1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 2) {
      if (this.objectURL_2) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_2);
      }
      const fileD = this.file;
      this.objectURL_2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 3) {
      if (this.objectURL_3) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_3);
      }
      const fileD = this.file;
      this.objectURL_3 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 4) {
      if (this.objectURL_4) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_4);
      }
      const fileD = this.file;
      this.objectURL_4 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    }
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
    if (!this._isYearEnabled(_moment(chosenDate, "DD/MM/YYYY").year())) {
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

  addEpisode() {
    this.mediaData.uploadFullMedia.series.episodes.push(cloneDeep(this.eachEpisodeData))
  }
  languageChange(episodes: any) {
    let x = episodes;
    let selectedlangs = this.languages.filter((lang: any) => { return episodes.selectedLanguages.includes(lang.id) })
    x.languageUrls = selectedlangs.map((val: any) => {
      val.url = ""
      return val
    })
  }

  languageChangeTrailer() {
    let selectedlangs = this.languages.filter((lang: any) => { return this.mediaData.uploadtrailer.selectedLanguages.includes(lang.id) })
    this.mediaData.uploadtrailer.languageUrls = selectedlangs.map((val: any) => {
      val.url = ""
      return val
    })
  }


}
