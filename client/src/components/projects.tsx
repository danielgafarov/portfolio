import useRepos, { RepoInfo } from "@/hooks/useRepos";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export default function Projects() {
  document.title = "Projekte"
  const { data } = useRepos();
  const repos =
    data
      ? data?.map((repo: RepoInfo) => {
          return {
            title: repo.name,
            icon: repo.icon,
            description: repo.description
          };
        })
      : [];
  return (
    <div className="pl-2 grid auto-rows-min gap-4 md:grid-cols-3">
      {repos.map((repo: { title: string; description: string; icon: IconName}) => (
        <NavLink key={repo.title} to={`/projects/${repo.title}`}>
          <Card >
            <CardHeader>
              <div className="flex">
              <DynamicIcon name={repo.icon} className="relative bottom-1"></DynamicIcon>
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
