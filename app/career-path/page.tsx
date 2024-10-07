import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/database.types";
import { Suspense } from "react";
import { headers } from "next/headers";
import { z } from "zod";
import CareerPathForm from "./career-path-form";
import { Card } from "@/components/ui/card";

interface Club {
  name: string;
  years: string;
  appearances: number | string;
  goals: number | string;
  isLoan: boolean;
}

interface PlayerData {
  name: string;
  clubs: Club[];
}

async function getRandomPlayer(): Promise<Tables<"career_path"> | null> {
  const supabase = createClient();

  const { data, error } = await supabase.from("career_path").select("*");

  if (error) {
    console.error("Error fetching random player:", error);
    return null;
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

async function getPlayerData(
  playerName: string,
  wikiId: string
): Promise<PlayerData> {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const response = await fetch(
    `${protocol}://${host}/api/career-path?name=${encodeURIComponent(playerName)}&wikiId=${encodeURIComponent(wikiId)}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch player data");
  }
  return response.json();
}

const formSchema = z.object({
  guess: z.string().min(1, "Guess is required"),
  playerId: z.string().min(1, "Player ID is required"),
});

async function handlePlayerSubmit(formData: FormData) {
  "use server";

  const validatedFields = formSchema.safeParse({
    guess: formData.get("guess"),
    playerId: formData.get("playerId"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const { guess, playerId } = validatedFields.data;

  const supabase = createClient();
  const { data: playerData, error } = await supabase
    .from("career_path")
    .select("*")
    .eq("id", playerId)
    .single();

  if (error || !playerData) {
    return { error: "Failed to fetch player data" };
  }

  const isCorrect = playerData.acceptedanswers
    .toLowerCase()
    .includes(guess.toLowerCase());

  return {
    isCorrect,
    message: isCorrect
      ? "Correct! The player was " + playerData.playername + "."
      : `Incorrect. Try again.`,
  };
}

async function CareerPathContent() {
  const randomPlayer = await getRandomPlayer();

  if (!randomPlayer) {
    return <div>Failed to fetch a random player. Please try again.</div>;
  }

  const playerData = await getPlayerData(
    randomPlayer.playername,
    randomPlayer.wiki_id
  );

  return (
    <>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-4 sm:p-8">
        <div className="mb-8 p-4 bg-bg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-black">
            Guess the player from their career path
          </h1>
        </div>
        <CareerPathForm
          randomPlayer={randomPlayer}
          playerData={playerData}
          handlePlayerSubmit={handlePlayerSubmit}
        />
      </div>
      <p>
        Data is sourced from a very difficult to work with Wikimedia. If there
        are any clubs missing,{" "}
        <Link className="underline" href={"/"}>
          please report this question
        </Link>
      </p>
    </>
  );
}

export default function CareerPath() {
  return (
    <div className="p-4 bg-primary">
      <div className="min-h-screen bg-primary p-4 gap-8 sm:p-8 flex flex-col items-center justify-center">
        <Suspense
          fallback={
            <div
              className="w-12 h-12 border-4 border-[#FFEB3A] border-t-transparent rounded-full animate-spin"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <Card className="p-2 font-bold flex gap-4">
            <Link href="/" className="p-4">
              Home
            </Link>
            <Link href="/" className="p-4">
              Games
            </Link>
            <Link href="/" className="p-4">
              Sign up
            </Link>
          </Card>
          <CareerPathContent />
        </Suspense>
      </div>
    </div>
  );
}
