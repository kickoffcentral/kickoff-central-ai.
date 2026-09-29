import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const competition = searchParams.get("competition");

    const apiKey = process.env.FOOTBALL_DATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Football API key is not configured." },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();

    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (competition) params.set("competitions", competition);

    const response = await fetch(
      `https://api.football-data.org/v4/matches?${params.toString()}`,
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "Football data provider returned an error.",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to retrieve football data." },
      { status: 500 }
    );
  }
}
