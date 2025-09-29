"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { ExternalLink } from "lucide-react";

interface ResourceItem {
  type: string;
  name: string;
  url: string;
}

interface ResourceCardProps {
  item: ResourceItem;
  categoryTitle: string;
}

export function ResourceCard({ item, categoryTitle }: ResourceCardProps) {
  const handleClick = () => {
    window.open(item.url, "_blank");
  };

  return (
    <Card
      className="group hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium capitalize">
            {item.name}
          </CardTitle>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <CardDescription className="text-xs">
          {new URL(item.url).hostname}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          Visit {item.name} for {categoryTitle.toLowerCase()} resources
        </p>
      </CardContent>
    </Card>
  );
}
