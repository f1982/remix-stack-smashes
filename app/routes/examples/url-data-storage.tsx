import { useEffect, useState } from "react";
import Layout from "~/components/layout";

export default function index() {
  return (
    <Layout title="URL data storage">
      <MyApp />
    </Layout>
  );
}

// Define your data format
interface MyData {
  name: string;
  age: number;
}

// Convert data to URL string
function dataToUrl(data: MyData): string {
  return `${window.location.pathname}?data=${encodeURIComponent(
    JSON.stringify(data)
  )}`;
}

// Parse data from URL string
function urlToData(url: string): MyData | null {
  const match = url.match(/^[^?]+\?data=([^&]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch (e) {
    return null;
  }
}

function MyApp() {
  const [data, setData] = useState<MyData>({ name: "", age: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Check if there is any data in the URL and parse it
  useEffect(() => {
    const urlData = urlToData(window.location.href);
    if (urlData != null) {
      setData(urlData);
    }
    setIsLoaded(true)
  }, []);

  // Update the URL with the current data whenever it changes
  useEffect(() => {
    if(isLoaded){
      window.history.replaceState({}, document.title, dataToUrl(data));
    }
  }, [data]);

  return (
    <div>
      <div>
        <label htmlFor="userName">Name: </label>
        <input
          id="userName"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          type="text"
          defaultValue={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="userAge">Age: </label>
        <input
          id="userAge"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          type="number"
          defaultValue={data.age}
          onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
}
