/** 个人创作展示：只使用已确认的名称与链接，不虚构游戏画面和玩法。 */
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
export const ART_GAME_URL = 'https://app-moma.ke.com/7e041044-98ae-45c6-b51c-5da5489c2c2a';

export function ExperimentSpace() {
  return (
    <section className="experiment-space">
      <header><p className="space-kicker">EUNICE’S PLAYROOM / 001</p><h1>一些想法，<br /><em>被我做了出来。</em></h1><p>我的小游戏与创作实验。</p></header>
      <article className="experiment-feature">
        <div className="experiment-title"><span>一个由 Eunice 制作的小游戏</span><h2>吵吵<br />艺术馆<span>。</span></h2><p>CHAO CHAO / ART GALLERY</p></div>
        <div className="experiment-copy"><p className="space-kicker">PERSONAL PROJECT · 01</p><h3>欢迎来到<br />吵吵艺术馆。</h3><p>这是我自己做的小游戏。点下面的入口，就可以进去玩。</p>
          <a className="space-primary-link" href={ART_GAME_URL} target="_blank" rel="noopener noreferrer">进去玩 <ArrowUpRight size={20} /></a><small>在新标签页打开，小屋会留在这里。</small>
        </div>
      </article>
    </section>
  );
}
