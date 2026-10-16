/**
 * @file HomePage.jsx
 * @description 双模式首页：可探索房间、清晰索引与现有个人档案内容。
 */

import React from 'react';
import { Page, RoomPanel, ScrollReveal, useMediaQuery } from '../../design-system';
import { ExperienceSection } from './ExperienceSection';
import { HomeQuoteBand } from './HomeQuoteBand';
import { MoreAboutMeSection } from './MoreAboutMeSection';
import '../../design-system/room/spaces/cats.css';
import { SpaceContent } from './spaces/SpaceContent';
import { RoomHero } from './room/RoomHero';
import { RoomMobilePath } from './room/RoomMobilePath';
import { createRoomItems } from './room/roomItems';
import { HomeContactSection } from './sections/HomeContactSection';
import { HomeIndexView } from './sections/HomeIndexView';
import { HomeLivingSection } from './sections/HomeLivingSection';
import { useNotesPosts } from '../blog/useNotesPosts';
import { useNowEntries } from '../now/useNowEntries';
import { projects } from '../projects/projectsData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

const RoomScene = React.lazy(() =>
  import('./room/RoomScene').then((module) => ({ default: module.RoomScene }))
);

const contactFallback = {
  contactLabel: 'CONTACT',
  contactTitle: '联系我',
  contactBodyMd: '如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。',
  emailLabel: '邮箱',
  email: 'taoyuan_china@163.com',
  wechatLabel: '微信',
  wechat: 'Tyuan1216',
  socialsLabel: '社交媒体',
  socials: [
    { label: '小红书', value: '@陶子小姐和她的英镑小朋友' },
    { label: '微博', value: '@陶子小姐不吃桃' },
    { label: '抖音', value: '@陶子小姐不吃桃' },
  ],
  contactCtaText: '去留言 →',
  contactCtaTo: '/contact',
};

export function HomePage() {
  const [mode, setMode] = React.useState('room');
  const [activeItem, setActiveItem] = React.useState(null);
  const [spaceId, setSpaceId] = React.useState(null);
  const spaceReturnRef = React.useRef(null);
  function openSpace(id, onReturn) {
    spaceReturnRef.current = onReturn;
    setSpaceId(id);
  }
  function closeSpace() {
    setSpaceId(null);
    spaceReturnRef.current?.();
    spaceReturnRef.current = null;
  }
  function openItem(item) {
    if (item.space) openSpace(item.id);
    else setActiveItem(item);
  }
  // 在 lazy 场景挂载前判断媒体条件；条件未确定时也先保留可用的静态入口。
  const canExplore3D = useMediaQuery('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  const closePanel = React.useCallback(() => setActiveItem(null), []);
  const { entries, loading: nowLoading } = useNowEntries();
  const { posts, loading: notesLoading } = useNotesPosts();
  const latestNow = entries?.[0];
  const latestNote = posts?.[0];

  const { content: roomCopy } = useSiteBlock('home.room', {
    fallback: {
      eyebrow: 'EUNICE’S HOUSE / COME IN',
      title: '欢迎光临，Eunice 的小屋',
      intro: '这里装着我的工作、生活，还有一些正在发生、尚未想明白的事情。随便坐，也可以四处看看。',
    },
  });
  const { content: projectsBlock } = useSiteBlock('experience.projects', {
    fallback: { items: projects },
  });
  const { content: contactCopy } = useSiteBlock('copy.home', { fallback: contactFallback });

  const allProjects = Array.isArray(projectsBlock?.items) ? projectsBlock.items : projects;
  const roomItems = React.useMemo(
    () => createRoomItems({ latestNow, latestNote }),
    [latestNow, latestNote]
  );

  const roomView = canExplore3D ? (
    <React.Suspense fallback={<div className="room-scene-loading">正在点亮小屋…</div>}>
      <RoomScene items={roomItems} onOpen={openItem} onEnterSpace={openSpace} />
    </React.Suspense>
  ) : (
    <RoomMobilePath items={roomItems} onOpen={openItem} />
  );

  return (
    <Page className="pt-0 pb-0 md:pt-0 md:pb-0">
      <RoomHero copy={roomCopy} mode={mode} onModeChange={setMode} staticView={!canExplore3D}>
        {mode === 'room' ? roomView : <HomeIndexView items={roomItems} onOpenSpace={openSpace} />}
        {!canExplore3D && <div className="room-cat-tools"><button type="button" onClick={() => openSpace('cats')}>看看两只猫的相册</button></div>}
      </RoomHero>

      {spaceId && <SpaceContent id={spaceId} onClose={closeSpace} />}
      <RoomPanel item={activeItem} onClose={closePanel} />

      <ScrollReveal>
        <HomeLivingSection
          latestNow={latestNow}
          latestNote={latestNote}
          loading={nowLoading || notesLoading}
        />
      </ScrollReveal>

      <ScrollReveal>
        <HomeQuoteBand />
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-t border-[color:var(--border)] py-[72px]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">EXPERIENCE</p>
          <h2 className="font-display font-light text-[color:var(--text)]" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            走过的路
          </h2>
          <div className="mt-9">
            <ExperienceSection projectsPreview={allProjects.slice(0, 3)} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-t border-[color:var(--border)] py-[72px]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">MORE</p>
          <h2 className="font-display font-light text-[color:var(--text)]" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            更多关于我
          </h2>
          <div className="mt-9">
            <MoreAboutMeSection />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <HomeContactSection copy={contactCopy} />
      </ScrollReveal>
    </Page>
  );
}
