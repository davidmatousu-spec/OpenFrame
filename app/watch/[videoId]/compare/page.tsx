import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import CompareVersionsPageClient from '@/app/(dashboard)/projects/[projectId]/videos/[videoId]/compare/compare-versions-page-client';

interface WatchComparePageProps {
  params: Promise<{ videoId: string }>;
}

export default async function WatchComparePage({ params }: WatchComparePageProps) {
  const { videoId } = await params;

  // Look up the video to find its projectId
  const video = await db.video.findUnique({
    where: { id: videoId },
    select: { id: true, projectId: true },
  });

  if (!video) {
    notFound();
  }

  return <CompareVersionsPageClient projectId={video.projectId} videoId={videoId} />;
}
