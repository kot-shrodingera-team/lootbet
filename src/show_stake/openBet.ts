import {
  awaiter,
  fireEvent,
  getElement,
  log,
  repeatingOpenBet,
  sleep,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { maximumStakeRefresh } from '../stake_info/getMaximumStake';
import getStakeCount from '../stake_info/getStakeCount';
import scrollFind from './helpers/scrollFind';
import setFrameReference from './helpers/setFrameReference';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */

  // const couponCleared = await clearCoupon();
  // if (!couponCleared) {
  //   throw new JsFailError('Не удалось очистить купон');
  // }

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

  // const { outcomeId } = JSON.parse(worker.BetId);
  // const betSelector = `[id*="${outcomeId}"]`;
  // log(`betSelector = "${betSelector}"`, 'white', true);

  /* ======================================================================== */
  /*                               Поиск ставки                               */
  /* ======================================================================== */
  // await sleep(2500);
  // const bet = await scrollFind();
  // // log(`${bet}`, 'orange');
  // if (!bet) {
  //   throw new JsFailError('Ставка не найдена');
  // }

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */
  // if (window.location.pathname.match(/^\/$/)) {
  //   const openingAction = async () => {
  //     // bet.click();
  //     // await sleep(2000);
  //     const bet = await scrollFind();
  //     log(`${bet}`, 'orange');
  //     if (!bet) {
  //       throw new JsFailError('Ставка не найдена');
  //     }
  //     fireEvent(bet, 'click');
  //   };
  //   await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);
  //   await maximumStakeRefresh();
  // }

  if (window.location.pathname === '/sports') {
    await setFrameReference();
    const openingAction = async () => {
      await sleep(1500);
      const bet = await scrollFind();
      if (!bet) {
        throw new JsFailError('Ставка не найдена');
      }
      fireEvent(bet, 'click');
    };
    await repeatingOpenBet(openingAction, getStakeCount, 10, 1000, 50);
    await maximumStakeRefresh();
  }
  //   /* ======================================================================== */
  //   /*           Открытие ставки, проверка, что ставка попала в купон           */
  //   /* ======================================================================== */

  //   const openingAction = async () => {
  //     // bet.click();
  //     fireEvent(bet, 'click');
  //   };
  //   await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);
  // }

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */
  let eventNameSelector;
  let marketNameSelector;
  let betNameSelector;
  let openbetContext;

  if (window.location.pathname === '/') {
    eventNameSelector = '.bet-container .header';
    marketNameSelector = '.bet-container .winner__label';
    betNameSelector = '.bet-container .winner__name';
    openbetContext = document;
  }

  if (window.location.pathname === '/sports') {
    eventNameSelector = '.bets__item-tournament';
    marketNameSelector = '.bets__item-name';
    betNameSelector = '.bets__item-name';
    openbetContext = window.germesData.rsFrame.contentDocument;
  }

  const eventNameElement = openbetContext.querySelector(eventNameSelector);
  const marketNameElement = openbetContext.querySelector(marketNameSelector);
  const betNameElement = openbetContext.querySelector(betNameSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = text(eventNameElement);
  const marketNameText = text(marketNameElement);
  const betName = text(betNameElement);

  log(
    `Открыта ставка\n${eventName}\n${marketNameText}\n${betName}`,
    'steelblue'
  );
};

export default openBet;
