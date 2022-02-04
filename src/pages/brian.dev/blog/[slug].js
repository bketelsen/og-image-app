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

  console.log(post.technologies)
    const bgImage=imageBuilder(post.image).width(1200).height(630).auto("format").url()

  return (
    <>
      <div
        className="relative flex flex-col justify-between p-16 shadow-md text-base-content bg-base"
        style={{ width: 1200, height: 630, backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-screen-lg p-4 space-y-2 bg-gray-300/80">
          { post.estimatedReadingTime && <p className="text-3xl font-semibold text-incigo-500 ">
            <span>{post.estimatedReadingTime} minute read</span>
          </p>}
          <h1
            className={`${getFontSize(
              post.title.length
            )} font-bold text-indigo-700 `}
          >
            {post.title}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 bg-gray-300/80">
            <img
              src="https://pbs.twimg.com/profile_images/1260333209335795717/9BVgiBM-_400x400.jpg"
              alt="Brian Ketelsen"
              className="flex-none w-32 h-32 border-4 border-indigo-200 rounded-full handsome"
            />
            <div className="flex flex-col p-2 gap ">
              <p className="mb-1 text-3xl font-semibold text-indigo-700">
                Brian Ketelsen
              </p>
              <p className="text-2xl font-semibold tracking-wide text-indigo-700">
                brian.dev<span className="path">{post.slug}</span>
              </p>
              <p
                className="text-2xl font-semibold tracking-wide"
                style={{ color: "#1D9BF0" }}
              >
                twitter.com/bketelsen
              </p>
            </div>
          </div>
          <div className="flex items-end">
          </div>
        </div>
      </div>
    </>
  );
}


export async function getStaticProps({ params, preview = false }) {
    const data = await getPostAndMorePosts("/blog/" + params.slug + "/", preview)
  console.log(data)
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
    console.log(allPosts)
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
