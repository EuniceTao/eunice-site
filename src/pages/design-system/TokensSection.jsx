/**
 * @file TokensSection.jsx
 * @description 设计系统 Tokens 展示区块，包括颜色、字体、间距的可视化展示。
 */
import React from 'react';
import { palette, colors } from '../../design-system/tokens/colors';
import { typography } from '../../design-system/tokens/typography';
import { spacing } from '../../design-system/tokens/spacing';

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">{children}</h2>
);

const SubTitle = ({ children }) => (
  <h3 className="text-lg font-medium text-slate-700 mb-3">{children}</h3>
);

function ColorSwatch({ name, hex }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-16 h-16 rounded-lg border border-slate-200 shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <span className="text-xs font-medium text-slate-700">{name}</span>
      <span className="text-[10px] text-slate-400 font-mono">{hex}</span>
    </div>
  );
}

function ColorsDisplay() {
  return (
    <div className="space-y-6">
      <SubTitle>Slate 色板</SubTitle>
      <div className="flex flex-wrap gap-4">
        {Object.entries(palette.slate).map(([key, hex]) => (
          <ColorSwatch key={key} name={`slate-${key}`} hex={hex} />
        ))}
      </div>

      <SubTitle>语义色彩</SubTitle>
      <div className="flex flex-wrap gap-4">
        <ColorSwatch name="background" hex={colors.background} />
        <ColorSwatch name="foreground" hex={colors.foreground} />
        <ColorSwatch name="primary" hex={colors.primary.DEFAULT} />
        <ColorSwatch name="primary-fg" hex={colors.primary.foreground} />
        <ColorSwatch name="secondary" hex={colors.secondary.DEFAULT} />
        <ColorSwatch name="destructive" hex={colors.destructive.DEFAULT} />
        <ColorSwatch name="border" hex={colors.border} />
        <ColorSwatch name="ring" hex={colors.ring} />
      </div>
    </div>
  );
}

function TypographyDisplay() {
  const samples = [
    { key: 'h1', label: 'H1', text: '标题一 Heading 1' },
    { key: 'h2', label: 'H2', text: '标题二 Heading 2' },
    { key: 'h3', label: 'H3', text: '标题三 Heading 3' },
    { key: 'h4', label: 'H4', text: '标题四 Heading 4' },
    { key: 'p', label: 'Paragraph', text: '正文段落 Body text for reading.' },
    { key: 'lead', label: 'Lead', text: '引导文本 Lead paragraph.' },
    { key: 'large', label: 'Large', text: '大号文本 Large text.' },
    { key: 'small', label: 'Small', text: '小号文本 Small text.' },
    { key: 'subtle', label: 'Subtle', text: '辅助文本 Muted text.' },
    { key: 'inlineCode', label: 'Code', text: 'const x = 42;' },
  ];

  return (
    <div className="space-y-4">
      <SubTitle>字体族: {typography.fontFamily.sans}</SubTitle>
      <div className="space-y-3">
        {samples.map(({ key, label, text }) => {
          const style = typography.styles[key];
          return (
            <div key={key} className="flex items-baseline gap-4 py-2 border-b border-slate-100">
              <span className="text-xs font-mono text-slate-400 w-20 shrink-0">{label}</span>
              <span
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  letterSpacing: style.letterSpacing,
                  fontStyle: style.fontStyle,
                  fontFamily: style.fontFamily || typography.fontFamily.sans,
                  color: style.color === 'muted' ? '#64748B' : undefined,
                }}
              >
                {text}
              </span>
              <span className="text-[10px] font-mono text-slate-300 ml-auto shrink-0">
                {style.fontSize} / {style.fontWeight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpacingDisplay() {
  const spacingEntries = Object.entries(spacing).filter(
    ([key]) => !isNaN(Number(key))
  );

  return (
    <div className="space-y-4">
      <SubTitle>间距比例 (Base: 4px)</SubTitle>
      <div className="space-y-2">
        {spacingEntries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 w-8 text-right">{key}</span>
            <div
              className="h-4 rounded-sm bg-slate-900"
              style={{ width: value }}
            />
            <span className="text-xs text-slate-500">{value}</span>
          </div>
        ))}
      </div>

      <SubTitle>圆角</SubTitle>
      <div className="flex flex-wrap gap-4">
        {Object.entries(spacing.borderRadius).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-1.5">
            <div
              className="w-16 h-16 bg-slate-900"
              style={{ borderRadius: value }}
            />
            <span className="text-xs font-medium text-slate-700">{key}</span>
            <span className="text-[10px] text-slate-400 font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokensSection() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle>Colors 颜色</SectionTitle>
        <ColorsDisplay />
      </section>
      <section>
        <SectionTitle>Typography 字体</SectionTitle>
        <TypographyDisplay />
      </section>
      <section>
        <SectionTitle>Spacing 间距</SectionTitle>
        <SpacingDisplay />
      </section>
    </div>
  );
}
