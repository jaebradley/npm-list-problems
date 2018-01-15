import npm from 'global-npm';

import { npmLoad } from './npmManager';

jest.mock('./parseProblem');

describe('npmManager', () => {
  describe('npmLoad', () => {
    it('should load npm', async () => {
      const npmLoadSpy = jest.spyOn(npm, 'load');
      const response = await npmLoad();
      expect(response).toEqual('loaded npm');
      npmLoadSpy.mockReset();
    });

    it('should reject loaded npm', async () => {
      const error = new Error('failed to load');
      const npmLoadSpy = jest.spyOn(npm, 'load').mockImplementation(() => { throw error; });
      try {
        await npmLoad();
      } catch (e) {
        expect(e).toEqual(error);
      }

      npmLoadSpy.mockReset();
    });
  });
});
