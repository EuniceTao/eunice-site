/**
 * @file RoomHero.jsx
 * @description 首页小屋开场布局，承载 3D 或静态探索与清晰目录。
 */

import React from 'react';
import { RoomModeToggle } from '../../../design-system';
import '../../../design-system/room/room.css';

const defaultIntro = '这里装着我的工作、生活，还有一些正在发生、尚未想明白的事情。随便坐，也可以四处看看。';

export function RoomHero({ copy, mode, onModeChange, staticView = false, children }) {
  const intro = copy?.intro && copy.intro !== '这不是一份完整的自我介绍。只是一些关于工作、远方、身体和变化的证据。'
    ? copy.intro
    : defaultIntro;

  // 静态入口需要正常文档流，目录和 3D 场景继续使用各自的布局。
  const staticClass = mode === 'room' && staticView ? ' house-hero--static' : '';

  return (
    <section className={`house-hero house-hero--${mode}${staticClass}`}>
      <div className="house-hero__toolbar">
        <div className="house-hero__mark">
          <span className="house-hero__mark-dot" aria-hidden="true" />
          EUNICE&apos;S HOUSE · SHANGHAI
        </div>
        <RoomModeToggle value={mode} onChange={onModeChange} />
      </div>

      {mode === 'room' ? (
        <>
          <header className="house-hero__intro">
            <p>COME IN, STAY A WHILE</p>
            <h1>
              欢迎光临，
              <span>Eunice 的小屋</span>
            </h1>
            <div className="house-hero__intro-row">
              <span aria-hidden="true" />
              <p>{intro}</p>
            </div>
          </header>
          <div className="house-hero__scene">{children}</div>
        </>
      ) : (
        <div className="house-hero__index">
          <header>
            <p>THE HOUSE DIRECTORY</p>
            <h1>打开目录，<span>慢慢认识我。</span></h1>
          </header>
          {children}
        </div>
      )}
    </section>
  );
}
