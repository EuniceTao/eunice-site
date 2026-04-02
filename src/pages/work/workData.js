/**
 * @file workData.js
 * @description 工作经历数据：用于首页时间轴与 Work 详情页。
 */

export const workItems = [
  {
    id: 'beike', // 路由 id
    company: '贝壳找房', // 公司
    role: '产品经理 / 高级产品运营策略', // 岗位
    time: '2023.10 - 至今', // 时间
    summary: '产品设计 & 运营落地；AI 编程产品、项目管理系统与 AI 赋能助手。', // 一句话总结
    highlights: [
      '参与 AI 智能编程产品规划与设计，通过实验室/PK 赛等形式推动快速落地。',
      '独立承接项目管理系统与 AI 赋能助手：用户调研、竞品分析、体验地图驱动迭代，并负责推广落地。',
      '工程师多栈转型项目：设计等级体系与分层运营，项目达成率 143%，多栈转型占比 42.92%。',
    ],
  },
  {
    id: 'bytedance',
    company: '字节跳动',
    role: '海外 B 端用户运营',
    time: '2020.06 - 2023.04',
    summary: '用户反馈运营 / 用户体验运营；流程 SOP 与体验度量。',
    highlights: [
      '承接 7 个中台产品反馈运营（审核、权限、劳动力管理、数据监测等）。',
      '作为 3 个产品用户运营 POC：监测反馈数据、发掘痛点，与 PM/RD 协作立项推进迭代。',
      '从 0 到 1 搭建反馈 SOP 与内部流程材料并持续维护，提升处理效率及质量。',
    ],
  },
];

export function getWorkItem(id) {
  return workItems.find((w) => w.id === id) ?? null;
}

