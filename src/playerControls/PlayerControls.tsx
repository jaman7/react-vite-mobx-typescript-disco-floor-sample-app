import './PlayerControls.scss';
import { FormikProps, useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { dictionaries, formConfig, primaryFormConfig } from './PlayerControls.config';
import { ConfigControlsNames, PaternSelect } from './PlayerControls.enums';
import { IFormElements } from 'components/formElements/FormElements.model';
import FormElements from 'components/formElements/FormElements';
import { IStore } from 'store/Store.model';
import { makePatern } from 'helpers/matrix-generate';
import patterns from 'data/patterns';
import { Colors } from 'data/reference';

const { PATERN, COUNT_TILES_XY, COUNT_PATERN_FRAMES, SIZE_TILES_X, SIZE_TILES_Y } = ConfigControlsNames;

interface IProps {
  Store?: IStore;
  isLoading?: boolean;
  [name: string]: any;
}

const PlayerControls = inject('Store')(
  observer((props: IProps) => {
    const {
      Store,
      Store: {
        containerSize,
        containerSize: { sizeH = 0, sizeV = 0 } = {},
        controls: { speed = 1, isPlay = false, countPaternFrames = 0, countTilesXY = 0, patern: selectedPattern = 1 } = {},
      } = {},
    } = props || {};
    const controlRef = useRef<null>(null);

    const [formConfig$, setFormConfig$] = useState<IFormElements[][]>(primaryFormConfig?.(formConfig) ?? []);

    const formik: FormikProps<any> = useFormik({
      initialValues: {
        patern: 1,
        speed: 1,
        isPlay: false,
        pulseControl: false,
        colorInvertControl: false,
        countTilesXY: 8,
        countPaternFrames: 8,
        sizeTilesX: 30,
        sizeTilesY: 30,
      },
      onSubmit: () => {},
    });

    useEffect(() => {
      const bodyHeight = document.documentElement.offsetHeight;
      const sizeV = (bodyHeight - (controlRef?.current?.clientHeight ?? 800)) / 8 - 3;
      Store?.setContainerSize?.({ sizeV });
    }, [controlRef?.current?.clientHeight || null]);

    useEffect(() => {
      Store?.setControls?.(formik.values);
    }, [formik?.values]);

    const togglePlayerState = () => {
      if (Store?.controls?.isPlay) {
        Store.resetFrameInterval?.();
      } else {
        clearInterval(Store?.frameInterval);
      }
    };

    useEffect(() => {
      togglePlayerState();
    }, [speed, isPlay]);

    useEffect(() => {
      if (!isPlay) {
        Store?.clearInterval?.();
      }
    }, [isPlay]);

    useEffect(() => {
      formik.setFieldValue(SIZE_TILES_X, sizeH ?? 50);
      formik.setFieldValue(SIZE_TILES_Y, sizeV ?? 50);
    }, [sizeH, sizeV]);

    useEffect(() => {
      setFormConfig$(primaryFormConfig?.(formConfig, containerSize || {}));
    }, [containerSize]);

    useEffect(() => {
      if (selectedPattern === 5) {
        Store?.setPaterns?.({ ...patterns, 5: makePatern(countTilesXY, countPaternFrames, Colors.length) });
      }
    }, [countPaternFrames, countTilesXY]);

    const getDisableState = (name: string): boolean => {
      const { patern, isPlay } = formik?.values || {};
      switch (name) {
        case COUNT_TILES_XY:
        case COUNT_PATERN_FRAMES:
          return patern < PaternSelect.RANDOM;
        case PATERN:
          return isPlay;
        default:
          return false;
      }
    };

    const itemsConfig = (data: any, name: string): any => ({
      ...data,
      disabled: getDisableState(name),
      dictData: dictionaries?.[data?.dictName] ?? [],
    });

    return (
      <div ref={controlRef} className="control-block">
        {formik && (
          <form className="d-flex w-100">
            <div className="d-flex flex-grid w-100">
              {formConfig$?.map((row, i: number) => (
                <div key={i} className="flex-column flex-1">
                  {row?.map(
                    (item, idx: number) =>
                      item && (
                        <div key={idx} className="items">
                          <FormElements
                            key={idx}
                            formControlName={item.formControlName}
                            type={item.type}
                            formik={formik}
                            config={itemsConfig(item.config, item.formControlName)}
                          />
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    );
  })
);

export default PlayerControls;
