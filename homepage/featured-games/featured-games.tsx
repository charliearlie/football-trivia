import { GamePreviewCard } from "@/components/games/game-preview-card";
import { featuredGames } from "./featured-games-list";
import { Button } from "@/components/ui/button";

export const FeaturedGames = () => {
  return (
    <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-bg py-20 font-base">
      <div className="mx-auto w-container max-w-screen-xl gap-5 px-5 space-y-6">
        <h2 className="text-2xl font-bold">Featured games</h2>
        <div className="grid container grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredGames.map((game) => (
            <GamePreviewCard
              key={game.slug}
              title={game.title}
              description={game.description}
              slug={game.slug}
            />
          ))}
        </div>
        <div className="flex justify-center md:justify-end">
          <Button size="lg" variant="neutral">
            View all games
          </Button>
        </div>
      </div>
    </section>
  );
};
