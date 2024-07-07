"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Details {
  username: string;
  email: string;
  Events: Event[];
}

const Page = () => {
  const { data: session } = useSession();
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/user/profile?Name=deepanshu`);
        const { status, message, details } = res.data;

        if (status === 200 && details && typeof details === 'object') {
          setDetails(details);
        } else {
          console.error("Unexpected response:", res.data);
          setError(message || "Unexpected data format received from server");
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {details && (
        <div>
          <h1>{details.username}</h1>
          <p>{details.email}</p>
          <ul>
            {details.Events.map(event => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
