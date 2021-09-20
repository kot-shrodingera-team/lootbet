import {
  awaiter,
  fireEvent,
  getElement,
  log,
  ri,
  sleep,
  trim,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import setFrameReference from './setFrameReference';

const findButton = async (): Promise<HTMLElement> => {
  await setFrameReference();
  const { selectionName } = JSON.parse(worker.BetId);
  const { marketName } = JSON.parse(worker.BetId);

  // собираем маркеты
  const getMarkets = [
    ...window.germesData.rsFrame.contentDocument.querySelectorAll<HTMLElement>(
      '.game-event__tab .game-event__market-wrapper'
    ),
  ];

  if (!getMarkets.length) {
    throw new JsFailError('Не найдено ни одного маркета');
  }
  log(`Ищем маркет ${marketName}`, 'orange', true);

  // eslint-disable-next-line no-restricted-syntax
  for (const market of getMarkets) {
    // eslint-disable-next-line no-await-in-loop
    const marketTitle = market.querySelector(
      '.game-event-market__title'
    ).textContent;
    if (!marketTitle) {
      throw new JsFailError('Не найден заголовок маркета');
    }
    // log(`Нашли маркет: ${marketTitle}`, 'orange');
    // const marketTitleReg = marketTitle.match(marketName);
    const marketTitleReg = marketTitle.match(ri`^${marketName}$`);
    if (marketTitleReg) {
      log(
        `Нашли подходящий маркет: ${marketTitleReg}, ищем кнопку`,
        'orange',
        true
      );
    }

    let targetBtn: HTMLElement;

    // eslint-disable-next-line eqeqeq
    if (marketTitleReg == marketName) {
      // log(`Нашли маркет: ${marketTitleReg} == ${marketName}`, 'orange', true);

      const parserVal = trim(selectionName);
      log(`Текст кнопки с парсера: ${parserVal}`, 'orange', true);

      const marketButtons = [
        ...market.querySelectorAll<HTMLElement>('.outcome__status'),
      ];
      const targetButton = marketButtons.find((trueButton): HTMLElement => {
        const buttonVal = trim(trueButton.textContent);
        log(`Текст кнопки со страницы: ${buttonVal}`, 'orange', true);

        if (parserVal === buttonVal) {
          if (trueButton.classList.value === 'disabled') {
            throw new JsFailError('Ставка заблокирована');
          }
          log(`Текст совпал: ${buttonVal} === ${parserVal}`, 'orange', true);
          return trueButton;
        }
        return null;
      });

      if (!targetButton) {
        log('Не нашли нужной кнопки', 'crimson');
      }
      targetBtn = targetButton;
    }
    if (targetBtn) {
      return targetBtn;
    }
  }
  return null;
};

export default findButton;
