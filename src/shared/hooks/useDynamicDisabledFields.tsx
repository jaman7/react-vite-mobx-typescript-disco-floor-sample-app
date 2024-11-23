import { useEffect, useState } from 'react';
import { PaternSelect } from '@app/view/playerControls/PlayerControls.enums';

const useDynamicDisabledFields = (formValues: any) => {
  const [disabledFields, setDisabledFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const { patern, isPlay } = formValues;

    const updatedDisabledFields = {
      sizeTilesX: patern === PaternSelect.RANDOM,
      sizeTilesY: patern === PaternSelect.RANDOM,
      patern: isPlay,
    };

    setDisabledFields((prev) => (JSON.stringify(prev) !== JSON.stringify(updatedDisabledFields) ? updatedDisabledFields : prev));
  }, [formValues.patern, formValues.isPlay]);

  return disabledFields;
};

export default useDynamicDisabledFields;
