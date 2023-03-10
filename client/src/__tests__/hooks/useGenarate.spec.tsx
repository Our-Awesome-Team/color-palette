import { renderHook, waitFor } from '@testing-library/react';
import useGenerate from '../../hooks/useGenerate';

describe('useGenerate hook', () => {
    it('Should receive data', async () => {
        const { result, } = renderHook(() => useGenerate([]));
        await waitFor(() => expect(result.current.generatedScheme).toEqual({
            colors: [
                'ffffff',
                'ffffff',
                'ffffff',
                'ffffff',
                'ffffff',
                'ffffff',
                'ffffff',
            ],
            id: '123',
            tags: [],
        }))
    });
});
