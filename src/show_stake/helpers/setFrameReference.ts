import { getElement, log, awaiter } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const setFrameReference = async (): Promise<void> => {
  window.germesData.rsFrame = await getElement<HTMLIFrameElement>(
    '.iframe-container iframe'
  );

  if (!window.germesData.rsFrame) {
    throw new JsFailError('Не найден iframe');
  }
  // log('Есть rsiframe', 'cadetblue', true);
  if (window.germesData.rsFrame.contentWindow.location.href === 'about:blank') {
    log('Ждём появления документа iframe', 'steelblue');
    const result = await awaiter(
      () => {
        return (
          window.germesData.rsFrame.contentWindow.location.href !==
          'about:blank'
        );
      },
      10000,
      50
    );
    if (!result) {
      throw new JsFailError('Не дождались появления документа iframe');
    }
    // log('Появился документ iframe', 'steelblue');
  } else {
    // log('Есть документ iframe', 'cadetblue', true);
  }

  const document = await awaiter(() => {
    if (
      window.germesData.rsFrame.contentDocument &&
      window.germesData.rsFrame.contentDocument.body
    ) {
      return window.germesData.rsFrame.contentDocument;
    }
    return null;
  });
  if (!document) {
    throw new JsFailError('Документ In-Play фрейма пуст');
  }
};

export default setFrameReference;
