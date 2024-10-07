import { NextRequest, NextResponse } from "next/server";

interface Club {
  name: string;
  years: string;
  appearances: string | number;
  goals: number;
  isLoan: boolean;
}

interface PlayerData {
  name: string;
  clubs: Club[];
}

async function fetchPlayerData(
  playerName: string,
  playerWikiId: string
): Promise<PlayerData> {
  const endpoint = "https://en.wikipedia.org/w/api.php";

  const params = new URLSearchParams({
    action: "parse",
    page: playerWikiId,
    format: "json",
    prop: "wikitext",
    section: "0",
    origin: "*",
  });

  const url = `${endpoint}?${params}`;
  console.log("Fetching page content from URL:", url);

  const response = await fetch(url);
  const data = await response.json();

  console.log("API response:", JSON.stringify(data, null, 2));

  if (data.error) {
    console.error("Wikipedia API error:", data.error);
    throw new Error(`Wikipedia API error: ${data.error.info}`);
  }

  if (!data.parse || !data.parse.wikitext || !data.parse.wikitext["*"]) {
    console.error("Unexpected Wikipedia API response structure:", data);
    throw new Error("Unexpected Wikipedia API response structure");
  }

  const content = data.parse.wikitext["*"];

  console.log("content", content);

  const clubs: Club[] = [];
  const lines = content.split("\n");
  let currentClub: Partial<Club> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const [key, value] = line.split("=").map((part: string) => part.trim());

    if (key.startsWith("| years")) {
      if (currentClub.name) {
        clubs.push(currentClub as Club);
      }
      currentClub = { years: value };
    } else if (key.startsWith("| clubs")) {
      currentClub.name = value.replace(/\[\[|\]\]/g, "").split("|")[0];
      currentClub.isLoan = currentClub.name?.startsWith("→");
      if (currentClub.isLoan) {
        currentClub.name = currentClub.name?.substring(1).trim();
      }
    } else if (key.startsWith("| caps")) {
      currentClub.appearances = parseInt(value) || 0;
    } else if (key.startsWith("| goals")) {
      currentClub.goals = parseInt(value) || 0;
    }
  }

  // Push the last club if it exists
  if (currentClub.name) {
    clubs.push(currentClub as Club);
  }

  if (clubs.length === 0) {
    console.warn("No club information found for player:", playerName);
  } else {
    console.log("Extracted clubs:", clubs);
  }

  return {
    name: playerName,
    clubs: clubs,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const playerName = searchParams.get("name");
  const wikiId = searchParams.get("wikiId");

  if (!playerName) {
    return NextResponse.json(
      { error: "Player name is required" },
      { status: 400 }
    );
  }

  if (!wikiId) {
    return NextResponse.json({ error: "Wiki Id is required" }, { status: 400 });
  }

  try {
    const playerData = await fetchPlayerData(playerName, wikiId);
    return NextResponse.json(playerData);
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch player data",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
