
const BrianDev = () => {
  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center p-16 text-base-content bg-base shadow-md gap-14"
        style={{ width: 1200, height: 630 }}
      >
        <div className="max-w-screen-lg space-y-2 text-center">
          <h1
            className={`text-9xl font-bold text-primary`}
          >
            brian.dev
          </h1>
          <p className="max-w-screen-md text-4xl font-semibold leading-12">
            Cloud Developer Advocate
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="https://pbs.twimg.com/profile_images/1260333209335795717/9BVgiBM-_400x400.jpg"
              alt="Brian Ketelsen"
              className="flex-none w-32 h-32 border-4 border-base rounded-full handsome"
            />
            <div className="flex flex-col gap">
              <p className="mb-1 text-3xl font-semibold text-secondary">
                Brian Ketelsen
              </p>
              <p
                className="text-2xl font-semibold tracking-wide "
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
};

export default BrianDev;
