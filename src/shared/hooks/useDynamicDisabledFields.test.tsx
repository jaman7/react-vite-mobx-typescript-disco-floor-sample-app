import { renderHook } from '@testing-library/react';
import useDynamicDisabledFields from './useDynamicDisabledFields';

describe('useDynamicDisabledFields', () => {
  it('disables specific fields when the pattern is RANDOM', () => {
    const { result, rerender } = renderHook(({ formValues }) => useDynamicDisabledFields(formValues), {
      initialProps: { formValues: { patern: 7, isPlay: false } },
    });

    expect(result.current).toEqual({
      sizeTilesX: true,
      sizeTilesY: true,
      patern: false,
    });

    rerender({ formValues: { patern: 1, isPlay: true } });
    expect(result.current).toEqual({
      sizeTilesX: false,
      sizeTilesY: false,
      patern: true,
    });
  });
});
