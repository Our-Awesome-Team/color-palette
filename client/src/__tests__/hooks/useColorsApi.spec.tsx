import useColorsApi from '../../hooks/useColorsApi';
import { act, renderHook } from '@testing-library/react';

describe('useColorsApi hook', () => {
  it('Should receive data', async () => {
    const { result, unmount } = renderHook(() => useColorsApi());
    await act(async () => {
      result.current.fetchColors();
    });
    expect(result.current.colors).not.toEqual([])
    unmount()
  });
});
