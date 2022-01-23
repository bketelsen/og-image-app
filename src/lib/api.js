import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  excerpt,
  'categories': categories[]->{title,slug,icon},
  'tags': tags[]->{title,slug,icon},
  'technologies': technologies[]->{title,slug,icon},
  'slug': slug.current,
  'image': {"caption": image.caption, "alt": image.alt, "asset": image.image.asset->},
  'author': author->{name, twitter, image},
`

const getClient = (preview) => (preview ? previewClient : client)
const globalQuery = `'global': *[_type == 'global'][0]{...,author->{...}}`
const pageQuery = `'page': *[_type == 'page' && slug.current == $slug][0]{...}`

export async function getPage(slug, preview) {
  const results = await getClient(preview)
    .fetch(`{${pageQuery}, ${globalQuery}}`,
      { slug }
  )
  return results
}


export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}
export async function getAllPagesWithSlug() {
  const data = await client.fetch(`*[_type == "page"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" &&
                      post._ref == ^._id &&
                      approved == true] {
          _id,
          name,
          email,
          comment,
          _createdAt
        }
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}

export async function getSections(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "section"] | order(weight asc){
     title,
     slug,
     description
    }`)
  return results
}
