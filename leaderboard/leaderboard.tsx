import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
export const Leaderboard = () => {
  return (
    <Tabs defaultValue="monthly" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when youre done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name">Name</label>
              <input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <label htmlFor="username">Username</label>
              <input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="noShadow"
              className="w-full bg-white text-text dark:bg-secondaryBlack dark:text-darkText"
            >
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="monthly">
        <div className="w-full flex flex-col gap-2">
          <Badge className="font-boldflex justify-between">
            <span className="font-bold flex">
              <div className="w-5">1.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">2.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">3.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">4.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">5.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font- flex">
              <div className="w-5">6.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">7.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">8.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">9.</div> Dave
            </span>
            <span>15</span>
          </Badge>
          <Badge className="font-bold bg-bg flex justify-between">
            <span className="font-bold flex">
              <div className="w-5">10.</div> Dave
            </span>
            <span>15</span>
          </Badge>
        </div>
      </TabsContent>
    </Tabs>
  );
};
