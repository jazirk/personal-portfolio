import { writing } from './content'

export type Post = {
  title: string
  url: string
  summary: string
  readTime: string
}

const HOST = new URL(writing.blog).host // jasir.hashnode.dev
const REVALIDATE_SECONDS = 60 * 60 // re-check Hashnode at most once an hour
const HEADERS = {
  'User-Agent': 'jaasi.me-portfolio (+https://jaasi.me)',
  Accept: 'application/json',
}

const QUERY = /* GraphQL */ `
  query Posts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            title
            url
            brief
            readTimeInMinutes
          }
        }
      }
    }
  }
`

type GqlResponse = {
  errors?: { message: string }[]
  data?: {
    publication: {
      posts: {
        edges: { node: { title: string; url: string; brief: string; readTimeInMinutes: number } }[]
      }
    } | null
  }
}

/** Source 1: Hashnode's public GraphQL API. */
async function fromGraphQL(limit: number): Promise<Post[]> {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { host: HOST, first: limit } }),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`)
  const json = (await res.json()) as GqlResponse
  if (json.errors?.length) throw new Error(`GraphQL: ${json.errors[0].message}`)
  const edges = json.data?.publication?.posts.edges ?? []
  if (edges.length === 0) throw new Error('GraphQL: no posts')
  return edges.map(({ node }) => ({
    title: node.title,
    url: node.url,
    summary: node.brief,
    readTime: `${Math.max(1, node.readTimeInMinutes)} min read`,
  }))
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
  return m ? decode(m[1]) : ''
}

/** Source 2: the blog's RSS feed (plain GET, no API involved). */
async function fromRSS(limit: number): Promise<Post[]> {
  const res = await fetch(`https://${HOST}/rss.xml`, {
    headers: { ...HEADERS, Accept: 'application/rss+xml, application/xml, text/xml' },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`RSS HTTP ${res.status}`)
  const xml = await res.text()
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit)
  if (items.length === 0) throw new Error('RSS: no items')
  return items.map(([, item]) => {
    const summary = tag(item, 'description')
    const words = summary.split(' ').length
    return {
      title: tag(item, 'title'),
      url: tag(item, 'link'),
      summary: summary.length > 220 ? `${summary.slice(0, 217).trimEnd()}…` : summary,
      // RSS has no read time; estimate from the excerpt, minimum 2 min
      readTime: `${Math.max(2, Math.round(words / 200))} min read`,
    }
  })
}

/**
 * Latest posts from Hashnode, newest first. Runs on the server and is cached;
 * new posts appear within an hour. Tries the GraphQL API, then the RSS feed,
 * then the hand-written posts in content.ts, so the section is never empty.
 */
export async function getPosts(limit = 3): Promise<Post[]> {
  const sources = [
    ['GraphQL API', fromGraphQL],
    ['RSS feed', fromRSS],
  ] as const
  for (const [label, source] of sources) {
    try {
      return await source(limit)
    } catch (err) {
      console.warn(`[hashnode] ${label} failed:`, (err as Error).message)
    }
  }
  console.warn('[hashnode] using fallback posts from content.ts')
  return writing.posts.slice(0, limit)
}
