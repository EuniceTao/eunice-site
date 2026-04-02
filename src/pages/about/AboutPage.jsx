/**
 * @file AboutPage.jsx
 * @description 关于我：学习经历 + 工作时间轴 + 价值观与关注点。
 */

import React from 'react';
import { Page } from '../../design-system';

function EducationCard({ time, school, program, meta }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">
          {school}
        </h3>
        <span className="text-xs uppercase tracking-widest text-slate-400">
          {time}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{program}</p>
      {meta && <p className="mt-3 text-xs leading-relaxed text-slate-400">{meta}</p>}
    </div>
  );
}

function TimelineItem({ time, title, subtitle, highlights }) {
  return (
    <li className="relative pl-7">
      <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-slate-900" />
      <div className="absolute left-[5px] top-5 h-[calc(100%-8px)] w-px bg-slate-200" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-400">{time}</span>
      </div>

      {subtitle && <p className="mt-1 text-sm leading-relaxed text-slate-600">{subtitle}</p>}

      {highlights?.length > 0 && (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function AboutPage() {
  const bullets = [
    '产品与运营双视角：既关注体验与结构，也能把方案推动落地。',
    '习惯用数据与反馈说话：建立度量→定位问题→协同推进→复盘迭代。',
    '擅长跨团队协作：和 PM、研发、设计对齐目标，把复杂项目拆解成可执行节奏。',
  ];

  const now = [
    '在做：贝壳中台产研事务线的项目管理系统与 AI 赋能助手（规划、设计与推广落地）。',
    '在推进：工程师多栈转型项目的分层运营与机制设计（等级体系、活动策略与复盘）。',
    '在关注：用户体验度量、反馈闭环、以及 AI 如何提升团队效率与协作质量。',
  ];

  return (
    <Page title="About" description="不是干巴巴的简历，是一段更接近“我是谁”的叙述。">
      <section id="education">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">学习经历</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-500">
          这部分更像“背景信息”：我学过什么、对什么感兴趣，以及它们如何影响我的工作方式。
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <EducationCard
            time="2018.09 - 2019.12"
            school="伦敦国王学院（KCL）"
            program="数字资产与媒体管理"
            meta="关注：数字内容与产业管理、研究数据管理、身份识别与数字媒体。"
          />
          <EducationCard
            time="2013.09 - 2017.06"
            school="北京师范大学珠海分校"
            program="传播学"
            meta="课程：整合营销、公关、广告、文化传播、摄影等。荣誉：优秀毕业生、特等奖学金。"
          />
        </div>
      </section>

      <section id="experience" className="mt-10">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">工作经历（时间轴）</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-500">
          我更愿意用“做成了什么”来描述工作：在真实约束下推进落地，在结果里持续复盘。
        </p>

        <ol className="mt-7 space-y-8">
          <TimelineItem
            time="2023.10 - 至今"
            title="贝壳找房 · 产品经理 / 高级产品运营策略"
            subtitle="产品设计 & 运营落地"
            highlights={[
              '参与 AI 智能编程产品规划与设计，通过实验室/PK 赛等形式推动快速落地。',
              '独立承接项目管理系统与 AI 赋能助手：用户调研、竞品分析、体验地图驱动迭代，并负责推广落地。',
              '工程师多栈转型项目：设计等级体系与分层运营，项目达成率 143%，多栈转型占比 42.92%。',
            ]}
          />

          <TimelineItem
            time="2020.06 - 2023.04"
            title="字节跳动 · 海外 B 端用户运营"
            subtitle="用户反馈运营 / 用户体验运营"
            highlights={[
              '承接 7 个中台产品的反馈运营（审核、权限、劳动力管理、数据监测等）。',
              '作为 3 个产品用户运营 POC：监测反馈数据、发掘痛点，与 PM/RD 协作立项推动迭代。',
              '从 0 到 1 搭建反馈 SOP 与内部流程材料并持续维护，提升处理效率与质量。',
            ]}
          />
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">我在意的几件事</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">现在在做什么 / 关注什么</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {now.map((n) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm leading-relaxed text-slate-600">{n}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

