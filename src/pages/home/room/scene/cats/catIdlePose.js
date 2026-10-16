/** 原地动作参数；时间单位秒，角度单位弧度，不改变根节点或爪底高度。 */
const smooth = (t) => t * t * (3 - 2 * t);
function turn(t) {
  if (t < 5) return 0;
  if (t < 7) return 0.16 * smooth((t - 5) / 2);
  if (t < 10) return 0.16;
  if (t < 12) return 0.16 * (1 - smooth((t - 10) / 2));
  if (t < 14) return -0.12 * smooth((t - 12) / 2);
  if (t < 16) return -0.12;
  return -0.12 * (1 - smooth((t - 16) / 3));
}
export function catIdlePose(seconds, index) {
  const time = seconds + index * 3.1;
  const blinkTime = time % (index ? 6.7 : 5.3);
  const blink = blinkTime < 0.26 ? Math.sin(Math.PI * blinkTime / 0.26) ** 2 : 0;
  return {
    head: turn(time % 19) * (index ? -1 : 1),
    breath: Math.sin(time * Math.PI * 2 / (index ? 4.1 : 3.5)) * 0.012,
    blink,
    tail: Math.sin(time * 1.3) * (0.012 + 0.006 * Math.sin(time * 0.31)),
  };
}
