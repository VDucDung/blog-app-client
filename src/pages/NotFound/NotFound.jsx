const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col justify-center items-center">
      <img
        src="https://res.cloudinary.com/dgyusabsy/image/upload/v1718615676/blog-app/yskeedcgkrurizvjjf3k.png"
        alt="not found"
      />
      <button className="my-6 w-60 rounded-[50px] bg-primary border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-primary">
        <a href="/">Quay lại trang chủ</a>
      </button>
    </div>
  )
}

export default NotFound
