import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const articles = [
  { minutes: 6, tag: "Design", title: "Designing calm interfaces" },
  {
    minutes: 4,
    tag: "Engineering",
    title: "Shipping a design system in a monorepo",
  },
  {
    minutes: 8,
    tag: "Accessibility",
    title: "Keyboard support that just works",
  },
  { minutes: 5, tag: "Product", title: "Writing release notes people read" },
  { minutes: 7, tag: "Engineering", title: "Theming with CSS variables" },
];

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <span className="text-muted-foreground text-xs">{article.tag}</span>
        <p className="font-medium text-sm leading-snug">{article.title}</p>
        <span className="mt-auto text-muted-foreground text-xs">
          {article.minutes} min read
        </span>
      </CardContent>
    </Card>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full flex-col items-center gap-8 px-12">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <span className="text-muted-foreground text-xs">
          Horizontal, two per view
        </span>
        <Carousel className="w-full" opts={{ align: "start" }}>
          <CarouselContent>
            {articles.map((article) => (
              <CarouselItem className="basis-1/2" key={article.title}>
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <span className="text-muted-foreground text-xs">Vertical</span>
        <Carousel
          className="my-10 w-full"
          opts={{ align: "start" }}
          orientation="vertical"
        >
          <CarouselContent className="-mt-2 h-56">
            {articles.map((article) => (
              <CarouselItem className="basis-1/2 pt-2" key={article.title}>
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
