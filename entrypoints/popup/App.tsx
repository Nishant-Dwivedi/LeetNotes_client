import { useState } from "react";
import { Sheet } from "@/components/sheet";
import "./App.css";
import { InvalidHost } from "@/components/invalidHost";

function App() {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((res) => {
        let [tab] = res;
        if (tab.url !== undefined) {
          const problemName: string = getProblemNameFromURL(tab.url);
          // make an api call on the problem name and get the info about the current problem

          // resolve with the returned data
          return Promise.resolve(tab.url); // temp
        }
      })
      .then((res) => {
        // temp
        if (res !== undefined) {
          setUrl(res);
        }
      });
  }, []);

  return (
    <>
      {isCurrentUrlValid(url) ? <Sheet></Sheet> : <InvalidHost></InvalidHost>}
    </>
  );
}

function isCurrentUrlValid(hostName: string): boolean {
  const targetURL: string = "https://leetcode.com/problems/";
  if (
    hostName.slice(0, targetURL.length) == targetURL &&
    hostName.length > targetURL.length
  ) {
    return true;
  } else return false;
}

function getProblemNameFromURL(url: string): string {
  const temp: string = url.substring(
    new String("https://leetcode.com/problems/").length
  );
  const problemName: string = temp.substring(0, temp.indexOf("/"));
  return problemName;
}

export default App;
