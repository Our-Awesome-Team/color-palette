import { rest } from 'msw';

export const handlers = [
  rest.get('https://www.colr.org/json/colors/random/100', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 123,
          hex: 'ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
        {
          id: 123,
          hex: 'ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
        {
          id: 123,
          hex: 'ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
      ])
    );
  }),
  rest.get('https://www.colr.org/json/schemes/random/21', (req, res, ctx) => {
    return res(
      ctx.json([
        { colors: ['ffffff', 'ffffff', 'ffffff'], id: '000', tags: [] },
        { colors: ['ffffff', 'ffffff', 'ffffff'], id: '000', tags: [] },
        { colors: ['ffffff', 'ffffff', 'ffffff'], id: '000', tags: [] },
      ])
    );
  }),
];
