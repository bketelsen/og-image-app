import { getAllPostsWithSlug, getPostAndMorePosts } from '@lib/api'
import {imageBuilder} from '@lib/sanity'
function getFontSize(length) {
    if (length > 32) {
      return `text-7xl`;
    }
    return `text-9xl`;
  }

export default function Post({ post }) {
    if (!post) return null;

    const bgImage=imageBuilder(post.coverImage).width(1200).height(630).auto("format").url()

  return (
    <>
      <div
        className="relative flex flex-col justify-between p-16 text-base-content bg-base shadow-md"
        style={{ width: 1200, height: 630, backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-screen-lg space-y-2">
          {post.publishedAt && readTime && <p className="text-3xl font-semibold text-primary ">
            <span>{date}</span> — <span>{readTime}</span>
          </p>}
          <h1
            className={`${getFontSize(
              post.title.length
            )} font-bold text-primary bg-neutral/60`}
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
              <p className="mb-1 text-3xl font-semibold text-secondary bg-neutral/60">
                Brian Ketelsen
              </p>
              <p className="text-2xl font-semibold tracking-wide text-primary bg-neutral/60">
                brian.dev<span className="path">/blog/{post.slug}</span>
              </p>
              <p
                className="text-2xl font-semibold tracking-wide bg-neutral/60"
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
