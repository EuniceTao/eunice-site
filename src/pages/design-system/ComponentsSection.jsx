/**
 * @file ComponentsSection.jsx
 * @description 设计系统组件展示区块，展示所有可用的 UI 组件及其变体。
 */
import React, { useState } from 'react';
import { Button } from '../../design-system/components/Button';
import { Input } from '../../design-system/components/Input';
import { Badge } from '../../design-system/components/Badge';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from '../../design-system/components/Card';
import {
  Avatar, AvatarImage, AvatarFallback
} from '../../design-system/components/Avatar';
import { Sheet } from '../../design-system/components/Sheet';
import { ConfirmDialog } from '../../design-system/components/ConfirmDialog';

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">{children}</h2>
);

const DemoBlock = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
    <div className="flex flex-wrap items-center gap-3">
      {children}
    </div>
  </div>
);

function ButtonDemo() {
  return (
    <div className="space-y-6">
      <DemoBlock title="Variants 变体">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </DemoBlock>
      <DemoBlock title="Sizes 尺寸">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">✦</Button>
      </DemoBlock>
      <DemoBlock title="States 状态">
        <Button disabled>Disabled</Button>
      </DemoBlock>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <DemoBlock title="Default 默认">
        <Input placeholder="请输入内容..." className="w-full" />
      </DemoBlock>
      <DemoBlock title="Disabled 禁用">
        <Input placeholder="不可编辑" disabled className="w-full" />
      </DemoBlock>
      <DemoBlock title="With Label 带标签">
        <div className="w-full space-y-1.5">
          <label className="text-sm font-medium text-slate-900">邮箱地址</label>
          <Input type="email" placeholder="you@example.com" className="w-full" />
          <p className="text-xs text-slate-500">我们不会分享你的邮箱。</p>
        </div>
      </DemoBlock>
    </div>
  );
}

function BadgeDemo() {
  return (
    <DemoBlock title="Variants 变体">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </DemoBlock>
  );
}

function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>项目概览</CardTitle>
          <CardDescription>查看你的项目统计数据</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">这是一个标准的 Card 组件，包含 Header、Content 和 Footer。</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">查看详情</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>通知设置</CardTitle>
          <CardDescription>管理你的通知偏好</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Input placeholder="搜索设置..." className="flex-1" />
            <Button variant="outline" size="sm">搜索</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AvatarDemo() {
  return (
    <DemoBlock title="Variants 变体">
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=SM" alt="SM" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback className="text-base">明</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">S</AvatarFallback>
      </Avatar>
    </DemoBlock>
  );
}

function InteractiveDemo() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <DemoBlock title="Sheet 底部面板">
        <Button variant="outline" onClick={() => setSheetOpen(true)}>
          打开 Sheet
        </Button>
      </DemoBlock>

      <DemoBlock title="ConfirmDialog 确认弹窗">
        <Button variant="destructive" onClick={() => setDialogOpen(true)}>
          删除操作
        </Button>
      </DemoBlock>

      <Sheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="底部面板示例"
        description="这是一个从底部滑出的面板组件。"
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-slate-600">Sheet 组件适用于移动端交互场景，支持手势关闭。</p>
          <Input placeholder="在面板中输入..." />
          <Button className="w-full" onClick={() => setSheetOpen(false)}>完成</Button>
        </div>
      </Sheet>

      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => console.log('confirmed')}
        title="确认删除"
        description="此操作将永久删除该项目，且无法恢复。"
      />
    </div>
  );
}

export function ComponentsSection() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle>Button 按钮</SectionTitle>
        <ButtonDemo />
      </section>
      <section>
        <SectionTitle>Input 输入框</SectionTitle>
        <InputDemo />
      </section>
      <section>
        <SectionTitle>Badge 徽标</SectionTitle>
        <BadgeDemo />
      </section>
      <section>
        <SectionTitle>Card 卡片</SectionTitle>
        <CardDemo />
      </section>
      <section>
        <SectionTitle>Avatar 头像</SectionTitle>
        <AvatarDemo />
      </section>
      <section>
        <SectionTitle>Interactive 交互组件</SectionTitle>
        <InteractiveDemo />
      </section>
    </div>
  );
}
