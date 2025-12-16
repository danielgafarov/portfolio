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
import useRepos from "@/hooks/useRepos";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { NavLink } from "react-router";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

type Item = {title: string; url: string; icon: IconName; projects?: Project[]} 
type Project = {title: string; icon: IconName; id: string}
const items:Item[] = [
  {
    title: "Home",
    url: "/",
    icon: "house",
  },
  {
    title: "Projekte",
    url: "/projects",
    icon: "folder-code",
    projects: [],
  }
];


export function AppSidebar() {
  const { data: repos = []} = useRepos();
  
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
                        <DynamicIcon name={item.icon}></DynamicIcon>
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                    {item.title == "Projekte" && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {repos.map((repo) => (
                            <SidebarMenuSubItem key={repo.name}>
                              <SidebarMenuButton asChild>
                                <NavLink to={`/projects/${repo.name}`}>
                                  <DynamicIcon name={repo.icon}></DynamicIcon>
                                  <span>{repo.name}</span>
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
