import { log } from '@kot-shrodingera-team/germes-utils';

const afterSuccesfulLogin = async (): Promise<void> => {
  if (window.location.pathname !== '/sports') {
    const langBtn = document.querySelector<HTMLElement>('[id="dropdown-lang"]');
    if (langBtn) {
      log('Выбираем нужный язык (ENG) для БК', 'orange');
      langBtn.click();
    }
    document
      .querySelector('[aria-labelledby="dropdown-lang"]')
      .querySelector<HTMLElement>('a:first-child')
      .click();
  }
  if (window.location.pathname !== '/sports') {
    window.location.pathname = '/sports';
    log('Переход на страницу c фреймом', 'orange');
  }
};

export default afterSuccesfulLogin;
