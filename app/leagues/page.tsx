"use client";

import { useEffect, useState } from "react";

type Competition = {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem?: string;
  area?: {
    name: string;
  };
};

export default function LeaguesPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCompetitions() {
      try {
        const response = await fetch("/api/competitions");

        if (!response.ok) {
          throw new Error("Unable to load competitions");
        }

        const data = await response.json();

        setCompetitions(data.competitions || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load leagues. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadCompetitions();
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">FOOTBALL ANALYTICS</p>

        <h1>Leagues</h1>

        <p>
          Choose a competition to view fixtures, results and football
          statistics.
        </p>
      </section>

      {loading && (
        <div className="analysis">
          <h2>Loading leagues...</h2>
          <p>Getting competitions from the football data provider.</p>
        </div>
      )}

      {error && (
        <div className="analysis">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <section className="leaguegrid">
          {competitions.map((league) => (
            <a
              key={league.id}
              href={`/leagues/${league.code}`}
              className="match"
            >
              {league.emblem && (
                <img
                  src={league.emblem}
                  alt=""
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              )}

              <h2>{league.name}</h2>

              <p>
                {league.area?.name || "International"} · {league.code}
              </p>

              <span>View fixtures →</span>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}
