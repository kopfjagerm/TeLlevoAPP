import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should Titulo mensaje', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('login');
  });
});
