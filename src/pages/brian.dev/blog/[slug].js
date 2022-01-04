import { getAllPostsWithSlug, getPostAndMorePosts } from '@lib/api'
function getFontSize(length) {
    if (length > 32) {
      return `text-7xl`;
    }
    return `text-9xl`;
  }

export default function Post({ post}) {

  return (
    <>
      <div
        className="relative flex flex-col justify-between p-16 text-base-content bg-base shadow-md"
        style={{ width: 1200, height: 630 }}
      >
        <div className="max-w-screen-lg space-y-2">
          {post.publishedAt && readTime && <p className="text-3xl font-semibold text-primary ">
            <span>{date}</span> — <span>{readTime}</span>
          </p>}
          <h1
            className={`${getFontSize(
              post.title.length
            )} font-bold text-primary `}
          >
            {post.title}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="https://pbs.twimg.com/profile_images/1260333209335795717/9BVgiBM-_400x400.jpg"
              alt="Brian Ketelsen"
              className="flex-none w-32 h-32 border-4 border-base rounded-full handsome"
            />
            <div className="flex flex-col gap">
              <p className="mb-1 text-3xl font-semibold text-secondary ">
                Brian Ketelsen
              </p>
              <p className="text-2xl font-semibold tracking-wide text-primary">
                brian.dev<span className="path">/blog/{post.slug}</span>
              </p>
              <p
                className="text-2xl font-semibold tracking-wide"
                style={{ color: "#1D9BF0" }}
              >
                twitter.com/bketelsen
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export async function getStaticProps({ params, preview = false }) {
    const data = await getPostAndMorePosts(params.slug, preview)
    return {
      props: {
        preview,
        post: data?.post || null,
        morePosts: data?.morePosts || null,
      },
      revalidate: 1
    }
  }

  export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug()
    return {
      paths:
        allPosts?.map((post) => ({
          params: {
            slug: post.slug,
          },
        })) || [],
      fallback: true,
    }
  }
