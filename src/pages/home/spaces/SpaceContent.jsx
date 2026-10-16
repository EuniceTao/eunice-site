/** 首页独立空间分发，保持内容组件与模态容器的职责分离。 */
import React from 'react';
import { SpaceDialog } from '../../../design-system/room/spaces/SpaceDialog';
import { PersonalSpace } from './PersonalSpace';
import { CatSpace } from './CatSpace';
import { ExperimentSpace } from './ExperimentSpace';
import { WorkSpace } from './WorkSpace';

export function SpaceContent({ id, onClose }) {
  const titles = { about: '关于我', work: '工作室', experiments: '我的小实验', cats: '两只猫的相册', 'cat-blue': '英短蓝白', 'cat-tabby': '浅棕色虎斑' };
  return <SpaceDialog title={titles[id]} kind={id} onClose={onClose}>
    {id.startsWith('cat') ? <CatSpace id={id} /> : id === 'about' ? <PersonalSpace /> : id === 'work' ? <WorkSpace /> : <ExperimentSpace />}
  </SpaceDialog>;
}
