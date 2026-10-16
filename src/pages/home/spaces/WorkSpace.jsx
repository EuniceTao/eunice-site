/** 独立工作室：空间场景与可访问的工作档案共用现有工作数据。 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from '../../../design-system';
import { workItems } from '../../work/workData';
const StudioScene = React.lazy(() => import('./StudioScene').then((module) => ({ default: module.StudioScene })));

export function WorkSpace() {
  const showScene = useMediaQuery('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  return <section className="work-space">
    <header className="studio-heading"><p className="space-kicker">THE STUDIO / WORK & MAKING</p><h1>把想法，<br /><em>做成有用的东西。</em></h1><p>产品 · 研究 · 协作 · 落地</p><a href="#studio-archive" className="space-text-link">翻开工作档案 ↓</a></header>
    {showScene && <div className="studio-scene" aria-label="独立工作室场景"><React.Suspense fallback={<p>正在打开工作室…</p>}><StudioScene /></React.Suspense></div>}
    <div className="studio-archive" id="studio-archive"><p className="space-kicker">SELECTED EXPERIENCE</p>{workItems.map((item, index) => <Link to={`/work/${item.id}`} className="studio-project" key={item.id}>
      <span className="space-kicker">0{index + 1} / {item.time}</span><h2>{item.company}</h2><p>{item.role}</p><p>{item.summary}</p><span className="space-text-link">打开项目档案 <ArrowUpRight size={18} /></span>
    </Link>)}<Link className="space-text-link" to="/projects">全部项目与成果 <ArrowUpRight size={18} /></Link></div>
  </section>;
}
