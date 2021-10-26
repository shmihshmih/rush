import {Component, OnDestroy, OnInit} from '@angular/core';
import {IWord} from '../../../../shared/models/esperanto/word.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EscSettingsPopupComponent} from '../../components/esc-settings-popup/esc-settings-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {setSelectedWordLists} from '../../../../state/languages/words/words.actions';
import {selectWordsFromSelectedLists} from '../../../../state/languages/words/words.selectors';

@Component({
  selector: 'app-english-sentences-creator',
  templateUrl: './english-sentences-creator.component.html',
  styleUrls: ['./english-sentences-creator.component.scss']
})
export class EnglishSentencesCreatorComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  // все используемые слова в предложении
  pronouns: IWord[];
  verbs: IWord[];
  // гласные
  vowels = ['a', 'e', 'i', 'u', 'o'];
  // согласные
  consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  // времена
  times = [
    'Present Simple', 'Past Simple', 'Future Simple', 'Present Continues', 'Past Continues', 'Future Continues',
    'Present Perfect', 'Past Perfect', 'Future Perfect', 'Present Perfect Continues', 'Past Perfect Continues',
    'Future Perfect Continues'
  ];
  // типы предложений
  sentenceType: ['affirmative', 'interrogative', 'negative'] = ['affirmative', 'interrogative', 'negative'];
  randomSentence: {
    Time: string;
    SentenceType: string;
    Pronoun: IWord;
    Verb: IWord;
    answer: string;
  } = {
    Time: '',
    SentenceType: '',
    Pronoun: null,
    Verb: null,
    answer: ''
  };
  isShowAnswer = false;

  allWords$ = this.store.select(selectWordsFromSelectedLists);

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {
    // инициализация конструктора, включает в себя загрузку слов (местоимения, глаголы)
    this.store.dispatch(setSelectedWordLists({selectedWordLists: ['pronomoj', 'verbs']}));
    this.allWords$.pipe().subscribe(words => {
      this.pronouns = words.filter(word => word.word_type.includes('pronomoj'));
      this.verbs = words.filter(word => word.word_type.includes('verbs'));
      this.createRandomSentence();
    });
  }

  ngOnInit(): void {
  }

  // sentence type переводчик
  sentenceTypeTranslation(sentenceType): string {
    switch (sentenceType) {
      case 'affirmative':
        return 'утвердительное';
        break;
      case 'interrogative':
        return 'вопросительное';
        break;
      case 'negative':
        return 'отрицательное';
        break;
    }
  }

  // Прибавления окончания s к английским словам
  wordWith_s(word: string): string {
    // tslint:disable-next-line:variable-name
    let wordWith_S: string;
    const lastLetter = word[word.length - 1].toLowerCase();
    const preLastLetter = word[word.length - 2].toLowerCase();
    // если кончается на s x z o ss sh ch то окончанием становится es
    if ((lastLetter === 's')
      || ((lastLetter) === 'x')
      || ((lastLetter) === 'z')
      || ((preLastLetter + lastLetter) === 'ss')
      || ((preLastLetter + lastLetter) === 'sh')
      || ((preLastLetter + lastLetter) === 'ch')
    ) {
      // если кончается на о
    } else if ((lastLetter) === 'o') {
      // если на о и перед ней согласная
      // tslint:disable-next-line:no-bitwise
      if (~this.consonants.indexOf(preLastLetter)) {
        wordWith_S = word + 'es';
      }
      // если на о и перед ней гласная
      // tslint:disable-next-line:no-bitwise
      if (~this.vowels.indexOf(preLastLetter)) {
        wordWith_S = word + 's';
      }
    } else if (preLastLetter + lastLetter === 'th') {
      wordWith_S = word + 's';
    } else {
      // если заканчивается на y
      if (lastLetter === 'y') {
        // если предпоследняя - гласная
        // tslint:disable-next-line:no-bitwise
        if (~this.consonants.indexOf(preLastLetter)) {
          wordWith_S = word.substring(0, word.length - 1) + 'ies';
        }
        // если предпоследняя - согласная
        // tslint:disable-next-line:no-bitwise
        if (~this.vowels.indexOf(preLastLetter)) {
          wordWith_S = word + 's';
        }
      } else {
        // по умолчанию просто s
        wordWith_S = word + 's';
      }
    }
    return wordWith_S;
  }

  // Прибавления окончания d к английским глаголам (делаем прошедшее время глогала)
  verbWith_d(verb: IWord): string {
    // tslint:disable-next-line:variable-name
    let verbWith_d: string;
    let vowelNumber = 0;
    let consonantNumber = 0;
    const lastLetter = verb.english[verb.english.length - 1];
    const preLastLetter = verb.english[verb.english.length - 2];
    const verbArr = verb.english.toLowerCase().split('');

    // подсчитываем кол-во букв. Если там одна гласная, то в конце удваиваем последнюю букву и добавляем окончание в итоге далее.
    verbArr.forEach(letter => {
      // tslint:disable-next-line:no-bitwise
      if (~this.consonants.indexOf(letter)) {
        consonantNumber++;
      }
      // tslint:disable-next-line:no-bitwise
      if (~this.vowels.indexOf(letter)) {
        vowelNumber++;
      }
    });

    // если есть вторая форма глагола, т.е. он нестандартный - возвращаем ее
    if (verb && verb.extra_data && verb.extra_data.englishSecondForm) {
      verbWith_d = verb.extra_data.englishSecondForm;
    } else {
      // если кончается на e или ee - просто добавляется d
      if ((verb.english[verb.english.length - 1] === 'e')
        || (verb.english.substring(verb.english.length - 2, verb.english.length) === 'ee')) {
        verbWith_d = verb.english + 'd';
        // если последняя y и предпоследняя - согласная - меняется на ied
        // tslint:disable-next-line:no-bitwise
      } else if (lastLetter === 'y' && ~this.consonants.indexOf(preLastLetter)) {
        verbWith_d = verb.english.substring(0, verb.english.length - 1) + 'ied';
        // если оканчивается на ic - меняется на ick и добавляется ed
      } else if (preLastLetter + lastLetter === 'ic') {
        verbWith_d = verb.english.substring(0, verb.english.length - 2) + 'ick' + 'ed';
        // если слово короткое, или в слове одна гласная, или предпоследняя буква - ударная гласная, то последнюю удваиваем и +ed.
        // И если последняя не y (оно тоже согласная)
        // tslint:disable-next-line:no-bitwise
      } else if (~this.consonants.indexOf(lastLetter)
        && (vowelNumber === 1)
        // tslint:disable-next-line:no-bitwise
        && ~this.vowels.indexOf(preLastLetter)
        && lastLetter !== 'y'
        && lastLetter !== 'x'
        && lastLetter !== 'w'
        && lastLetter !== preLastLetter) {
        verbWith_d = verb.english + verb.english[verb.english.length - 1] + 'ed';
        // во всех остальных случаях по умолчанию добавляем просто ed
      } else {
        verbWith_d = verb.english + 'ed';
      }
    }
    return verbWith_d;
  }

  // Прибавления окончания ing к английским глаголам
  wordWith_ing(word: IWord): string {
    // tslint:disable-next-line:variable-name
    let wordWith_ing: string;
    const lastLetter = word.english[word.english.length - 1];
    const preLastLetter = word.english[word.english.length - 2];
    let vowelNumber = 0;
    let consonantNumber = 0;
    const wordLettersArr = word.english.toLowerCase().split('');

    // подсчитываем кол-во букв. Если там одна гласная, то в конце удваиваем последнюю букву и добавляем окончание в итоге далее.
    wordLettersArr.forEach(letter => {
      // tslint:disable-next-line:no-bitwise
      if (~this.consonants.indexOf(letter)) {
        consonantNumber++;
      }
      // tslint:disable-next-line:no-bitwise
      if (~this.vowels.indexOf(letter)) {
        vowelNumber++;
      }
    });

    // если слово - исключение и у него есть свое написание
    if (word && word.extra_data && word.extra_data.englishWithIng) {
      wordWith_ing = word.extra_data.englishWithIng;
      // все остальные случаи
    } else {

      // -2. Если глагол заканчивается на сочетание букв «ic»,
      // то при прибавлении -ing, суффикс -ic меняется на -ick.
      if (preLastLetter.toLowerCase() === 'i' && lastLetter.toLowerCase() === 'c') {
        wordWith_ing = word.english.slice(0, word.english.length - 2) + 'icking';
      } else

        // -1. Если глагол заканчивается на сочетание букв «ie»,
        // то при прибавлении -ing суффикс -ie меняется на букву «y».
      if (preLastLetter.toLowerCase() === 'i' && lastLetter.toLowerCase() === 'e') {
        wordWith_ing = word.english.slice(0, word.english.length - 2) + 'ying';
      } else

        // 0. Если глагол оканчивается на ee, то просто + ing.
      if (lastLetter.toLowerCase() === 'e' && preLastLetter.toLowerCase() === 'e') {
        wordWith_ing = word.english + 'ing';
      } else

        // 1. Если глагол оканчивается на немую гласную букву е, то эта буква убирается.
      if (lastLetter.toLowerCase() === 'e') {
        wordWith_ing = word.english.slice(0, word.english.length - 1) + 'ing';
      } else

        // 2. Если глагол оканчивается на гласную букву y, то окончание ing добавляется после у.
      if (lastLetter.toLowerCase() === 'y') {
        wordWith_ing = word.english + 'ing';
      } else

        // 3. В случаях, когда глагол оканчивается на закрытый слог под ударением, то конечная согласная удваивается.
      if (
        (vowelNumber === 1)
        // tslint:disable-next-line:no-bitwise
        && (~this.vowels.indexOf(preLastLetter))
        // tslint:disable-next-line:no-bitwise
        && (~this.consonants.indexOf(lastLetter))
        && !((lastLetter === 'w')
          || ((lastLetter) === 'x'))) {
        wordWith_ing = word.english + lastLetter + 'ing';
      } else

        // 4. В британском английском в словах, оканчивающихся на букву l,
        // перед которой стоит короткий гласный звук, при добавлении окончания ing буква l удваивается.
        // tslint:disable-next-line:no-bitwise
      if (lastLetter === 'l' && ~this.vowels.indexOf(preLastLetter)) {
        wordWith_ing = word.english + lastLetter + 'ing';
      } else

        // 5. Если глагол оканчивается на букву r в ударном слоге, то r также удваивается.
        // tslint:disable-next-line:no-bitwise
      if (lastLetter === 'r' && ~this.vowels.indexOf(preLastLetter)) {
        wordWith_ing = word.english + lastLetter + 'ing';
      } else {
        wordWith_ing = word.english + 'ing';
      }
    }
    return wordWith_ing;
  }

  // создание примера
  createRandomSentence(): void {

    this.randomSentence = {
      Time: this.getRandomTime(),
      SentenceType: this.getRandomSentenceType(),
      Pronoun: this.getRandomPronoun(),
      Verb: this.getRandomVerb(),
      answer: ''
    };

    if (!this.randomSentence.Pronoun || !this.randomSentence.Verb) {
      return;
    }

    switch (this.randomSentence.Time) {
      case 'Present Simple':
        this.createPresentSimpleSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Past Simple':
        this.createPastSimpleSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Future Simple':
        this.createFutureSimpleSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Present Continues':
        this.createPresentContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Past Continues':
        this.createPastContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Future Continues':
        this.createFutureContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Present Perfect':
        this.createPresentPerfectSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Past Perfect':
        this.createPastPerfectSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Future Perfect':
        this.createFuturePerfectSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Present Perfect Continues':
        this.createPresentPerfectContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Past Perfect Continues':
        this.createPastPerfectContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
      case 'Future Perfect Continues':
        this.createFuturePerfectContinuesSentence(this.randomSentence.SentenceType, this.randomSentence.Pronoun, this.randomSentence.Verb);
        break;
    }
  }

  // добавляется ли s в зависимости от местоимения (для do\does etc)
  hasSdependsOnPronoun(pronoun): any {
    const pronounsWithS = ['he', 'she', 'it'];
    return !!pronounsWithS.includes(pronoun.english.toLowerCase());
  }

  // корректный глагол to be в зависимости от местоимения и времени
  makeCorrectToBe(time, pronoun): string {
    const are = ['they', 'you', 'we'];
    const is = ['he', 'she', 'it'];
    const am = ['i'];
    if (time === 'present') {
      if (are.includes(pronoun.english.toLowerCase())) {
        return 'are';
      }
      if (is.includes(pronoun.english.toLowerCase())) {
        return 'is';
      }
      if (am.includes(pronoun.english.toLowerCase())) {
        return 'am';
      }
    }
    if (time === 'past') {
      if (are.includes(pronoun.english.toLowerCase())) {
        return 'were';
      } else {
        return 'was';
      }
    }
  }

  // корректный модальный глагол have в зависимости от местоимения
  makeCorrectModalHave(pronoun): string {
    const has = ['he', 'she', 'it'];
    if (has.includes(pronoun.english.toLowerCase())) {
      return 'has';
    } else {
      return 'have';
    }
  }

  // Simple Sentences
  // Present Simple
  createPresentSimpleSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence =
          this.hasSdependsOnPronoun(Pronoun)
            ? `${Pronoun.english} ${this.wordWith_s(Verb)}`
            : `${Pronoun.english} ${Verb.english}`;
        break;
      case 'interrogative':
        sentence = this.hasSdependsOnPronoun(Pronoun) ? `Does ${Pronoun.english} ${Verb.english}` : `Do ${Pronoun.english} ${Verb.english}`;
        break;
      case 'negative':
        sentence = this.hasSdependsOnPronoun(Pronoun) ? `${Pronoun.english} doesn't ${Verb.english}` : `${Pronoun.english} don't ${Verb.english}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Past Simple
  createPastSimpleSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} ${this.verbWith_d(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Did ${Pronoun.english} ${Verb.english}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} didn't ${Verb.english}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Future Simple
  createFutureSimpleSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} will ${Verb.english}`;
        break;
      case 'interrogative':
        sentence = `Will ${Pronoun.english} ${Verb.english}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} will not ${Verb.english}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Continues Sentences
  // Present Continues
  createPresentContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} ${this.makeCorrectToBe('present', Pronoun)} ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `${this.makeCorrectToBe('present', Pronoun)} ${Pronoun.english} ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} ${this.makeCorrectToBe('present', Pronoun)} not ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Past Continues
  createPastContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} ${this.makeCorrectToBe('past', Pronoun)} ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `${this.makeCorrectToBe('past', Pronoun)} ${Pronoun.english} ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} ${this.makeCorrectToBe('past', Pronoun)} not ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Future Continues
  createFutureContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} will be ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Will ${Pronoun.english} be ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} will not be ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Perfect Sentences
  // Present Perfect
  createPresentPerfectSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    const isIrregularVerb = !!(Verb.extra_data && Verb.extra_data.englishThirdForm);
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} ${this.makeCorrectModalHave(Pronoun)} ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'interrogative':
        sentence = `${this.makeCorrectModalHave(Pronoun)} ${Pronoun.english} ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} ${this.makeCorrectModalHave(Pronoun)} not ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Past Perfect
  createPastPerfectSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    const isIrregularVerb = !!(Verb.extra_data && Verb.extra_data.englishThirdForm);
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} had ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Had ${Pronoun.english} ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} had not ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Future Perfect
  createFuturePerfectSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    const isIrregularVerb = !!(Verb.extra_data && Verb.extra_data.englishThirdForm);
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} will have ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Will ${Pronoun.english} have ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} will not have ${isIrregularVerb ? Verb.extra_data.englishThirdForm : this.verbWith_d(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Perfect Continues
  // Present Perfect Continues
  createPresentPerfectContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} ${this.makeCorrectModalHave(Pronoun)} been ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `${this.makeCorrectModalHave(Pronoun)} ${Pronoun.english} been ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} ${this.makeCorrectModalHave(Pronoun)} not been ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Past Perfect Continues
  createPastPerfectContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} had been ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Had ${Pronoun.english} been ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} had not been ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // Future Perfect Continues
  createFuturePerfectContinuesSentence(SentenceType, Pronoun, Verb): void {
    let sentence = '';
    switch (SentenceType) {
      case 'affirmative':
        sentence = `${Pronoun.english} will have been ${this.wordWith_ing(Verb)}`;
        break;
      case 'interrogative':
        sentence = `Will ${Pronoun.english} have been ${this.wordWith_ing(Verb)}`;
        break;
      case 'negative':
        sentence = `${Pronoun.english} will not have been ${this.wordWith_ing(Verb)}`;
        break;
    }
    this.randomSentence.answer = sentence;
  }

  // случайный глагол
  getRandomVerb(): IWord {
    let choosenVerb: IWord;
    choosenVerb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
    return choosenVerb;
  }

  // случайное время
  getRandomTime(): string {
    let choosenTime: string;
    choosenTime = this.times[Math.floor(Math.random() * this.times.length)];
    return choosenTime;
  }

  // случайный тип предложения
  getRandomSentenceType(): string {
    let choosenSentenceType: string;
    choosenSentenceType = this.sentenceType[Math.floor(Math.random() * this.sentenceType.length)];
    return choosenSentenceType;
  }

  // случайное местоимение
  getRandomPronoun(): IWord {
    let choosenPronoun: IWord;
    choosenPronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
    return choosenPronoun;
  }

  // следующее предложение
  nextSentence(): void {
    this.createRandomSentence();
  }

  showAnswer(): void {
    if (this.isShowAnswer === true) {
      this.isShowAnswer = false;
      this.nextSentence();
    } else {
      this.isShowAnswer = true;
    }
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(EscSettingsPopupComponent, {
      panelClass: ['of-auto'],
      data: {times: this.times, sentenceType: this.sentenceType, pronouns: this.pronouns, verbs: this.verbs}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result) {
        this.setGenerratorConfigs(result.config);
        this.createRandomSentence();
      }
    });
  }

  setGenerratorConfigs(config): void {
    this.times = config.times;
    this.verbs = config.verbs;
    this.sentenceType = config.sentenceType;
    this.pronouns = config.pronouns;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
