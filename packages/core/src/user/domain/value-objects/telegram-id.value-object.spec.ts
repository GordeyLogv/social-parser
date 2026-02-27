import { TelegramIdVO } from './telegram-id.value-object';

import { TelegramIdInvalidError } from '../errors/telegram-id/telegram-id-invalid.error';

describe('TelegramIdVO', () => {
  it('Should create telegram id vo when input value is correct', () => {
    const vo = TelegramIdVO.create('123456789');

    expect(vo.value).toBe(123456789n);
  });

  it('Should create telegram id vo when input value is correct and value trimmed', () => {
    const vo = TelegramIdVO.create(' 123456789           ');

    expect(vo.value).toBe(123456789n);
  });

  it('Should throw TelegramIdInvalidError when input value is incorrect', () => {
    expect(() => TelegramIdVO.create('dsfghds')).toThrow(TelegramIdInvalidError);
  });

  it('Should thoew TelegramIdInvalidError when input value empty string', () => {
    expect(() => TelegramIdVO.create('   ')).toThrow(TelegramIdInvalidError);
  });
});
