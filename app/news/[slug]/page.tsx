// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { supabasePublic } from '@/lib/supabase-public';

export const revalidate = 0;

interface PostDetail {
  id: string;
  title: string;
  slug: string;
  teaser: string;
  body: string;
  tag: string;
  cover_image_url: string | null;
  published_at: string;
  artists: { name: string } | null;
}

async function getPost(slug: string): Promise<PostDetail | null> {
  const { data, error } = await supabasePublic
    .from('posts')
    .select('id, title, slug, teaser, body, tag, cover_image_url, published_at, artists ( name )')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;
  return data as unknown as PostDetail;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div
        className="flex-1 overflow-y-auto px-12 py-16"
        style={{ background: 'linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #10160f 100%)' }}
      >
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/news"
            className="inline-block no-underline mb-8"
            style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.16em', color: '#4dff91', opacity: 0.75 }}
          >
            ← BACK TO NEWS
          </Link>

          <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.85em', letterSpacing: '0.2em', color: '#4dff91', opacity: 0.8, marginBottom: '10px' }}>
            {formatDate(post.published_at)} · {post.artists?.name?.toUpperCase() || 'GAMEBOY RECORDS'}
          </div>

          <h1
            style={{
              fontFamily: "'Hemisphers Bold Sans', monospace",
              fontSize: '2.2em',
              color: '#fff',
              letterSpacing: '0.06em',
              lineHeight: 1.25,
              marginBottom: '16px',
            }}
          >
            {post.title}
          </h1>

          <span
            style={{
              display: 'inline-block',
              marginBottom: '28px',
              fontFamily: "'VT323', monospace",
              fontSize: '0.78em',
              letterSpacing: '0.2em',
              color: '#4dff91',
              border: '1px solid rgba(77,255,145,0.3)',
              padding: '2px 10px',
              borderRadius: '2px',
            }}
          >
            {post.tag}
          </span>

          {post.cover_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-auto rounded mb-8"
              style={{ border: '1px solid rgba(26,158,74,0.25)' }}
            />
          )}

          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '1em',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {post.body}
          </div>
        </div>
      </div>
    </div>
  );
}