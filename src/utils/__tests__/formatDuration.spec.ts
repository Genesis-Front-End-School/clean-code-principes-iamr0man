import { formatDuration } from '../formatDuration';

describe('formatDuration', () => {
  it('formats duration correctly when seconds < 10', () => {
    expect(formatDuration(125)).toBe('2:05');
    expect(formatDuration(9)).toBe('0:09');
  });

  it('formats duration correctly when seconds >= 10', () => {
    expect(formatDuration(390)).toBe('6:30');
    expect(formatDuration(70)).toBe('1:10');
  });
});
