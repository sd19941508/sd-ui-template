import { useEffect, useState } from "react";
import { testInstance, debounce } from "../../api/test-api/api";

export default function Example() {
  const [postsData, setPostsData] = useState([]);
  const fetchData = () => {
    testInstance
      .get("/posts")
      .then(function (response) {
        // handle success
        setPostsData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    // Now you can use testInstance to make API requests
    debounce(fetchData, 500);
  }, []);

  return (
    <div className="isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-12">
        <ul
          role="list"
          className="divide-y divide-gray-100 bg-scroll overflow-auto h-screen lg:w-full"
        >
          {postsData.map((person, index) => (
            <li
              key={person.id}
              className="flex justify-between gap-x-6 py-5 px-4 bg-gray-200 mb-4"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={`https://reqres.in/img/faces/4-image.jpg`}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.title}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.body.slice(0, 12)}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Co-Founder / CEO- {person.id}
                </p>
                {person.id ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen{" "}
                    <time dateTime={person.id}>3{person.id}h ago</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
