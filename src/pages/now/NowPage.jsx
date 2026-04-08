/**
 * @file NowPage.jsx
 * @description Now 页：及时的小日记/备忘录（时间轴）。
 */

import React from 'react';
import { Page } from '../../design-system';
import { NowTimeline } from './NowTimeline';
import { useNowEntries } from './useNowEntries';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

export function NowPage() {
  const { entries, updatedAt } = useNowEntries();
  const { content: copy } = useSiteBlock('copy.now', {
    fallback: {
      pageDescriptionMd: '像心情记录一样，随手写几条：今天在做什么、在想什么。',
      title: 'Now',
      lastUpdatedLabel: 'LAST UPDATED',
    },
  });

  return (
    <Page
      title={copy?.title || 'Now'}
      description={copy?.pageDescriptionMd || '像心情记录一样，随手写几条：今天在做什么、在想什么。'}
    >
      {updatedAt ? (
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
            {copy?.lastUpdatedLabel || 'LAST UPDATED'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
            {updatedAt}
          </span>
        </div>
      ) : null}

      <div className="mt-9">
        <NowTimeline entries={entries} />
      </div>
    </Page>
  );
}

