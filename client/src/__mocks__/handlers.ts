import { rest } from 'msw';
import { Color, Scheme } from '../store/favorites/favoritesTypes';

export const handlers = [
  rest.get<Color[]>(
    'https://www.colr.org/json/colors/random/100',
    (req, res, ctx) => {
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
    }
  ),
  rest.get<Scheme[]>(
    'https://www.colr.org/json/schemes/random/21',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
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
          },
          {
            colors: [
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
            ],
            id: '456',
            tags: [],
          },
          {
            colors: [
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
              'ffffff',
            ],
            id: '789',
            tags: [],
          },
        ])
      );
    }
  ),
];
