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
  @Input() selectedSingleLang: any;
  @Input() moduleId: any;
  mediaTypeData: string = '';
  _max: Moment;
  _min: Moment;
  _inputCtrl: FormControl = new FormControl();
  // languagesControl = new FormControl([]);
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
      genreId: [],
      fileData1: "",
      fileData2: "",
      fileData3: "",
      fileData4: ""
    },
    uploadtrailer: {
      mediaUrl: "",
      audioSrcUrl: "",
      selectedLanguages: [],
      languageUrls: [],
    },
    uploadFullMedia: {
      series: {
        introUrl: "",
        episodes: []
      },
      Movies: {
        selectedLanguages: [],
        languageUrls: [],
        episodetitle: "",
        mediaUrl: "",
        audioUrl: "",
        introDuration: "",
        skipEnd: ""
      }
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
      return this.isWebSeries = (data === 'Single Media') ? false : true;
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
      this.mediaProvider = response?.data || [];
    })
  }

  uploadImage(event: any, id: number) {
    console.log(event)
    this.file = event.target.files[0]
    // let dataObject:any = 'this'+'.'+'objectURL_'+id
    // console.log(dataObject)
    // if (this.objectURL_1) {
    //   // revoke the old object url to avoid using more memory than needed
    //   URL.revokeObjectURL(this.objectURL_1);
    // }
    // const fileD = event.target.files[0];
    // this.mediaData.mediaInformation.fileData1 = fileD;
    // this.objectURL_1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    if (id === 1) {
      if (this.objectURL_1) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_1);
      }
      const fileD = event.target.files[0];
      this.mediaData.mediaInformation.fileData1 = fileD;
      this.objectURL_1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 2) {
      if (this.objectURL_2) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_2);
      }
      const fileD = event.target.files[0];
      this.mediaData.mediaInformation.fileData2 = fileD;
      this.objectURL_2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 3) {
      if (this.objectURL_3) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_3);
      }
      const fileD = event.target.files[0];
      this.mediaData.mediaInformation.fileData3 = fileD;
      this.objectURL_3 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    } else if (id === 4) {
      if (this.objectURL_4) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(this.objectURL_4);
      }
      const fileD = event.target.files[0];
      this.mediaData.mediaInformation.fileData4 = fileD;
      this.objectURL_4 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    }
  }

  onCatRemoved(cat: string) {
    // const categories = this.languagesControl.value as string[];
    // this.removeFirst(categories, cat);
    // this.languagesControl.setValue(categories);
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

  languageChangeMovie(){
    let selectedlangs = this.languages.filter((lang: any) => { return this.mediaData.uploadFullMedia.Movies.selectedLanguages.includes(lang.id) })
    this.mediaData.uploadFullMedia.Movies.languageUrls = selectedlangs.map((val: any) => {
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

  saveData() {
    console.log(this.mediaData, "this.mediaData")
    let finalData: any = {};
    //append media information
    finalData["mediaInformation[mediaTitle]"] = this.mediaData.mediaInformation.mediaTitle
    finalData["mediaInformation[mediaYear]"] = this._inputCtrl.value
    finalData["vmediaInformation[mediaCertificateId]"] = this.mediaData.mediaInformation.mediaCertificateId
    finalData["mediaInformation[resolution]"] = this.mediaData.mediaInformation.resolution
    finalData["mediaInformation[mediaTypeId]"] = this.mediaData.mediaInformation.mediaTypeId
    finalData["mediaInformation[mediaLength]"] = this.mediaData.mediaInformation.mediaLength
    finalData["mediaInformation[sourceVendor]"] = this.mediaData.mediaInformation.sourceVendor
    finalData["mediaInformation[genreId]"] = this.mediaData.mediaInformation.genreId.join(',')
    finalData["mediaInformation[fileData1]"] = this.mediaData.mediaInformation.fileData1
    finalData["mediaInformation[fileData2]"] = this.mediaData.mediaInformation.fileData2
    finalData["mediaInformation[fileData3]"] = this.mediaData.mediaInformation.fileData3
    finalData["mediaInformation[fileData4]"] = this.mediaData.mediaInformation.fileData4
    //append upload trailer
    finalData["mediaTrailer[mediaUrl]"] = this.mediaData.uploadtrailer.mediaUrl
    finalData["mediaTrailer[audioUrl]"] = this.mediaData.uploadtrailer.audioSrcUrl
    this.mediaData.uploadtrailer.languageUrls.forEach((lang: any, i: any) => {
      finalData[`mediaTrailer[subTitles][${i}][languageId]`] = lang.id;
      finalData[`mediaTrailer[subTitles][${i}][mediaSubtitleUrl]`] = lang.url;
    });
    //append upload full media
    if (this.isWebSeries) {
      finalData["mediaFullVideo[mediaFullVideoIntroUrl]"] = this.mediaData.uploadFullMedia.series.introUrl
      this.mediaData.uploadFullMedia.series.episodes.forEach((episode: any, parentIndex: any) => {
        finalData[`mediaFullVideo[${parentIndex}][mediaFullVideoMediaUrl]`] = episode.mediaUrl;
        finalData[`mediaFullVideo[${parentIndex}][mediaFullVideoAudioUrl]`] = episode.audioUrl;
        finalData[`mediaFullVideo[${parentIndex}][introDuration]`] = episode.introDuration;
        episode.languageUrls.forEach((lang: any, childIndex: any) => {
          finalData[`mediaFullVideo[${parentIndex}][subTitles][${childIndex}][languageId]`] = lang.id
          finalData[`mediaFullVideo[${parentIndex}][subTitles][${childIndex}][mediaSubtitleUrl]`] = lang.url
        });
      });
    }
    if (!this.isWebSeries) {
      // this.mediaData.uploadFullMedia.Movies.forEach((episode: any, parentIndex: any) => {
        finalData[`mediaFullVideo[0][mediaFullVideoMediaUrl]`] =  this.mediaData.uploadFullMedia.Movies.mediaUrl;
        finalData[`mediaFullVideo[0][mediaFullVideoAudioUrl]`] =  this.mediaData.uploadFullMedia.Movies.audioUrl;
        finalData[`mediaFullVideo[0][introDuration]`] =  this.mediaData.uploadFullMedia.Movies.introDuration;
        this.mediaData.uploadFullMedia.Movies.languageUrls.forEach((lang: any, childIndex: any) => {
          finalData[`mediaFullVideo[0][subTitles][${childIndex}][languageId]`] = lang.id
          finalData[`mediaFullVideo[0][subTitles][${childIndex}][mediaSubtitleUrl]`] = lang.url
        });
      // });
    }
    finalData["mediaInformation[mediaIdPrefix]"] = this.selectedSingleLang.name.slice(0, 3)
    finalData["mediaInformation[languageId]"] = this.selectedSingleLang.id
    finalData["mediaInformation[mediaModuleId]"] = this.moduleId

    console.log(finalData,"finaldata")
  }


}
