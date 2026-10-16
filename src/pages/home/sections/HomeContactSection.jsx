/**
 * @file HomeContactSection.jsx
 * @description 首页联系区：保留既有站点内容字段与联系入口。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Markdown } from '../../blog/Markdown';

export function HomeContactSection({ copy }) {
  const socials = Array.isArray(copy?.socials) ? copy.socials : [];
  return (
    <section className="border-t border-[color:var(--border)] py-[72px]">
      <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-[100vw] bg-[#111111]">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 md:px-12">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="min-w-0 max-w-none flex-1">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                {copy?.contactLabel || 'CONTACT'}
              </p>
              <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
                {copy?.contactTitle || '联系我'}
              </h2>
              <div className="mt-4 max-w-prose text-[14px] font-light leading-[1.8] text-[#BBBBBB]">
                <Markdown>{copy?.contactBodyMd || '如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。'}</Markdown>
              </div>

              <div className="mt-6 space-y-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-4 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-2 sm:gap-y-3">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">
                      {copy?.emailLabel || '邮箱'}
                    </dt>
                    <dd className="min-w-0">
                      {copy?.email ? (
                        <a
                          href={`mailto:${copy.email}`}
                          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                        >
                          {copy.email}
                        </a>
                      ) : (
                        '可通过留言页联系'
                      )}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">
                      {copy?.wechatLabel || '微信'}
                    </dt>
                    <dd className="min-w-0">{copy?.wechat || '可通过留言页联系'}</dd>
                  </div>
                </dl>

                {socials.length > 0 ? (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888]">
                      {copy?.socialsLabel || '社交媒体'}
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-6 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-3 sm:gap-8">
                      {socials.map((social) => (
                        <div key={social?.label || social?.value} className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">
                            {social?.label || ''}
                          </dt>
                          <dd className="mt-1 break-words">{social?.value || ''}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            </div>

            <Link
              to={copy?.contactCtaTo || '/contact'}
              className="inline-flex shrink-0 items-center border border-white px-4 py-2 text-[13px] text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              {copy?.contactCtaText || '去留言 →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
