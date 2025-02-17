import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Route, Routes } from "react-router";
import About from "./components/about";
import Home from "./components/home";
import Project from "./components/project";
import Projects from "./components/projects";




function App() {
  
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Routes>
            <Route index element={<Home />} />
            <Route path="projects">
              <Route index element={<Projects/>}></Route>
              <Route path=":id" element={<Project/>}></Route>
            </Route>
            <Route path="about" element={<About />} />  
          </Routes>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
