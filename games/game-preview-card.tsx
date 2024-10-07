import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GamePreviewCard = ({
  description,
  slug,
  title,
}: {
  description: string;
  slug: string;
  title: string;
}) => {
  return (
    <Card className="bg-white dark:bg-darkBg dark:text-darkText">
      <img
        className="w-full object-cover h-52 border-b-2 border-border dark:border-darkBorder"
        height={300}
        width={500}
        src="/placeholder.jpg"
        alt="Placeholder image"
      />
      <CardHeader>
        <h3 className="text-xl font-heading">{title}</h3>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm min-h-16 text-black font-base">{description}</p>
      </CardContent>
      <CardFooter className="flex pt-0 pb-4 justify-end">
        <Button asChild>
          <Link href={`/${slug}`}>Play game</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
