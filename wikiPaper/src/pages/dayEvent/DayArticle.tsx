import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventTitle } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Construct the Wikipedia API endpoint using the event title
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${eventTitle}`
        );

        if (response.ok) {
          const data = await response.json();
          setEventDetails(data);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventTitle]);

  return (
    <div>
      <h1>Event Details</h1>
      <h2>{eventDetails.title}</h2>
      <p>{eventDetails.extract}</p>
      {eventDetails.thumbnail && eventDetails.thumbnail.source && (
        <img src={eventDetails.thumbnail.source} alt={`event-thumbnail`} />
      )}
    </div>
  );
};

export default EventDetails;
