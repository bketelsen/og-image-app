import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'http://localhost:2368',
  key: process.env.GHOST_API_KEY || '',
  version: 'v3',
})
export async function getPosts() {
  const allPosts = await api.posts.browse({limit: 'all'});
  return allPosts;
}
export async function getPages() {
  const allPages = await api.pages.browse({limit: 'all'});
  return allPages;
}
