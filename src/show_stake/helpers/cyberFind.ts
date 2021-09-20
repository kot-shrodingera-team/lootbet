import { getElement, log, sleep } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import findButton from './findButton';

const cyberFind = async (): Promise<HTMLElement> => {
  const { selectionName } = JSON.parse(worker.BetId);
  const { marketName } = JSON.parse(worker.BetId);

  const contentElement = await getElement('.match-container');
  //   const contentElement = rsDocument.querySelector('.game-event__markets');
  if (!contentElement) {
    throw new JsFailError('Не найден элемент, содержащий кнопки');
  }

  const filterMarket =
    document.querySelector<HTMLInputElement>('.filterSearch');
  filterMarket.value = `${worker.TeamOne}`;
  await sleep(200);

  const showMarketsBtn = document.querySelector<HTMLElement>(
    '.itemNew .collapse-btn'
  );
  if (showMarketsBtn) {
    log('Разворачиваем маркеты', 'orange', true);
    showMarketsBtn.click();
  }

  const cyberMarkets = [...document.querySelectorAll('')];
  return null;
};

export default cyberFind;
