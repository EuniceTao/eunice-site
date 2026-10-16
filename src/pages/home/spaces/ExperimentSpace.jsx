/** 作品墙的完整展览；与房间挂画共用清单，作品外链保留原目标。 */
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_ARTWORKS } from '../room/artworks';
export { ART_GAME_URL } from '../room/artworks';

export function ExperimentSpace() {
  return <section className="experiment-space">
    <header><p className="space-kicker">Eunice 的作品墙</p><h1>我做的，<br />都挂在这里。</h1><p>小游戏、作品集，以及陆续做出来的新想法。</p></header>
    {PERSONAL_ARTWORKS.map(artwork => <article className="experiment-feature" key={artwork.id}>
      <div className="experiment-title"><span>{artwork.kind}</span><h2>{artwork.titleLines.map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</h2><p>Eunice 的作品</p></div>
      <div className="experiment-copy"><h3>{artwork.title}</h3><p>{artwork.description}</p>
        <a className="space-primary-link" href={artwork.url} target="_blank" rel="noopener noreferrer">{artwork.action} <ArrowUpRight size={20} /></a><small>在新标签页打开，小屋会留在这里。</small>
      </div>
    </article>)}
    <p>墙上还留着空位，给下一件作品。</p>
  </section>;
}
