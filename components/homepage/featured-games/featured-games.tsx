import { GamePreviewCard } from "@/components/games/game-preview-card";
import { featuredGames } from "./featured-games-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const FeaturedGames = () => {
  return (
    <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-yellow py-20 font-base">
      <div className="mx-auto w-container max-w-screen-xl gap-5 px-5 space-y-12">
        <Card className="bg-primary mb- mx-auto w-fit py-2 px-8">
          <h2 className="text-2xl md:text-4xl text-shadow-lg font-bold flex justify-center">
            Featured Games
          </h2>
        </Card>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
