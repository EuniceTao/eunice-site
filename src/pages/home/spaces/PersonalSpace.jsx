/** 相框后的个人照片空间：复用首页内容，手动翻片与滚动相册，不强制播放。 */
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteBlock } from '../../site-blocks/useSiteBlock';
import { PERSONAL_PHOTOS, usePersonalPhotos } from './usePersonalPhotos';

export function PersonalSpace() {
  const { content: hero } = useSiteBlock('home.hero', { fallback: {
    nameLine: '我是陶源「Eunice」', roles: ['AI PM', '心理咨询师', '探索世界的 ENFP'],
    hobbies: '唱歌、旅行、古筝、剧本杀、拳击 成就解锁中... ...', photos: PERSONAL_PHOTOS,
  } });
  const { content: quote } = useSiteBlock('home.quote', { fallback: {
    text: '当一个人能够如此单纯，如此觉醒，如此专注于当下，毫无疑虑地走过这个世界，生命真是一件赏心乐事。',
    author: '—— 黑塞 《悉达多》',
  } });
  const photos = usePersonalPhotos(hero?.photos);
  const [index, setIndex] = React.useState(0);
  const [failed, setFailed] = React.useState(() => new Set());
  const available = photos.filter((photo) => !failed.has(photo));
  const current = available.length ? index % available.length : 0;
  const reject = (photo) => setFailed((old) => new Set([...old, photo]));
  return (
    <>
      <div className="personal-opening">
        <div className="personal-film">
          {available.length ? <img key={available[current]} src={available[current]} alt={`Eunice 的个人照片 ${current + 1}`} onError={() => reject(available[current])} /> : <p>照片暂时无法加载，欢迎先读读我的介绍。</p>}
          <div className="film-controls">
            <span aria-live="polite">{available.length ? String(current + 1).padStart(2, '0') : '00'} / {String(available.length).padStart(2, '0')}</span>
            <div><button type="button" aria-label="上一张照片" disabled={available.length < 2} onClick={() => setIndex((current + available.length - 1) % available.length)}><ArrowLeft size={19} /></button>
              <button type="button" aria-label="下一张照片" disabled={available.length < 2} onClick={() => setIndex(current + 1)}><ArrowRight size={19} /></button></div>
          </div>
        </div>
        <div className="personal-intro">
          <p className="space-kicker">A LITTLE WINDOW INTO MY WORLD</p>
          <h1>Hello,<br /><em>world.</em></h1>
          <h2>{hero?.nameLine}</h2>
          <p className="personal-roles">{Array.isArray(hero?.roles) ? hero.roles.join(' / ') : ''}</p>
          <blockquote><p>{quote?.text}</p><cite>{quote?.author}</cite></blockquote>
          <a href="#personal-album" className="space-text-link">往下翻，慢慢认识我 ↓</a>
        </div>
      </div>
      <section id="personal-album" className="personal-album">
        <header><p className="space-kicker">LIFE, IN FRAGMENTS</p><h2>世界很大，<br />我还在探索。</h2><p>{hero?.hobbies}</p></header>
        <div className="personal-photo-grid">{available.map((photo, i) => <figure key={photo}><img src={photo} alt={`Eunice 的生活相册照片 ${i + 1}`} loading="lazy" onError={() => reject(photo)} /><figcaption>EUNICE / {String(i + 1).padStart(2, '0')}</figcaption></figure>)}</div>
        <Link className="space-text-link" to="/about">更多关于我 <ArrowUpRight size={18} /></Link>
      </section>
    </>
  );
}
