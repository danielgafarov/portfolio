import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import useIconMap from "@/hooks/useIconMap";
import useRepos from "@/hooks/useRepos";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { FolderCode, Home, User } from "lucide-react";
import { NavLink } from "react-router";
import * as LucideIcons from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Projekte",
    url: "/projects",
    icon: FolderCode,
    projects: [],
  },
  {
    title: "Über mich",
    url: "/about",
    icon: User,
  },
];

export function AppSidebar() {
  const { data } = useRepos();
  const { data: iconMap } = useIconMap();
  const projects =
    data && iconMap
      ? data?.map((repo) => {
          return {
            title: repo.name,
            icon: LucideIcons[iconMap[repo.name] as keyof typeof LucideIcons],
            id: repo.name,
          };
        })
      : [];
  items[1].projects = projects;
  return (
    <Sidebar>
      <SidebarHeader>Daniel Gafarov</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen disabled className="group/collapsible">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                    {item.projects && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.projects.map((project) => (
                            <SidebarMenuSubItem key={project.title}>
                              <SidebarMenuButton asChild>
                                <NavLink to={`/projects/${project.id}`}>
                                  <project.icon />
                                  <span>{project.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
