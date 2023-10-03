import { useEffect, useState, useMemo } from "react";
//import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { useFetch } from "../../components/Hooks/useFetch";
//import { Link } from "react-router-dom";
import "./dayEvent.css";

interface Event {
  year: number;
  text: string;
  pages: Array<{ thumbnail: { source: string } }>;
}
interface ApiResponse {
  events: Event[]; // Assuming Event is defined somewhere in your code
}

export default function EventDisplay() {
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const url = useMemo(() => {
    return `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${selectedMonth}/${selectedDay}`;
  }, [selectedMonth, selectedDay]);

  //const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${selectedMonth}/${selectedDay}`;
  const { data, isLoading, isError } = useFetch<ApiResponse>(url);

  useEffect(() => {
    if (data && data.events) {
      setDayEvents(data.events);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Events for Today</h1>
      <div className="inputDateContainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectedMonth">Select Month: </label>
          <input
            type="number"
            id="selectedMonth"
            value={selectedMonth}
            min={1}
            max={12}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
          />
          <label htmlFor="selectedDay">Select Day: </label>
          <input
            type="number"
            id="selectedDay"
            value={selectedDay}
            min={1}
            max={31}
            onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
          />
        </form>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>Error fetching events.</p>
      ) : (
        <div className="eventContainer">
          {dayEvents.map((event, index) => (
            <div key={index} className="eventCard">
              <h2>{event.year}</h2>
              <p>{event.text}</p>
              {event.pages[0]?.thumbnail?.source && (
                <img
                  src={event.pages[0].thumbnail.source}
                  alt={`event-${index}`}
                />
              )}
              {/* <Link to={`/article/${encodeURIComponent(event.text)}`}>
                <Button text={"Read More"} />
              </Link> */}
              {/* <Link to={`/article/${encodeURIComponent(event.text)}`}>
                <Button text={"Read More"} />
              </Link> */}
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
