import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

export const Hero = () => {
  return (
    <header className="dark:bg-darkBg site-header inset-0 flex w-full flex-col items-center justify-center">
      <div className="mx-auto text-white w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <Card className="p-6">
          <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
            Football Trivia
          </h1>
          <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
            Test your football knowledge with our range of football trivia.
          </p>
          <Button
            size="lg"
            variant="neutral"
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
          >
            View our range of quizzes
          </Button>
        </Card>
      </div>
    </header>
  );
};
