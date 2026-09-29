"use client";

import { useState } from "react";

const matches = [
  {
    home: "Arsenal",
    away: "Chelsea",
    league: "Premier League",
    time: "20:00",
    homeForm: "WWDWW",
    awayForm: "WDLDW",
    xgHome: 1.82,
    xgAway: 1.21,
    shotsHome: 15,
    shotsAway: 10,
    sotHome: 6,
    sotAway: 4,
  },
  {
    home: "Barcelona",
    away: "Sevilla",
    league: "LaLiga",
    time: "21:00",
    homeForm: "WWWWW",
    awayForm: "DLWDL",
    xgHome: 2.14,
    xgAway: 0.92,
    shotsHome: 17,
    shotsAway: 8,
    sotHome: 8,
    sotAway: 3,
  },
  {
    home: "Inter Milan",
    away: "Roma",
    league: "Serie A",
    time: "19:45",
    homeForm: "WDDWW",
    awayForm: "WLWDL",
    xgHome: 1.67,
    xgAway: 1.08,
    shotsHome: 14,
    shotsAway: 9,
    sotHome: 5,
    sotAway: 3,
  },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("Overview");

  const match = matches[selected];

  return (
    <main className="page">
      <header className="header">
        <div className="brand">
          <div className="logo">⚽</div>
          <div>
            <h1>KickOff Central AI</h1>
            <p>Football Intelligence Platform</p>
          </div>
        </div>

        <div className="status">
          <span className="dot"></span>
          Analytics Online
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">AI FOOTBALL ANALYTICS</p>
          <h2>Understand the game<br />before it starts.</h2>
          <p className="heroText">
            Analyze team form, expected goals, shots, scoring trends,
            defensive performance and match statistics in one place.
          </p>
        </div>

        <div className="heroBall">⚽</div>
      </section>

      <section className="dashboard">
        <div className="sectionTitle">
          <div>
            <span className="eyebrow">MATCH CENTRE</span>
            <h3>Today's Matches</h3>
          </div>
          <span className="date">29 September 2026</span>
        </div>

        <div className="matchList">
          {matches.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`matchCard ${
                selected === index ? "active" : ""
              }`}
            >
              <div className="matchTop">
                <span>{item.league}</span>
                <span>{item.time}</span>
              </div>

              <div className="teams">
                <strong>{item.home}</strong>
                <span>vs</span>
                <strong>{item.away}</strong>
              </div>

              <div className="form">
                <div>
                  <small>HOME FORM</small>
                  <p>{item.homeForm}</p>
                </div>
                <div>
                  <small>AWAY FORM</small>
                  <p>{item.awayForm}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="analysisHeader">
          <div>
            <span className="eyebrow">{match.league}</span>
            <h3>{match.home} vs {match.away}</h3>
          </div>
          <span className="liveBadge">STATISTICAL ANALYSIS</span>
        </div>

        <nav className="tabs">
          {["Overview", "Attack", "Defence", "Trends"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={tab === item ? "tab activeTab" : "tab"}
            >
              {item}
            </button>
          ))}
        </nav>

        {tab === "Overview" && (
          <>
            <div className="statGrid">
              <Stat
                title="Expected Goals"
                home={match.xgHome.toFixed(2)}
                away={match.xgAway.toFixed(2)}
                icon="📊"
              />

              <Stat
                title="Total Shots"
                home={match.shotsHome}
                away={match.shotsAway}
                icon="🎯"
              />

              <Stat
                title="Shots on Target"
                home={match.sotHome}
                away={match.sotAway}
                icon="🥅"
              />

              <Stat
                title="Recent Form"
                home={match.homeForm}
                away={match.awayForm}
                icon="📈"
              />
            </div>

            <div className="insight">
              <div className="insightIcon">🤖</div>
              <div>
                <h4>AI Statistical Insight</h4>
                <p>
                  {match.home} currently produces{" "}
                  <strong>{match.xgHome.toFixed(2)} xG</strong> per match
                  in this sample, compared with{" "}
                  <strong>{match.xgAway.toFixed(2)} xG</strong> for{" "}
                  {match.away}. Compare the underlying numbers rather
                  than relying on a single statistic.
                </p>
              </div>
            </div>
          </>
        )}

        {tab === "Attack" && (
          <div className="detailGrid">
            <Detail title="Home xG" value={match.xgHome.toFixed(2)} />
            <Detail title="Away xG" value={match.xgAway.toFixed(2)} />
            <Detail title="Home Shots" value={match.shotsHome} />
            <Detail title="Away Shots" value={match.shotsAway} />
            <Detail title="Home SOT" value={match.sotHome} />
            <Detail title="Away SOT" value={match.sotAway} />
          </div>
        )}

        {tab === "Defence" && (
          <div className="insight">
            <div className="insightIcon">🛡️</div>
            <div>
              <h4>Defensive Analysis</h4>
              <p>
                Defensive evaluation should combine goals conceded,
                expected goals against, shots conceded, shots on target
                conceded and clean-sheet trends. Connect a live statistics
                provider later to populate these metrics automatically.
              </p>
            </div>
          </div>
        )}

        {tab === "Trends" && (
          <div className="trendBox">
            <h4>Recent Form</h4>

            <div className="trendRow">
              <span>{match.home}</span>
              <div className="formLarge">
                {match.homeForm.split("").map((x, i) => (
                  <b key={i}>{x}</b>
                ))}
              </div>
            </div>

            <div className="trendRow">
              <span>{match.away}</span>
              <div className="formLarge">
                {match.awayForm.split("").map((x, i) => (
                  <b key={i}>{x}</b>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="features">
        <Feature icon="📊" title="Team Analytics" text="Form, xG, shots and performance trends." />
        <Feature icon="⚡" title="Attack Analysis" text="Understand attacking volume and efficiency." />
        <Feature icon="🛡️" title="Defensive Data" text="Compare defensive performance and trends." />
        <Feature icon="🤖" title="AI Insights" text="Turn football statistics into readable analysis." />
      </section>

      <footer>
        <strong>KickOff Central AI</strong>
        <span>Football analytics • Statistical research • Match intelligence</span>
      </footer>
    </main>
  );
}

function Stat({
  title,
  home,
  away,
  icon,
}: {
  title: string;
  home: string | number;
  away: string | number;
  icon: string;
}) {
  return (
    <div className="statCard">
      <div className="statTitle">
        <span>{icon}</span>
        {title}
      </div>

      <div className="statValues">
        <strong>{home}</strong>
        <span>vs</span>
        <strong>{away}</strong>
      </div>
    </div>
  );
}

function Detail({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="detailCard">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="feature">
      <div className="featureIcon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
