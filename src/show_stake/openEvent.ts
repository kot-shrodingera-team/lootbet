import { log } from '@kot-shrodingera-team/germes-utils';

const openEvent = async (): Promise<void> => {
  /* ======================================================================== */
  /*             Если не было попытки перехода на страницу события            */
  /* ======================================================================== */

  // if (
  //   worker.GetSessionData(
  //     `${window.germesData.bookmakerName}.TransitionToEventPage`
  //   ) === '0'
  // ) {
  const pathnameEvent = worker.EventUrl;
  if (
    pathnameEvent.match(/(dota2)/) ||
    pathnameEvent.match(/(csgo)/) ||
    pathnameEvent.match(/(lol)/) ||
    pathnameEvent.match(/(starcraft)/) ||
    pathnameEvent.match(/(overwatch)/)
  ) {
    log('Киберспорт временно недоступен на данной БК', 'crimson');
    return;
  }
  if (window.location.pathname === '/sports') {
    if (
      document.querySelector<HTMLIFrameElement>('.iframe-container iframe')
        .contentWindow.location.href ===
      worker.EventUrl.replace(
        `${worker.BookmakerMainUrl}`,
        'https://lootbet-vmk3dz1p.betsy.gg/'
      )
    ) {
      log('Уже открыто нужное событие', 'steelblue');
      return;
    }
  }
  //   log(`${window.location.href} !== ${worker.EventUrl}`, 'white', true);
  //   worker.SetSessionData(
  //     `${window.germesData.bookmakerName}.TransitionToEventPage`,
  //     '1'
  //   );
  //   window.location.href = worker.EventUrl;
  //   throw new NewUrlError('Переходим на событие');
  // }
  // let eventUrl = worker.EventUrl;
  // let frameUrl = window.germesData.rsFrame.contentWindow.location.pathname;
  // await setFrameReference();
  if (window.location.pathname === '/sports') {
    // log(`${worker.EventUrl}`, 'orange');
    // window.germesData.rsFrame.contentWindow.location.href =
    document.querySelector<HTMLIFrameElement>(
      '.iframe-container iframe'
    ).contentWindow.location.href = worker.EventUrl.replace(
      `${worker.BookmakerMainUrl}`,
      'https://lootbet-vmk3dz1p.betsy.gg/'
    );
    log('Открыли нужное событие', 'steelblue');
    // log(
    //   `${
    //     document.querySelector<HTMLIFrameElement>('.iframe-container iframe')
    //       .contentWindow.location.href
    //   }`,
    //   'orange'
    // );
  }
  /* ======================================================================== */
  /*              Если была попытка перехода на страницу события              */
  /* ======================================================================== */

  // if (window.location.href === worker.EventUrl) {
  //   log('Открыли нужное событие', 'steelblue');
  //   return;
  // }
  // log(`${window.location.href} !== ${worker.EventUrl}`, 'white', true);
  // throw new JsFailError('Не удалось перейти на нужное событие');
  // const domFullLoaded = (context: Document, win: Window): Promise<void> =>
  //   new Promise((resolve) => {
  //     if (context.readyState === 'complete') {
  //       resolve();
  //       log('DOMCOntent во фрейме загружен', 'orange');
  //       return;
  //     }
  //     win.addEventListener('load', () => resolve(), {
  //       once: true,
  //     });
  //   });
  // const domLoaded = (): Promise<void> =>
  //   new Promise((resolve) => {
  //     if (
  //       window.germesData.rsFrame.contentDocument.readyState === 'complete' ||
  //       window.germesData.rsFrame.contentDocument.readyState === 'interactive'
  //     ) {
  //       resolve();
  //       log('DOMLoad во фрейме загружен', 'orange');
  //       return;
  //     }
  //     window.germesData.rsFrame.contentWindow.addEventListener(
  //       'DOMContentLoaded',
  //       () => resolve(),
  //       {
  //         once: true,
  //       }
  //     );
  //   });

  // await domFullLoaded(
  //   window.germesData.rsFrame.contentDocument,
  //   window.germesData.rsFrame.contentWindow
  // );
  // await domFullLoaded(document, window);
  // await domLoaded();
};

export default openEvent;
