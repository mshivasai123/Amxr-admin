import {
  Component, Input, OnInit,
  forwardRef,
  Output,
  EventEmitter
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
import { API_ENDPOINT } from 'src/app/constants';
import { MediaService } from 'src/app/shared/services/media.service';


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
  @Input() editMediaData: any;
  @Input() isEdit:any;
  @Input() completeGetData:any;
  @Input() batchAddorCreate:any;
  @Output() closeModal = new EventEmitter<string>();
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
  languages: any = [];
  isDuplicateMedia: any = false;
  apiEndpoint = API_ENDPOINT
  mediaData: any = {
    mediaInformation: {
      mediaTitle: "",
      mediaYear: this._inputCtrl,
      mediaCertificateId: "",
      resolution: "",
      mediaSource: "",
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
      showSubtitle:true,
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
        showSubtitle: true,
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
    skipEnd: "",
    mediaEpisodePoster:"",
    mediaEpisodePosterUrl:"",
    showSubtitle: true
  }
  constructor(
    public manageMediaService: ManageMediaService,
    private sanitizer: DomSanitizer,
    public certificationsService: CertificationsService,
    public mediatypeService: MediatypeService,
    private generService: GenresService,
    public providerService: ProviderService,
    public languageService: LanguagesService,
    public mediaService: MediaService
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
    this.isDuplicateMedia= this.completeGetData?.duplicate ?? false;
    if(this.isEdit){
      console.log(this.editMediaData,this.batchAddorCreate,"editMediaData")
      this.mediaData.mediaInformation.mediaTitle = this.editMediaData?.mediaTitle ?? '';
      // this.mediaData.mediaInformation.mediaYear = this.editMediaData?.mediaYear.toString() ?? '';
      _moment(this.editMediaData?.mediaYear).set({ date: 1 });
      this._inputCtrl.setValue(_moment(new Date(this.editMediaData?.mediaYear,0,0)).set({ date: 1 }),{ emitEvent: false });
      this.isDuplicateMedia = this.editMediaData?.isDefault ?? false;
      this.mediaData.mediaInformation.mediaCertificateId = this.editMediaData?.mediaCertificateId ?? '';
      this.mediaData.mediaInformation.resolution = this.editMediaData?.resolution ?? '';
      this.mediaData.mediaInformation.mediaTypeId = this.editMediaData?.mediaTypeId ?? '';
      this.mediaData.mediaInformation.mediaLength = this.editMediaData?.mediaLength ?? '';
      this.mediaData.mediaInformation.mediaSource = this.editMediaData?.source ?? '';
      this.mediaData.mediaInformation.genreId = this.editMediaData?.genreId.split(',') ?? [];
      this.mediaData.mediaInformation.sourceVendor = this.editMediaData?.sourceVendor ?? '';
      this.objectURL_1 = this.apiEndpoint + this.editMediaData?.mediaInformationIcon1 ?? '';
      this.objectURL_2 = this.apiEndpoint + this.editMediaData?.mediaInformationIcon2 ?? '';
      this.objectURL_3 = this.apiEndpoint + this.editMediaData?.mediaInformationIcon3 ?? '';
      this.objectURL_4 = this.apiEndpoint + this.editMediaData?.mediaInformationIcon4 ?? '';
      this.mediaData.uploadtrailer.mediaUrl = this.editMediaData?.media_trailer?.mediaUrl ?? '';
      this.mediaData.uploadtrailer.audioSrcUrl = this.editMediaData?.media_trailer?.audioUrl ?? '';
      this.mediaData.uploadtrailer.showSubtitle = this.editMediaData?.media_trailer?.showSubtitle ?? false;
      this.mediaData.uploadtrailer.languageUrls= this.editMediaData?.media_trailer?.media_subtitles.map((val:any)=>{
        val.language.url=val?.mediaSubtitleUrl??'';
        this.mediaData.uploadtrailer.selectedLanguages.push(val.languageId);
        return val.language;
      })
      this.editMediaData.media_full_videos.forEach((val: any,i:number) => {
        let eachEpisode = cloneDeep(this.eachEpisodeData)
        if(!this.isWebSeries && i===0){
          this.mediaData.uploadFullMedia.Movies.mediaUrl = val.mediaFullVideoMediaUrl
          this.mediaData.uploadFullMedia.Movies.audioUrl = val.mediaFullVideoAudioUrl
          this.mediaData.uploadFullMedia.Movies.introDuration = val.introDuration
          this.mediaData.uploadFullMedia.Movies.skipEnd = val.skipEnd
          this.mediaData.uploadFullMedia.Movies.showSubtitle = val.showSubtitle
          this.mediaData.uploadFullMedia.Movies.languageUrls =val.media_subtitles.map((lang:any)=>{
            lang.language.url=lang?.mediaSubtitleUrl??'';
            this.mediaData.uploadFullMedia.Movies.selectedLanguages.push(lang.languageId);
            return lang.language;
          })
        }
        if(this.isWebSeries){
          if(i==0)this.mediaData.uploadFullMedia.series.introUrl = val.mediaFullVideoIntroUrl
          eachEpisode.mediaUrl = val.mediaFullVideoMediaUrl
          eachEpisode.audioUrl = val.mediaFullVideoAudioUrl
          eachEpisode.introDuration = val.introDuration
          eachEpisode.skipEnd = val.skipEnd
          eachEpisode.episodetitle = val.mediaFullVideoTitle
          eachEpisode.showSubtitle = val.showSubtitle
          eachEpisode.mediaEpisodePosterUrl = this.apiEndpoint + val.mediaEpisodePoster;
          eachEpisode.languageUrls =val.media_subtitles.map((lang:any)=>{
            lang.language.url=lang?.mediaSubtitleUrl??'';
            eachEpisode.selectedLanguages.push(lang.languageId);
            return lang.language;
          })
          this.mediaData.uploadFullMedia.series.episodes.push(eachEpisode)
        }

      });
      console.log(this.mediaData,"after assigning vals")
    }
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
    // let existUrls = this.mediaData.uploadtrailer.languageUrls.map((val:any)=>val.id)
    let selectedlangs = this.languages.filter((lang: any) => { return this.mediaData.uploadtrailer.selectedLanguages.includes(lang.id) })
    this.mediaData.uploadtrailer.languageUrls = selectedlangs.map((val: any) => {
      val.url = ""
      return val
    })
  }

  uploadEpisodePoster(event:any,episodes: any){
    // this.file = event.target.files[0]
      if (episodes.mediaEpisodePosterUrl) {
        // revoke the old object url to avoid using more memory than needed
        URL.revokeObjectURL(episodes.mediaEpisodePosterUrl); 
      }
      const fileD = event.target.files[0];
      episodes.mediaEpisodePoster = fileD;
      episodes.mediaEpisodePosterUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));

  }

  saveData() {
    console.log(this.mediaData, "this.mediaData")
    let finalData: any = {};
    //append media information
    finalData["mediaInformation[mediaTitle]"] = this.mediaData.mediaInformation.mediaTitle
    finalData["mediaInformation[mediaYear]"] = this._inputCtrl.value.year()
    finalData["mediaInformation[mediaCertificateId]"] = this.mediaData.mediaInformation.mediaCertificateId
    finalData["mediaInformation[resolution]"] = this.mediaData.mediaInformation.resolution
    finalData["mediaInformation[mediaTypeId]"] = this.mediaData.mediaInformation.mediaTypeId
    finalData["mediaInformation[mediaLength]"] = this.mediaData.mediaInformation.mediaLength
    finalData["mediaInformation[sourceVendor]"] = this.mediaData.mediaInformation.sourceVendor
    finalData["mediaInformation[source]"] = this.mediaData.mediaInformation.mediaSource
    finalData["mediaInformation[isDefault]"] = this.isDuplicateMedia;
    finalData["mediaInformation[genreId]"] = this.mediaData.mediaInformation.genreId.join(',')
   
    //append upload trailer
    finalData["mediaTrailer[mediaUrl]"] = this.mediaData.uploadtrailer.mediaUrl
    finalData["mediaTrailer[audioUrl]"] = this.mediaData.uploadtrailer.audioSrcUrl
    finalData["mediaTrailer[showSubtitle]"] = this.mediaData.uploadtrailer.showSubtitle
    this.mediaData.uploadtrailer.languageUrls.forEach((lang: any, i: any) => {
      finalData[`mediaTrailer[subTitles][${i}][languageId]`] = lang.id;
      finalData[`mediaTrailer[subTitles][${i}][mediaSubtitleUrl]`] = lang.url;
    });
    //append upload full media
    if (this.isWebSeries) {
      finalData["mediaFullVideo[0][mediaFullVideoIntroUrl]"] = this.mediaData.uploadFullMedia.series.introUrl
      this.mediaData.uploadFullMedia.series.episodes.forEach((episode: any, parentIndex: any) => {
        finalData[`mediaFullVideo[${parentIndex}][mediaFullVideoMediaUrl]`] = episode.mediaUrl;
        finalData[`mediaFullVideo[${parentIndex}][mediaFullVideoAudioUrl]`] = episode.audioUrl;
        finalData[`mediaFullVideo[${parentIndex}][introDuration]`] = episode.introDuration;
        finalData[`mediaFullVideo[${parentIndex}][mediaIsEpisode]`] = true;
        finalData[`mediaFullVideo[${parentIndex}][showSubtitle]`] = episode.showSubtitle;
        finalData[`mediaFullVideo[${parentIndex}][mediaFullVideoTitle]`] = episode.episodetitle
        finalData[`mediaFullVideo[${parentIndex}][skipEnd]`] = episode.skipEnd
        finalData[`mediaFullVideo[${parentIndex}][mediaEpisodePoster]`] = episode.mediaEpisodePoster
        finalData[`mediaFullVideo[${parentIndex}][mediaEpisodeOrder]`] = parentIndex 
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
        finalData[`mediaFullVideo[0][mediaIsEpisode]`] =  false;
        finalData[`mediaFullVideo[0][showSubtitle]`] =  this.mediaData.uploadFullMedia.Movies.showSubtitle;
        finalData[`mediaFullVideo[0][skipEnd]`] =  this.mediaData.uploadFullMedia.Movies.skipEnd;
        finalData[`mediaFullVideo[0][mediaEpisodeOrder]`] =  0;
        this.mediaData.uploadFullMedia.Movies.languageUrls.forEach((lang: any, childIndex: any) => {
          finalData[`mediaFullVideo[0][subTitles][${childIndex}][languageId]`] = lang.id
          finalData[`mediaFullVideo[0][subTitles][${childIndex}][mediaSubtitleUrl]`] = lang.url
        });
      // });
    }
    finalData["mediaInformation[mediaIdPrefix]"] = this.selectedSingleLang.name.slice(0, 3)
    finalData["mediaInformation[languageId]"] = this.selectedSingleLang.id
    finalData["mediaInformation[mediaModuleId]"] = this.moduleId

    if(this.batchAddorCreate === 'attachBatchId'){
     finalData["mediaInformation[mediaBatchId]"] = this.editMediaData.mediaBatchId
    }
    if(this.isEdit && !this.batchAddorCreate){
      finalData["fileData1"] = this.mediaData.mediaInformation.fileData1 ? this.mediaData.mediaInformation.fileData1 : this.editMediaData?.mediaInformationIcon1
      finalData["fileData2"] = this.mediaData.mediaInformation.fileData2 ? this.mediaData.mediaInformation.fileData2 : this.editMediaData?.mediaInformationIcon2
      finalData["fileData3"] = this.mediaData.mediaInformation.fileData3 ? this.mediaData.mediaInformation.fileData3 : this.editMediaData?.mediaInformationIcon3
      finalData["fileData4"] = this.mediaData.mediaInformation.fileData4 ? this.mediaData.mediaInformation.fileData4 : this.editMediaData?.mediaInformationIcon4
     this.editMedia(finalData)
     return
    }else if(this.isEdit && this.batchAddorCreate === 'attachBatchId'){
      finalData["fileData1"] = this.mediaData.mediaInformation.fileData1 ? this.mediaData.mediaInformation.fileData1 : this.editMediaData?.mediaInformationIcon1
      finalData["fileData2"] = this.mediaData.mediaInformation.fileData2 ? this.mediaData.mediaInformation.fileData2 : this.editMediaData?.mediaInformationIcon2
      finalData["fileData3"] = this.mediaData.mediaInformation.fileData3 ? this.mediaData.mediaInformation.fileData3 : this.editMediaData?.mediaInformationIcon3
      finalData["fileData4"] = this.mediaData.mediaInformation.fileData4 ? this.mediaData.mediaInformation.fileData4 : this.editMediaData?.mediaInformationIcon4
     this.addMedia(finalData)
     return
    } else {
      finalData["fileData1"] = this.mediaData.mediaInformation.fileData1
      finalData["fileData2"] = this.mediaData.mediaInformation.fileData2
      finalData["fileData3"] = this.mediaData.mediaInformation.fileData3
      finalData["fileData4"] = this.mediaData.mediaInformation.fileData4
    }
    console.log(finalData,"finaldata")
    this.addMedia(finalData);
  }

  editMedia(finalData:any){
    this.mediaService.editMediaInformation(finalData,this.editMediaData.id).subscribe((data)=>{
      this.closeModal.emit("close");
      console.log(data,"data")
    },(err)=>{
      console.log(err,"err")
    })
  }

  addMedia(finalData:any){
    this.mediaService.addMediaInformation(finalData).subscribe((data)=>{
      this.closeModal.emit("close");
      console.log(data,"data")
    },(err)=>{
      console.log(err,"err")
    })
  }


}
