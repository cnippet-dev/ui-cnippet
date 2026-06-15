import { Separator } from "@/registry/default/ui/separator";

const breadcrumbs = ["Home", "Products", "Electronics", "Headphones"];

export function Pattern() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <li className="flex items-center gap-2" key={crumb}>
            {i < breadcrumbs.length - 1 ? (
              <>
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  {crumb}
                </a>
                <Separator className="h-4" orientation="vertical" />
              </>
            ) : (
              <span className="font-medium">{crumb}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
