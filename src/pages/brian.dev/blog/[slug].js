import { getPosts } from "@lib/api";

function getFontSize(length) {
    if (length > 32) {
      return `text-7xl`;
    }
    return `text-9xl`;
  }

export default function Post({ post }) {
  if (!post) return null;
  const image = post.feature_image || "https://brian.dev/brian.jpg"
  return (
    <>
      <div
        className="relative flex flex-col justify-between p-16 shadow-md text-base-content bg-base"
        style={{ width: 1200, height: 630, backgroundImage: `url(${image})` }}
      >
        <div className="max-w-screen-lg p-4 space-y-2 bg-gray-300/80">
          { post.estimatedReadingTime && <p className="text-3xl font-semibold text-prose ">
            <span>{post.estimatedReadingTime} minute read</span>
          </p>}
          <h1
            className={`${getFontSize(
              post.title.length
            )} font-bold text-prose `}
          >
            {post.title}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 ">
            <img
              src="https://pbs.twimg.com/profile_images/1260333209335795717/9BVgiBM-_400x400.jpg"
              alt="Brian Ketelsen"
              className="flex-none w-32 h-32 border-4 border-indigo-200 rounded-full handsome"
            />
            <div className="flex flex-col p-2 gap bg-gray-300/80">
              <p className="mb-1 text-3xl font-semibold text-prose">
                Brian Ketelsen
              </p>
              <p className="text-2xl font-semibold tracking-wide text-prose">
                brian.dev/<span className="path">{'blog/' + post.slug}</span>
              </p>
              <p
                className="text-2xl font-semibold tracking-wide text-blue-500"

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
  const data = await getPosts()
  const post = data.find(post => post.slug === params.slug)
   return {
      props: {

        post: post || null,

      },
      revalidate: 1
    }
  }

  export async function getStaticPaths() {
    const allPosts = await getPosts()
   // console.log(allPosts)
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
