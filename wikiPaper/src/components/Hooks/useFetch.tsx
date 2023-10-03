import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    // create a abort controller
    (async function () {
      // create a abort controller
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        const response = await fetch(url, { signal });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(true);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
      return () => controller?.abort();
    })();
  }, [url]);
  return { data, isLoading, isError, error };
};
