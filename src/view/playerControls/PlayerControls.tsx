import { observer } from 'mobx-react';
import { useEffect, useMemo, useRef } from 'react';
import { dictionaries, formConfig, primaryFormConfig } from './PlayerControls.config';
import { ConfigControlsNames, PaternSelect } from './PlayerControls.enums';
import { useForm } from 'react-hook-form';
import rootStore from '@app/store/RootStore';
import useDynamicDisabledFields from '@app/shared/hooks/useDynamicDisabledFields';
import patterns from '@app/shared/patterns/patterns';
import { createPattern } from '@app/shared/helpers/matrix';
import FormElements from '@app/components/formElements/FormElements';
import { Colors } from '@app/shared/patterns/reference';

const { SIZE_TILES_X, SIZE_TILES_Y } = ConfigControlsNames;

const PlayerControls: React.FC = observer(() => {
  const { controlsStore, containerStore, patternStore } = rootStore || {};

  const {
    controls,
    controls: {
      speed = 1,
      isPlay = false,
      countPaternFrames = 8,
      sizeTilesX = 30,
      sizeTilesY = 30,
      countTilesXY = 8,
      patern: selectedPattern = 1,
    } = {},
  } = controlsStore || {};
  const { containerSize, containerSize: { sizeH = 0, sizeV = 0 } = {} } = containerStore || {};

  const controlRef = useRef<HTMLDivElement | null>(null);
  const { control, watch, setValue, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      speed: speed,
      isPlay: isPlay,
      patern: selectedPattern,
      countTilesXY: countTilesXY,
      sizeTilesX: sizeTilesX,
      sizeTilesY: sizeTilesY,
      countPaternFrames: countPaternFrames,
      is3D: false,
    },
  });

  const formValues = watch();
  const disabledFields = useDynamicDisabledFields(formValues);
  const previousValuesRef = useRef(formValues);

  useEffect(() => {
    if (JSON.stringify(previousValuesRef.current) !== JSON.stringify(formValues)) {
      controlsStore?.setControls?.({ ...formValues });
      previousValuesRef.current = formValues;
    }
  }, [formValues, controlsStore]);

  useEffect(() => {
    const bodyHeight = document.documentElement.offsetHeight;
    const newSizeV = Math.round((bodyHeight - (controlRef.current?.clientHeight || 800)) / 8 - 3);
    if (containerSize?.sizeV !== newSizeV) {
      containerStore?.setContainerSize?.({ sizeV: newSizeV });
    }
  }, [controlRef.current?.clientHeight, containerStore]);

  const togglePlayerState = useMemo(() => {
    return () => {
      if (controls?.isPlay) {
        patternStore.resetFrameInterval?.();
      } else {
        clearInterval(patternStore?.frameInterval ?? 0);
      }
    };
  }, [patternStore, isPlay]);

  useEffect(() => {
    setValue(SIZE_TILES_X, sizeH || 50);
    setValue(SIZE_TILES_Y, sizeV || 50);
  }, [sizeH, sizeV, setValue]);

  useEffect(() => {
    togglePlayerState();
  }, [speed, isPlay, togglePlayerState]);

  useEffect(() => {
    if (!isPlay) {
      patternStore?.clearInterval?.();
    }
  }, [isPlay, patternStore]);

  useEffect(() => {
    if (selectedPattern === PaternSelect.RANDOM) {
      patternStore?.setPaterns?.({ ...patterns, 7: createPattern(countTilesXY, countPaternFrames, Colors.length) });
    }
  }, [countPaternFrames, countTilesXY, patternStore, selectedPattern]);

  useEffect(() => {
    if (formValues.is3D !== undefined) {
      controlsStore.setControls({ ...controlsStore.controls, is3D: formValues.is3D });
    }
  }, [formValues.is3D, controlsStore]);

  const memoizedFormConfig = useMemo(() => primaryFormConfig(formConfig, containerSize || {}), [formConfig, containerStore?.containerSize]);

  const itemsConfig = (data: any, name: string): any => ({
    ...data,
    disabled: disabledFields?.[name] ?? false,
    dictData: dictionaries?.[data?.dictName] ?? [],
  });

  return (
    <div ref={controlRef} className="control-block">
      <form className="d-flex w-100">
        <div className="d-flex flex-grid w-100">
          {memoizedFormConfig?.map((row, i) => (
            <div key={i} className="flex-column flex-1">
              {row.map((item, idx) => (
                <div key={idx} className="items">
                  <FormElements
                    formControlName={item.formControlName}
                    config={itemsConfig(item.config, item.formControlName)}
                    control={control}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
});

export default PlayerControls;
