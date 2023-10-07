import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string, debounceDelay: number = 700) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [debouncedUrl, setDebouncedUrl] = useState<string>(url);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(debouncedUrl, { signal });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsError(true);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [debouncedUrl]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedUrl(url);
    }, debounceDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [url, debounceDelay]);

  return { data, isLoading, isError, error };
};
