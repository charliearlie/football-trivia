"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { Tables } from "@/database.types";

import { Club, ObscuredClub } from "./club";

export interface ClubType {
  name: string;
  years: string;
  appearances: number | string;
  goals: number | string;
  isLoan: boolean;
}

interface PlayerData {
  name: string;
  clubs: ClubType[];
}

interface CareerPathFormProps {
  randomPlayer: Tables<"career_path">;
  playerData: PlayerData;
  handlePlayerSubmit: (
    formData: FormData
  ) => Promise<{ error?: string; isCorrect?: boolean; message?: string }>;
}

export default function CareerPathForm({
  randomPlayer,
  playerData,
  handlePlayerSubmit,
}: CareerPathFormProps) {
  const [numberOfClubsToDisplay, setNumberOfClubsToDisplay] = useState(1);
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    error?: string;
    isCorrect?: boolean;
    message?: string;
  } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGuessHistory([...guessHistory, event.currentTarget.guess.value]);
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const result = await handlePlayerSubmit(formData);

    if (!result.isCorrect) {
      setNumberOfClubsToDisplay(numberOfClubsToDisplay + 1);
    } else {
      setNumberOfClubsToDisplay(playerData.clubs.length);
    }

    setResult(result);
    setIsSubmitting(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div
          className={cn(
            "w-full bg-primary md:min-h-10 p-2 border-4 border-black transition-all",
            "text-left text-sm md:text-base font-bold flex border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
          )}
        >
          <p className="basis-2/12 md:basis-3/12">Years</p>
          <p className="basis-8/12 md:basis-7/12">Team name</p>
          <p className="basis-2/12 md:basis-1/12 text-center">Apps</p>
          <p className="basis-2/12 md:basis-1/12 text-center">Goals</p>
        </div>
        {playerData.clubs.map((club, index) =>
          index <= numberOfClubsToDisplay - 1 ? (
            <Club key={index} club={club} />
          ) : (
            <ObscuredClub key={index} />
          )
        )}
      </div>
      {guessHistory.length > 0 && (
        <div className="mt-4 p-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold border-4 bg-primary">
          <h2 className="text-xl font-bold">Guess History</h2>
          <ul className="list-disc list-inside">
            {guessHistory.map((guess, index) => (
              <li key={index}>{guess}</li>
            ))}
          </ul>
        </div>
      )}
      {result?.error && (
        <div className="mt-4 p-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold border-4 bg-red-200">
          {result.error}
        </div>
      )}
      {result?.message && (
        <div
          className={`mt-4 p-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold border-4 ${
            result.isCorrect ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {result.message}
        </div>
      )}
      <form className="w-full flex flex-col gap-4 mt-8" onSubmit={onSubmit}>
        <Input
          className="text-lg font-bold text-center"
          name="guess"
          placeholder="Enter the player's name"
          required
        />
        <input type="hidden" name="playerId" value={randomPlayer.id} />
        <Button
          type="submit"
          className="w-full bg-green-500 text-xl font-bold py-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </form>
    </>
  );
}
