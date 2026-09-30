import { writing } from './content'

export type Post = {
  title: string
  url: string
  summary: string
  readTime: string
}

const HOST = new URL(writing.blog).host // jasir.hashnode.dev
const REVALIDATE_SECONDS = 60 * 60 // re-check Hashnode at most once an hour

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

type Response = {
  data?: {
    publication: {
      posts: {
        edges: { node: { title: string; url: string; brief: string; readTimeInMinutes: number } }[]
      }
    } | null
  }
}

/**
 * Latest posts from Hashnode's public GraphQL API, newest first.
 * Runs on the server and is cached; publishing a new post on Hashnode shows up
 * here within an hour. Falls back to the posts in content.ts if the API is
 * unreachable, so the page never renders empty.
 */
export async function getPosts(limit = 3): Promise<Post[]> {
  try {
    const res = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { host: HOST, first: limit } }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Hashnode responded ${res.status}`)

    const json = (await res.json()) as Response
    const edges = json.data?.publication?.posts.edges ?? []
    if (edges.length === 0) throw new Error('No posts returned')

    return edges.map(({ node }) => ({
      title: node.title,
      url: node.url,
      summary: node.brief,
      readTime: `${Math.max(1, node.readTimeInMinutes)} min read`,
    }))
  } catch (err) {
    console.warn('[hashnode] using fallback posts:', (err as Error).message)
    return writing.posts.slice(0, limit)
  }
}
