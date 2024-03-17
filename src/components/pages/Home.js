import { useEffect, useState } from "react";
import { bffInstance, debounce } from "../../api/bff-api/bff-api";

export default function Home() {
  const [testImage, setTestImage] = useState("");

  const fetchImagesData = async () => {
    await bffInstance
      .get("/images/2")
      .then(function (response) {
        // handle success
        setTestImage(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    const navElements = document.getElementsByTagName("nav");
    navElements[0].style.display = "flex";
    debounce(fetchImagesData, 500);
  }, []);

  return (
    <div className="bg-white sm:text-sm md:text-3xl lg:text-4xl xl:text-4xl">
      <div className="relative isolate py-64 lg:px-8">
        <div className="text-center">
          <h1 className="font-bold tracking-tight lg:text-gray-900">
            Welcome to landing page...
          </h1>
          <div className="w-80">
            {/* TEST image display */}
            <h2>TEST image display</h2>
            <img src={testImage}></img>
          </div>
          <p className="mt-6 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}
