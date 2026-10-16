/**
 * @file roomItems.js
 * @description 首页房间物件配置，将现有内容映射为可探索入口。
 */

import { publicUrl } from '../../../lib/publicUrl';

function firstBodyLine(entry) {
  return Array.isArray(entry?.body) ? entry.body.find(Boolean) : '';
}

export function createRoomItems({ latestNow, latestNote }) {
  return [
    {
      id: 'now',
      index: '01',
      kind: 'window',
      objectLabel: '窗户 / 此刻',
      label: '最近的我',
      eyebrow: 'NOW / CURRENT WEATHER',
      title: latestNow?.title || '此刻',
      description: firstBodyLine(latestNow) || '一些还没有沉淀成结论、但正在真实发生的生活切片。',
      detail: latestNow?.date ? `${latestNow.date}${latestNow.mood ? ` · ${latestNow.mood}` : ''}` : '',
      to: '/now',
      cta: '打开完整 Now',
      image: publicUrl('hero-7.jpg'),
      position: { left: '4%', top: '9%', width: '27%', height: '48%', rotate: '-1deg', depth: 0.35, z: 3 },
    },
    {
      id: 'about',
      index: '02',
      kind: 'frame',
      space: true,
      objectLabel: '相框 / 关于我',
      label: '关于我',
      eyebrow: 'ABOUT / IN PROGRESS',
      title: 'Hello, world.',
      description: '比起一份完成的自我介绍，我更想留下工作、关系、身体与远方如何改变我的证据。',
      detail: 'AI 产品经理、心理咨询师，也是一个仍然在练习感受世界的人。',
      to: '/about',
      cta: '读一读关于我',
      image: publicUrl('profile.png'),
      position: { left: '39%', top: '7%', width: '17%', height: '42%', rotate: '1.2deg', depth: 0.55, z: 5 },
    },
    {
      id: 'work',
      index: '03',
      kind: 'screen',
      space: true,
      objectLabel: '工作台 / Work',
      label: '我的工作',
      eyebrow: 'WORK / MAKING THINGS',
      title: '工作与创造',
      description: '产品、研究、协作与落地。这里记录我如何把模糊问题变成可以被使用的东西。',
      detail: '完整项目会保留背景、判断、过程和结果，而不只是一排漂亮截图。',
      to: '/work',
      cta: '查看工作档案',
      image: publicUrl('hero-3.jpg'),
      position: { left: '33%', top: '58%', width: '29%', height: '27%', rotate: '-0.6deg', depth: 0.8, z: 8 },
    },
    {
      id: 'notes',
      image: publicUrl('hero-5.jpg'),
      index: '04',
      kind: 'notebook',
      objectLabel: '笔记本 / Notes',
      label: '随手写写',
      eyebrow: 'NOTES / MARGINALIA',
      title: latestNote?.title || '笔记',
      description: latestNote?.summary || '把值得写的写清楚，把值得留的留下来。',
      detail: latestNote?.date ? `最近更新于 ${latestNote.date}` : '',
      to: '/blog',
      cta: '翻开全部笔记',
      position: { left: '6%', top: '65%', width: '22%', height: '21%', rotate: '2.2deg', depth: 0.72, z: 7 },
    },
    {
      id: 'experience',
      image: publicUrl('hero-1.jpg'),
      index: '05',
      kind: 'suitcase',
      objectLabel: '行李箱 / 路径',
      label: '走过的路',
      eyebrow: 'EXPERIENCE / THE PATH',
      title: '走过的路',
      description: '学习、工作和项目不是一条笔直的履历线，而是一只不断被重新整理的行李箱。',
      detail: '这里保留那些塑造了我判断方式的经历，以及每次转向留下的线索。',
      to: '/experience',
      cta: '展开经历地图',
      position: { left: '72%', top: '62%', width: '20%', height: '24%', rotate: '-2deg', depth: 0.9, z: 9 },
    },
    {
      id: 'contact',
      image: publicUrl('hero-4.jpg'),
      index: '06',
      kind: 'door',
      objectLabel: '门 / 联系',
      label: '来聊聊天',
      eyebrow: 'CONTACT / COME KNOCK',
      title: '来聊聊',
      description: '如果你想合作、咨询，或者只是想交换一个最近反复出现的念头，门一直开着。',
      detail: '我会认真阅读每一条留言，但不会自动播放任何背景音乐吓你一跳。',
      to: '/contact',
      cta: '走到门口',
      position: { left: '66%', top: '10%', width: '25%', height: '43%', rotate: '0.7deg', depth: 0.42, z: 4 },
    },
    {
      id: 'experiments', index: '07', kind: 'exhibit', space: true,
      objectLabel: '主墙 / 作品墙', label: '作品墙', eyebrow: 'PLAY / PERSONAL PROJECTS',
      title: '我的作品墙', description: '自己做的小游戏，还有那些被我做出来的想法。',
      detail: '我的小游戏与创作实验。', cta: '进入作品空间',
      image: publicUrl('hero-2.png'),
    },
  ];
}
