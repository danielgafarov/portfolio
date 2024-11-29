import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FolderCode, Home, User } from 'lucide-react';
import { NavLink } from "react-router";
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
    },
    {
        title: "Über mich",
        url: "/about",
        icon: User,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>Daniel Gafarov</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <NavLink to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
