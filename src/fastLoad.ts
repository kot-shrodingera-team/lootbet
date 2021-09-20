import { log } from '@kot-shrodingera-team/germes-utils';
import { version } from '../package.json';
import showStake from './show_stake';
import setFrameReference from './show_stake/helpers/setFrameReference';

const fastLoad = async (): Promise<void> => {
  if (
    worker.GetSessionData(`${window.germesData.bookmakerName}.ShowStake`) ===
    '1'
  ) {
    log('Предыдущее переоткрытие купона незавершено', 'red');
    worker.SetSessionData(`${window.germesData.bookmakerName}.ShowStake`, '0');
    worker.JSFail();
    window.location.reload();
    return;
  }
  worker.SetSessionData(
    `${window.germesData.bookmakerName}.TransitionToEventPage`,
    '0'
  );
  log(`Быстрая загрузка (${version})`, 'steelblue');
  if (window.location.pathname !== '/sports') {
    window.location.pathname = '/sports';
  }
  await setFrameReference();
  showStake();
};

export default fastLoad;
