import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('Вызов', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 500);

    debounced('test');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('flush', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 500);

    debounced('test');
    debounced.flush('now');
    expect(fn).toHaveBeenCalledWith('now');
  });
});
