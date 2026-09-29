"use client";

import { useEffect, useState } from "react";

type Match = {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: {
    name: string;
    crest?: string;
  };
  awayTeam: {
    name: string;
    crest?: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
};

export default function LeaguePage({
  params,
}: {
  params: { league: string };
}) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const league = params.league;

  useEffect(() => {
    async function loadMatches() {
      try {
        const today = new Date();

        const dateFrom = today.toISOString().split("T")[0];

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);

        const dateTo = futureDate.toISOString().split("T")[0];

        const response = await fetch(
          `/api/matches?competition=${league}&dateFrom=${dateFrom}&dateTo=${dateTo}`
        );

        if (!response.ok) {
          throw new Error("Unable to load matches");
        }

        const data = await response.json();

        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load fixtures.");
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [league]);

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">LIVE FOOTBALL DATA</p>

        <h1>{league}</h1>

        <p>
          Fixtures and results for this competition.
        </p>
      </section>

      {loading && (
        <div className="analysis">
          <h2>Loading fixtures...</h2>
          <p>Getting the latest football data.</p>
        </div>
      )}

      {error && (
        <div className="analysis">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="analysis">
          <h2>No fixtures found</h2>
          <p>
            There are no fixtures available for this competition in the
            selected period.
          </p>
        </div>
      )}

      {!loading && !error && matches.length > 0 && (
        <section className="matchgrid">
          {matches.map((match) => {
            const matchDate = new Date(match.utcDate);

            return (
              <article className="match" key={match.id}>
                <p>
                  {matchDate.toLocaleDateString()}{" "}
                  {matchDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div>
                  {match.homeTeam.crest && (
                    <img
                      src={match.homeTeam.crest}
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}

                  <strong>{match.homeTeam.name}</strong>
                </div>

                <div>
                  {match.awayTeam.crest && (
                    <img
                      src={match.awayTeam.crest}
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}

                  <strong>{match.awayTeam.name}</strong>
                </div>

                <p>
                  Status: {match.status}
                </p>

                {(match.score.full
