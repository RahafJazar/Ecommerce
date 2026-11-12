import { ApplicationInitStatus, inject, Service, Signal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export type AppLang = 'en' | 'ar';
@Service()
export class MyTranslateService {
    private readonly translateService = inject(TranslateService);
    private readonly STORAGE_KEY = signal<string>('lang');
    private readonly DEFAULT_LANG: Signal<AppLang> = signal<AppLang>('ar');

    //get the current language
    get currentLang(): AppLang {
        return this.translateService.currentLang() as AppLang || this.DEFAULT_LANG()
    }

    //is the language arabic

    get isArabic(): boolean {
        return this.currentLang === 'ar'
    }


    //change language 
    changeLang(language: AppLang): void {
        this.translateService.use(language).subscribe(() => {
            this.updateDocument(language);
            localStorage.setItem(this.STORAGE_KEY(), language);
        })
    }

    //setup the direction 
    private updateDocument(language: AppLang) {

    }


    initialize() {
        this.translateService.addLangs(['ar', 'en']);
        let language = 'en';
        try {
            language = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en';
        }
        catch {

        }
    }


}
