import { FirstNameVO } from './first-name.value-object';

import { FirstNameTooLongError, FirstNameTooShortError } from '../errors';

describe('FirstNameVO', () => {
  it('Should create first name vo when input value not empty', () => {
    const vo = FirstNameVO.create('Gordey');

    expect(vo.value).toBe('Gordey');
  });

  it('Should create first name vo when input value empty or undefined', () => {
    const vo1 = FirstNameVO.create('');
    const vo2 = FirstNameVO.create('   ');
    const vo3 = FirstNameVO.create(undefined);

    expect(vo1.value).toBe('Anonymous');
    expect(vo2.value).toBe('Anonymous');
    expect(vo3.value).toBe('Anonymous');
  });

  it('Should throw FirstNameTooShortError when input value < 2 symbols', () => {
    expect(() => FirstNameVO.create('A')).toThrow(FirstNameTooShortError);
  });

  it('Should throw FirstNameTooLongError when input value > 65 symbols', () => {
    const tooLong = 'A'.repeat(66);

    expect(() => FirstNameVO.create(tooLong)).toThrow(FirstNameTooLongError);
  });
});
