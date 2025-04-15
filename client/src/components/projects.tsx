import useIconMap from "@/hooks/useIconMap";
import useRepos from "@/hooks/useRepos";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import * as LucideIcons from "lucide-react";

export default function Projects() {
  document.title = "Projekte"
  const { data } = useRepos();
  const { data: iconMap } = useIconMap();
  const repos =
    data && iconMap
      ? data?.map((repo) => {
          return {
            title: repo.name,
            icon: LucideIcons[iconMap[repo.name] as keyof typeof LucideIcons],
            description: repo.description
          };
        })
      : [];
  return (
    <div className="pl-2 grid auto-rows-min gap-4 md:grid-cols-3">
      {repos.map((repo) => (
        <NavLink key={repo.title} to={`/projects/${repo.title}`}>
          <Card >
            <CardHeader>
              <div className="flex">
              <repo.icon className="relative bottom-1"></repo.icon>
                <CardTitle className="pl-2">{repo.title}</CardTitle>
              </div>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
          </Card>
        </NavLink>
      ))}
    </div>
  );
}
