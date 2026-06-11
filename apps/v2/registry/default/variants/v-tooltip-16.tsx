import { CheckIcon, MinusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type Access = "full" | "read" | "none";

type Permission = {
  resource: string;
  admin: Access;
  editor: Access;
  viewer: Access;
  detail: string;
};

const permissions: Permission[] = [
  {
    admin: "full",
    detail: "Create, update, and delete workspace members and their roles.",
    editor: "none",
    resource: "Members",
    viewer: "none",
  },
  {
    admin: "full",
    detail: "Publish, archive, and permanently remove documents.",
    editor: "full",
    resource: "Documents",
    viewer: "read",
  },
  {
    admin: "full",
    detail: "Manage API keys, OAuth apps, and third-party connections.",
    editor: "read",
    resource: "Integrations",
    viewer: "none",
  },
  {
    admin: "full",
    detail: "View and export activity logs for auditing.",
    editor: "read",
    resource: "Audit Logs",
    viewer: "none",
  },
];

const roles = ["admin", "editor", "viewer"] as const;

function AccessCell({ access, detail }: { access: Access; detail: string }) {
  const icon =
    access === "full" ? (
      <CheckIcon className="size-3.5 text-emerald-500" />
    ) : access === "read" ? (
      <CheckIcon className="size-3.5 text-amber-500" />
    ) : (
      <MinusIcon className="size-3.5 text-muted-foreground" />
    );

  const label =
    access === "full"
      ? "Full access"
      : access === "read"
        ? "Read only"
        : "No access";

  return (
    <Tooltip>
      <TooltipTrigger className="flex cursor-default items-center justify-center">
        {icon}
      </TooltipTrigger>
      <TooltipContent className="p-2.5">
        <p className="font-medium">{label}</p>
        <p className="max-w-44 text-muted-foreground">{detail}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function Pattern() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <TooltipProvider>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                Resource
              </th>
              {roles.map((role) => (
                <th
                  className="px-4 py-2.5 text-center font-medium text-muted-foreground capitalize"
                  key={role}
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map(({ resource, admin, editor, viewer, detail }) => (
              <tr className="border-b last:border-0" key={resource}>
                <td className="px-4 py-2.5 font-medium">{resource}</td>
                <td className="px-4 py-2.5 text-center">
                  <AccessCell access={admin} detail={detail} />
                </td>
                <td className="px-4 py-2.5 text-center">
                  <AccessCell access={editor} detail={detail} />
                </td>
                <td className="px-4 py-2.5 text-center">
                  <AccessCell access={viewer} detail={detail} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TooltipProvider>
    </div>
  );
}
