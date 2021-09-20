import {
  awaiter,
  domFullLoaded,
  domLoaded,
  getElement,
  log,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import findButton from './findButton';

const scrollFind = async (): Promise<HTMLElement> => {
  const rsDocument = window.germesData.rsFrame.contentDocument;
  const contentElement = await awaiter(() =>
    getElement(
      '.game-event__tab',
      10000,
      window.germesData.rsFrame.contentDocument
    )
  );
  // await awaiter(() => contentElement, 500, 20);
  // const contentElement = rsDocument.querySelector('.game-event__markets');
  if (!contentElement) {
    throw new JsFailError('Не найден элемент, содержащий кнопки');
  }
  log(`Дождались кнопок`, 'orange');
  await awaiter(() => domLoaded());
  await awaiter(() => domFullLoaded());
  await getElement(
    '.game-event__tab .game-event__market-wrapper .game-event-market__title',
    5000,
    window.germesData.rsFrame.contentDocument
  );
  await sleep(1000);

  const contentElementHeight = contentElement.clientHeight;
  // log(`${contentElement}`, 'orange');
  // log(`contentElementHeight ${contentElementHeight}`, 'orange');
  const scrollElement = rsDocument.querySelector('.auto-scroll');
  // const scrollElement = rsDocument.querySelector('.MopCenterScrollWrapper');
  // log(`${scrollElement}`, 'orange');
  const scrollElementClientHeight = scrollElement.clientHeight;
  // log(`scrollElementClientHeight ${scrollElementClientHeight}`, 'orange');
  // await sleep(500);

  if (scrollElementClientHeight === contentElementHeight) {
    // log('scrollElementClientHeight === contentElementHeight', 'orange');
    const targetButton = await findButton();
    // eslint-disable-next-line no-await-in-loop
    if (targetButton) {
      // log(`${targetButton}`, 'crimson');
      return targetButton;
    }
  }
  let targetButton = await findButton();
  // eslint-disable-next-line no-await-in-loop
  if (targetButton) {
    // log(`${targetButton}`, 'crimson');
    return targetButton;
  }
  while (
    scrollElement.scrollTop + scrollElementClientHeight <
    contentElementHeight
  ) {
    // eslint-disable-next-line no-await-in-loop
    targetButton = await findButton();
    // eslint-disable-next-line no-await-in-loop
    if (targetButton) {
      // log(`${targetButton}`, 'crimson');
      return targetButton;
    }
    const newScrollTop = scrollElement.scrollTop + scrollElementClientHeight;
    scrollElement.scrollTop = newScrollTop;
    // eslint-disable-next-line no-await-in-loop
    const scrolled = await awaiter(() => {
      return scrollElement.scrollTop === newScrollTop;
    });
    if (!scrolled) {
      throw new JsFailError('Ошибка поиска кнопки');
    }
  }

  // let targetButton = await findButton();
  // // eslint-disable-next-line no-await-in-loop
  // if (targetButton) {
  //   // log(`${targetButton}`, 'crimson');
  //   return targetButton;
  // }
  // if (!targetButton) {
  //   while (
  //     scrollElement.scrollTop + scrollElementClientHeight <
  //     contentElementHeight
  //   ) {
  //     log('ELSEEEEEEEEE', 'orange');
  //     // eslint-disable-next-line no-await-in-loop
  //     targetButton = await findButton();
  //     // eslint-disable-next-line no-await-in-loop
  //     if (targetButton) {
  //       // log(`${targetButton}`, 'crimson');
  //       return targetButton;
  //     }
  //     const newScrollTop = scrollElement.scrollTop + scrollElementClientHeight;
  //     scrollElement.scrollTop = newScrollTop;
  //     // eslint-disable-next-line no-await-in-loop
  //     const scrolled = await awaiter(() => {
  //       return scrollElement.scrollTop === newScrollTop;
  //     });
  //     if (!scrolled) {
  //       throw new JsFailError('Ошибка поиска кнопки');
  //     }
  //   }
  // }

  // if (
  //   scrollElement.scrollTop + scrollElementClientHeight ===
  //   contentElementHeight
  // ) {
  //   const targetButton = await findButton();
  //   // eslint-disable-next-line no-await-in-loop
  //   if (targetButton) {
  //     // log(`${targetButton}`, 'crimson');
  //     return targetButton;
  //   }
  // }

  return null;
};

export default scrollFind;
