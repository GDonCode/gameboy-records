// app/news/page.tsx
import Link from 'next/link';
import Header from '@/components/Header';
import { supabasePublic } from '@/lib/supabase-public';

export const revalidate = 0; // always fetch fresh; switch to a number of seconds later if you want ISR caching

interface PostListItem {
  id: string;
  title: string;
  slug: string;
  teaser: string;
  tag: string;
  cover_image_url: string | null;
  published_at: string;
  artists: { name: string } | null;
}

async function getPublishedPosts(): Promise<PostListItem[]> {
  const { data, error } = await supabasePublic
    .from('posts')
    .select('id, title, slug, teaser, tag, cover_image_url, published_at, artists ( name )')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch posts:', error.message);
    return [];
  }

  return (data || []) as unknown as PostListItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
}

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div
        className="flex-1 overflow-y-auto px-12 py-16"
        style={{ background: 'linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #10160f 100%)' }}
      >
        <div className="max-w-[900px] mx-auto">
          <h1
            style={{
              fontFamily: "'Hemisphers Bold Sans', monospace",
              fontSize: '2.6em',
              color: '#4dff91',
              letterSpacing: '0.14em',
              textShadow: '0 0 20px rgba(77,255,145,0.25)',
              marginBottom: '40px',
            }}
          >
            NEWS
          </h1>

          {posts.length === 0 ? (
            <p style={{ fontFamily: "'Share Tech Mono', monospace", color: 'rgba(255,255,255,0.5)' }}>
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="block p-6 no-underline transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(26,158,74,0.2)',
                    borderRadius: '4px',
                  }}
                >
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-[200px] mb-4 rounded object-cover"
                      style={{ border: '1px solid rgba(26,158,74,0.2)' }}
                    />
                  ) : (
                    <div
                      className="w-full h-[200px] mb-4 rounded flex items-center justify-center opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,158,74,0.15), rgba(26,158,74,0.05))',
                        border: '1px solid rgba(26,158,74,0.2)',
                        fontFamily: "'VT323', monospace",
                        fontSize: '0.85em',
                        letterSpacing: '0.3em',
                        color: '#4dff91',
                      }}
                    >
                      IMAGE
                    </div>
                  )}

                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.85em', letterSpacing: '0.2em', color: '#4dff91', opacity: 0.8, marginBottom: '8px' }}>
                    {formatDate(post.published_at)} · {post.artists?.name?.toUpperCase() || 'GAMEBOY RECORDS'}
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '1.1em', color: '#fff', lineHeight: 1.4, marginBottom: '8px' }}>
                    {post.title}
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {post.teaser}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '12px',
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}