import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { FeaturedGames } from "@/components/homepage/featured-games/featured-games";
import { Hero } from "@/components/homepage/hero";
import { Leaderboard } from "@/components/leaderboard/leaderboard";
import { Card } from "@/components/ui/card";

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedGames />
      <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-primary py-20 font-base">
        <div className="mx-auto items-center flex flex-col w-container max-w-screen-xl gap-5 px-5 space-y-6">
          <Card className="bg-yellow py-2 px-8">
            <h2 className="text-4xl text-shadow-lg font-bold flex justify-center">
              Leaderboards
            </h2>
          </Card>
          <div className="flex justify-center container gap-5">
            <div className="border-border dark:border-darkBorder dark:bg-darkBg flex flex-col justify-between rounded-base border-2 bg-white p-5">
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
