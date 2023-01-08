import useColorsApi from '../../hooks/useColorsApi';
import { act, renderHook } from '@testing-library/react';

describe('useColorsApi hook', () => {
  it('Should receive data', async () => {
    const { result, unmount } = renderHook(() => useColorsApi());
    act(() => {
      result.current.fetchColors();
    });

    unmount()
  });
});
