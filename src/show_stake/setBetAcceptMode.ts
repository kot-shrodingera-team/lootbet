import { fireEvent, log } from '@kot-shrodingera-team/germes-utils';

const setBetAcceptMode = async (): Promise<void> => {
  const switcher = window.germesData.rsFrame.contentDocument.querySelector(
    '.switcher-button__inner-wrapper'
  );
  // Если выбран режим только с исходным коэффициентом
  if (worker.StakeAcceptRuleShoulder === 0) {
    log('Выбираем режим принятия ставки с исходным коэффициентом', 'orange');
    if (switcher.classList.length === 2) {
      fireEvent(switcher, 'click');
    }
  }
  // Если выбран режим с повышением коэффициента
  if (worker.StakeAcceptRuleShoulder === 1) {
    log(
      'Данная БК не поддерживает выбор режима принятия только с повышенным коэффициентом, выбран режим "С исходным коэффициентом"',
      'orange'
    );
    if (switcher.classList.length === 2) {
      fireEvent(switcher, 'click');
    }
  }

  // Если выбран режим с любым коэффициентом
  if (worker.StakeAcceptRuleShoulder === 2) {
    log('Выбираем режим принятия ставки с любым коэффициентом', 'orange');
    if (switcher.classList.length === 1) {
      fireEvent(switcher, 'click');
    }
  }
};

export default setBetAcceptMode;
