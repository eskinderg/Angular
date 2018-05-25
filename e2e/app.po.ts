import { browser, by, element } from 'protractor';

export class AngularProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-brand')).getText();
  }
}
