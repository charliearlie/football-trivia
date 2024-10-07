import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export const GamePreviewCard = ({
  description,
  slug,
  title,
}: {
  description: string;
  slug: string | null;
  title: string;
}) => {
  return (
    <Card className="bg-white dark:bg-darkBg dark:text-darkText">
      <CardHeader className="font-black">
        <h3 className="text-xl font-bold whitespace-nowrap tracking-tight">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="min-h-24 text-black font-base">{description}</p>
      </CardContent>
      <CardFooter className="flex p-4 justify-end">
        <Button
          variant="primary"
          disabled={!slug}
          className="w-full font-bold"
          asChild
        >
          {slug ? (
            <Link href={`/${slug}`}>Play game</Link>
          ) : (
            <span>Coming soon</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
