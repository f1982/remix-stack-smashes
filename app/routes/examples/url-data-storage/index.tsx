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

let isHydrating = true;

function MyApp() {
  const [isHydrated, setIsHydrated] = useState(!isHydrating);

  const [data, setData] = useState<MyData>({ name: "", age: 0 });

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  },[]);

  useEffect(() => {
    // Check if there is any data in the URL and parse it
    const newData = urlToData(window.location.href);
    console.log("newData", newData);
    if (newData != null) {
      setData(newData);
    }
  }, []);

  // Update the URL with the current data whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    console.log("rewrite url history");
    window.history.replaceState({}, document.title, dataToUrl(data));
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
          type="text"
          defaultValue={data.age}
          onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
}
