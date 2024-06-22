import { Link } from 'react-router-dom'

import MainLayout from 'components/MainLayout'

function AboutPage() {
  return (
    <MainLayout>
      <div className="about">
        <img
          className="w-full h-48 object-cover align-bottom md:h-[480px]"
          src="https://res.cloudinary.com/dgyusabsy/image/upload/v1719027908/blog-app/oq67gxmm8v8z5bjlpdwm.png"
          alt="van-phong"
        />

        <div className="container mx-auto px-5">
          <div className="my-0 py-12 px-5 flex flex-col justify-center items-center text-center lg:px-2 lg:text-left">
            <h3 className="my-0 mb-6 text-2xl font-semibold lg:text-1.5xl md:mb-4 md:text-1.2xl">
              BlogApp is a place where writers can share information, opinions,
              and experiences on various topics.
            </h3>
            <p className="max-w-screen-lg text-sm font-medium leading-normal text-gray-500 text-center">
              Launched in 2024, BlogApp is a place where writers can freely
              share information, opinions, and experiences on a variety of
              topics. With BlogApp, sharing and connecting is no longer limited
              by distance or time, providing an open space for everyone to learn
              and grow together.
            </p>
            <p className="mt-2 max-w-screen-lg text-sm font-medium leading-normal text-gray-500 text-center">
              We believe that sharing and connecting information should be
              simple, easy, and enjoyable for users. This mission drives us to
              develop BlogApp every day. We aim to create a platform where
              everyone can easily and safely share their knowledge, viewpoints,
              and experiences.
            </p>
            <Link
              to="/"
              rel="noreferrer"
              target="_blank"
              className="mt-10 lg:mt-8 md:w-full flex items-center justify-center"
            >
              <button className="rounded-full bg-primary px-8 py-3 text-white">
                Learn more
              </button>
            </Link>
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center mb-8 gap-8 w-full lg:flex-row lg:gap-5 lg:mb-6">
              <div className="flex flex-col lg:max-w-screen max-w-[494px] h-[220px] items-center justify-center p-5 text-center rounded-md bg-white shadow-md md:shadow-sm lg:p-2 lg:text-left">
                <h5 className=" mb-2 text-2xl font-semibold leading-normal lg:text-2xl text-center">
                  Our Mission
                </h5>
                <p className="text-sm leading-normal text-gray-500 text-center">
                  {' '}
                  {`At BlogApp, our mission is to deliver high-quality articles that
                are thoroughly researched and written with passion. We aim to
                enrich your understanding of education and technology, whether
                you're just starting out or are already well-versed in these
                areas. Our goal is to make valuable information accessible and
                engaging for everyone.`}
                </p>
              </div>
              <div className="flex flex-col lg:max-w-screen max-w-[494px] h-[220px] items-center justify-center p-5 text-center rounded-md bg-white shadow-md md:shadow-sm lg:p-2 lg:text-left">
                <h5 className="mb-2 text-2xl font-semibold leading-normal lg:text-2xl text-center">
                  What We Share
                </h5>
                <p className="text-sm leading-normal text-gray-500 text-center">
                  {`At BlogApp, we focus on high-quality content about education and
                technology. Our articles cover the latest trends, research, and
                best practices in education, along with tips on using technology
                effectively. We share personal stories, offer reviews of
                educational tools, and provide insights into real-world
                applications. Whether you're just starting out or already
                well-versed in these fields, we aim to offer something valuable
                for everyone.`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center mb-10 gap-8 w-full lg:flex-col lg:gap-5 lg:mb-6">
              <div className="flex flex-col items-center justify-center p-5 max-w-screen-md text-center rounded-md bg-white shadow-md md:shadow-sm xl:max-w-full">
                <h5 className="mb-2 text-2xl font-semibold leading-normal lg:text-2xl">
                  Our Motto
                </h5>
                <p className=" max-w-screen-lg text-xl leading-normal text-gray-600">
                  Our motto at BlogApp revolves around three core principles:
                </p>

                <div className="mt-8 lg:mt-5">
                  <div className="flex flex-col lg:flex-row">
                    <div className="px-4 max-w-[calc(100%/3)] h-[395px]">
                      <div className=" mb-6 lg:mb-4">
                        <img
                          src="https://res.cloudinary.com/dgyusabsy/image/upload/v1719045587/blog-app/oc3hgz06rgsgn59zfx2s.png"
                          className="w-full h-[240px] rounded-lg shadow-md md:shadow-sm"
                          alt="simple"
                        />
                        <strong>Quality Content:</strong> We strive to deliver
                        well-researched and insightful articles.
                      </div>
                    </div>
                    <div className="px-4 max-w-[calc(100%/3)] h-[395px]">
                      <div className="mb-6 lg:mb-4">
                        <img
                          src="https://res.cloudinary.com/dgyusabsy/image/upload/v1719045723/blog-app/hvgrmffpnstpb2k74uvd.jpg"
                          className="w-full h-[240px] rounded-lg shadow-md md:shadow-sm"
                          alt="simple"
                        />
                        <strong>Continuous Learning:</strong> We believe in
                        lifelong learning and the continuous pursuit of
                        knowledge.
                      </div>
                    </div>
                    <div className="max-w-[calc(100%/3)] px-4 h-[395px]">
                      <div className="mb-6 lg:mb-4">
                        <img
                          src="https://res.cloudinary.com/dgyusabsy/image/upload/v1719045895/blog-app/uh9rnixjovrs0jbsskij.jpg"
                          className="w-full h-[240px] rounded-lg shadow-md md:shadow-sm"
                          alt="simple"
                        />
                        <strong>Community Engagement:</strong> We value our
                        readers and aim to create a community of like-minded
                        individuals.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col items-center justify-center p-5 max-w-screen-md text-center rounded-md bg-white shadow-md md:shadow-sm xl:max-w-full">
                <h5 className="mb-2 text-2xl font-semibold leading-normal lg:text-2xl">
                  Our Team
                </h5>
                <p className=" max-w-screen-lg text-xl leading-normal text-gray-600">
                  BlogApp was created by Vũ Đức Dũng, a passionate advocate for
                  education and technology. Supported by a dedicated and
                  experienced team of contributors, we are committed to bringing
                  you the best quality articles. We value your feedback and are
                  always looking for ways to improve and grow.
                </p>

                <div className=" mt-8 lg:mt-5">
                  <div className="row flex flex-wrap -mx-4">
                    <div className="col col-12 col-xxl-4 col-xl-4 col-lg-6 px-4">
                      <div className="-item mb-6 lg:mb-4">
                        <img
                          src="https://res.cloudinary.com/dgyusabsy/image/upload/v1719046669/blog-app/kagllv29h1v7gflqxmrg.jpg"
                          className=" w-full rounded-lg shadow-md md:shadow-sm"
                          alt="simple"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AboutPage
