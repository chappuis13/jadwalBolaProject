// __tests__/Math.test.js
import { tambah, kurang } from '../src/utils/math';

describe('Matematika fungsi', () => {
  it('Penambahan 2 bilangan', () => {
    expect(tambah(1, 2)).toBe(3);
  });

  it('Pengurangan 2 bilangan', () => {
    expect(kurang(1, 2)).toBe(-1);
  });
});