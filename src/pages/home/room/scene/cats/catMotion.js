/** 独立于渲染的双猫活动状态：预约路线、随机停留、起落与缓慢转身。 */
import { NODES, REST_NODES, neighbors, distance, isJump, sampleMove, canTravel } from './catNavigation.js';
export function createCats() {
  return ['front', 'door'].map((node, i) => ({
    node, target: null, previous: null, position: [...NODES[node]],
    wait: i ? 4 : 1, progress: 0, duration: 1, yaw: i ? -1.6 : 1.6,
    phase: i * 2, rest: 0, stretch: 0, pose: 'look', walking: false,
  }));
}
export function stepCats(cats, dt, random = Math.random) {
  for (const cat of cats) {
    cat.phase += dt;
    cat.walking = false;
    if (!cat.target) {
      cat.wait -= dt;
      cat.stretch += ((cat.pose === 'stretch' ? 1 : 0) - cat.stretch) * Math.min(1, dt * 3);
      cat.rest += ((cat.pose === 'lie' ? 1 : 0) - cat.rest) * Math.min(1, dt * 4);
      if (cat.wait > 0) continue;
      cat.pose = 'look';
      if (cat.rest > 0.02 || cat.stretch > 0.02) continue;
      const choices = neighbors(cat.node).filter((id) => canTravel(cat, id, cats.filter((other) => other !== cat)));
      const fresh = choices.filter((id) => id !== cat.previous);
      const options = fresh.length ? fresh : choices;
      if (!options.length) { cat.wait = 0.6 + random(); continue; }
      cat.target = options[Math.floor(random() * options.length)];
      cat.progress = 0;
      cat.duration = isJump(cat.node, cat.target) ? 1.7 : distance(NODES[cat.node], NODES[cat.target]) / 0.32;
    }
    const a = NODES[cat.node], b = NODES[cat.target];
    const heading = cat.target === 'desk' && cat.progress > 0.2 ? Math.PI / 2 : Math.atan2(b[0] - a[0], b[2] - a[2]);
    const angle = Math.atan2(Math.sin(heading - cat.yaw), Math.cos(heading - cat.yaw));
    cat.yaw += Math.max(-dt * 2.5, Math.min(dt * 2.5, angle));
    // 原地转好方向再移动，整个身体不会横向扫过家具边角。
    if (Math.abs(angle) > 0.1 && cat.progress === 0) continue;
    cat.progress = Math.min(1, cat.progress + dt / cat.duration);
    cat.walking = !isJump(cat.node, cat.target);
    cat.position = sampleMove(cat.node, cat.target, cat.progress);
    if (cat.progress === 1) {
      cat.previous = cat.node;
      cat.node = cat.target;
      cat.target = null;
      cat.walking = false;
      cat.pose = REST_NODES.includes(cat.node) || random() < 0.3 ? 'lie' : random() < 0.5 ? 'stretch' : 'look';
      cat.wait = REST_NODES.includes(cat.node) ? 10 + random() * 12 : 2 + random() * 5;
    }
  }
}
