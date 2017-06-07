import { AngularProjectPage } from './app.po';

describe('angular-project App', () => {
  let page: AngularProjectPage;

  beforeEach(() => {
    page = new AngularProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
