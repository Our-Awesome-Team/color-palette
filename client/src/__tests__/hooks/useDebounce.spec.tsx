import { renderHook } from '@testing-library/react';
import useDebounce from '../../hooks/useDebounce';

describe('useDebounce hook', () => {
    it('Should receive data', async () => {
        const { result } = renderHook(() => useDebounce('newString', 500));
        expect(result.current).toBe('newString')
    });
});
