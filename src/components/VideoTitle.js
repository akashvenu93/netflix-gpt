const VideoTitle = ({ title, overview }) => {
  return (
    <>
      <div className='absolute pt-[20%] px-24 bg-gradient-to-tr from-black w-screen aspect-video'>
        <h1 className='text-6xl font-bold text-white'>{title}</h1>
        <p className='py-6 text-lg w-1/4 text-white'>{overview}</p>
        <div className=''>
          <button className='bg-white text-black p-4 px-16 text-xl bg-opacity-50 rounded-lg'>
            Play
          </button>
          <button className='bg-gray-500 text-white mx-2 p-4 px-16 text-xl bg-opacity-50 rounded-lg'>
            More Info
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoTitle;
