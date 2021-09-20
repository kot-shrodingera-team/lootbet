import {
  awaiter,
  checkBookerHost,
  log,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import {
  NewUrlError,
  JsFailError,
} from '@kot-shrodingera-team/germes-utils/errors';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { balanceReady, updateBalance } from '../stake_info/getBalance';
import clearCoupon from './clearCoupon';
import setFrameReference from './helpers/setFrameReference';

const preOpenEvent = async (): Promise<void> => {
  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }
  if (window.location.pathname === '/sports') {
    await setFrameReference();
    const preloader =
      window.germesData.rsFrame.contentDocument.querySelector('.preloader');
    if (preloader) {
      // window.location.pathname = '/';
      // window.location.reload();
      await awaiter(
        () => preloader !== null,
        5000,
        50,
        preloader == null,
        window.location.reload()
      );
      // log('Появился лоадер', 'crimson');
    }
  }
  await authStateReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  await balanceReady();
  updateBalance();
  await clearCoupon();

  const pathnameEvent = worker.EventUrl;

  if (
    pathnameEvent.match(/^(dota2)\//) ||
    pathnameEvent.match(/^(csgo)\//) ||
    pathnameEvent.match(/^(lol)\//) ||
    pathnameEvent.match(/^(fifa)\//) ||
    pathnameEvent.match(/^(pubg)\//) ||
    pathnameEvent.match(/^(sc2)\//) ||
    pathnameEvent.match(/^(hs)\//) ||
    pathnameEvent.match(/^(ow)\//)
  ) {
    log('События киберспорта временно недоступны на данной БК', 'crimson');
    // window.location.pathname = '/';
    return;
  }

  if (window.location.pathname !== '/sports') {
    // log('Переходим на /sports', 'orange');
    window.location.pathname = '/sports';
  }
};

export default preOpenEvent;
