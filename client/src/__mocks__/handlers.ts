import { rest } from 'msw';

export const handlers = [
  rest.get('https://www.colr.org/json/colors/random/100', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 123,
          hex: '#ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
        {
          id: 123,
          hex: '#ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
        {
          id: 123,
          hex: '#ffffff',
          tags: [{ id: 123, name: 'white' }],
        },
      ])
    );
  }),
];
