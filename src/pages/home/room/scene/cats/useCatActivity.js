/** 页面隐藏、房间滚出视口或内容空间打开时暂停活动。 */
import React from 'react';
export function useCatActivity(ref, paused) {
  const [visible, setVisible] = React.useState(true);
  const [inView, setInView] = React.useState(true);
  React.useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    update();
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [ref]);
  return visible && inView && !paused;
}
