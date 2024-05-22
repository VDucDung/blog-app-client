const ManagePosts = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
          <h2 className="text-2xl leading-tight">Users</h2>
          <div className="text-end">
            <form className="flex w-3/4 max-w-sm flex-col justify-center space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="name"
                />
              </div>
              <button
                className="flex-shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#" className="relative block">
                          <img
                            alt="profil"
                            src="/images/person/8.jpg"
                            className="mx-auto h-10 w-10 rounded-full object-cover "
                          />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap text-gray-900">
                          Jean marc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Admin</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      12/09/2020
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                      ></span>
                      <span className="relative">active</span>
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#" className="relative block">
                          <img
                            alt="profil"
                            src="/images/person/9.jpg"
                            className="mx-auto h-10 w-10 rounded-full object-cover "
                          />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap text-gray-900">
                          Marcus coco
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">Designer</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      01/10/2012
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                      ></span>
                      <span className="relative">active</span>
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#" className="relative block">
                          <img
                            alt="profil"
                            src="/images/person/10.jpg"
                            className="mx-auto h-10 w-10 rounded-full object-cover "
                          />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap text-gray-900">
                          Ecric marc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      Developer
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      02/10/2018
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                      ></span>
                      <span className="relative">active</span>
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#" className="relative block">
                          <img
                            alt="profil"
                            src="/images/person/6.jpg"
                            className="mx-auto h-10 w-10 rounded-full object-cover "
                          />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap text-gray-900">
                          Julien Huger
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">User</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      23/09/2010
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                      ></span>
                      <span className="relative">active</span>
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    width={9}
                    fill="currentColor"
                    height={8}
                    className
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full border-b border-t bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100 "
                >
                  1
                </button>
                <button
                  type="button"
                  className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                >
                  2
                </button>
                <button
                  type="button"
                  className="w-full border-b border-t bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                >
                  3
                </button>
                <button
                  type="button"
                  className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                >
                  4
                </button>
                <button
                  type="button"
                  className="w-full rounded-r-xl border-b border-r border-t bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    width={9}
                    fill="currentColor"
                    height={8}
                    className
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePosts
