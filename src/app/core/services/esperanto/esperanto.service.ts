import { DictionaryService } from './store/dictionary.service';
import { IWord } from './../../../shared/models/esperanto/word.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EsperantoService {
  constructor(
    private httpClient: HttpClient,
    private dictionaryService: DictionaryService
  ) { }

  /**
   * TODO In the future we must choose JSON or Store. It depences on base we will use.
   */

  /**
   * Pronomoj
   * get pronouns (получить местоимения) JSON
   */
  public getPronounsFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_pronomoj.json');
  }

  /**
   * verboj
   * get verbs (получить глаголы)
   */
  public getVerbsFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_verboj.json');
  }

  /**
   * adjectivoj
   * get adjectives (получить прилашательные)
   */
  public getAdjectivesFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_adjectivoj.json');
  }

  /**
   * demandovortoj
   * get question words (получить вопросительные слова)
   */
  public getDemandoVortojFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_demandovortoj.json');
  }

  /**
   * konjunkcioj
   * get conjunction (получить союзы)
   */
  public getKonjunkciojFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_konjunkcioj.json');
  }

  /**
   * prepozicioj
   * get prepositions (получить предлоги)
   */
  public getPrepoziciojFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_prepozicioj.json');
  }

  /**
   * Pronomoj
   * get pronouns (получить местоимения)
   */
  public getPronouns(): Observable<IWord[]> {
    return this.dictionaryService.getPronomoj();
  }

  /**
   * radiko de la vorto
   * Take root (ПОлучает корень слова)
   * @param type string
   * @param word string
   */
  public makeRoot(type: string, word: string): string {
    switch (type) {
      case 'infinitiveVerb':
        return word.toLowerCase().slice(0, -1);
    }
  }

  /**
   * preterito verbo
   * Create past verb using + is to root (Создает глагол прошедшего воемени путем добавления к корню is)
   * @param verb string
   */
  public makePastVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'is';
  }

  /**
   * nuna verbo
   * Create present verb using + as to root (Создает глагол настоящего воемени путем добавления к корню as)
   * @param verb string
   */
  public makePresentVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'as';
  }

  /**
   * estonta verbo
   * Create future verb using + os to root (Создает глагол будущего воемени путем добавления к корню os)
   * @param verb string
   */
  public makeFutureVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'os';
  }

  /**
   * infinitivo
   * Create infinitive verb by adding i to root (Создаем инфинитив глагола путем добавления к корню i)
   * @param root string
   */
  public makeInfinitiveVerb(root: string): string {
    return root + 'i';
  }

  /**
   * adjektivo
   * Create an adjective by adding a to root (Создаем прилагательное добавлением a к корню)
   * @param root string
   */
  public makeAdjective(root: string): string {
    return root + 'a';
  }

  /**
   * adverbo
   * Create an adverb by adding e to root (Создаем наречие добавлением e к корню)
   * @param root string
   */
  public makeAdverb(root: string): string {
    return root + 'e';
  }

  /**
   * substantivo
   * Create a noun by adding a to the root (Создаем существительное добавлением o к корню)
   * @param root string
   */
  public makeNoun(root: string): string {
    return root + 'o';
  }
}

