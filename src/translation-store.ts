import type { i18n } from "i18next";
import { writable, type Readable, type Writable } from "svelte/store";


export interface TranslationService {
    i18n: Readable<i18n>;
}

export class I18NextTranslationStore implements TranslationService {
    public i18n: Writable<i18n>;

    constructor(i18n: i18n) {
        this.i18n = this.createInstance(i18n);
    }

    private createInstance(i18n: i18n): Writable<i18n> {
        const i18n_writable = writable(i18n)

        i18n.on('initialized', () => {
            i18n_writable.set(i18n)
        })
        i18n.on('onLoaded', () => i18n_writable.set(i18n))
        i18n.on('added', () => i18n_writable.set(i18n))
        i18n.on('languageChanged', () => {
            i18n_writable.set(i18n)
        })
        return i18n_writable;
    }
}