import { DatenbankUiClientPage } from './app.po';

describe('datenbank-ui-client App', function() {
  let page: DatenbankUiClientPage;

  beforeEach(() => {
    page = new DatenbankUiClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
