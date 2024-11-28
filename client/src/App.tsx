import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Route, Routes } from "react-router"
import Projects from "./components/projects"
import About from "./components/about"
import Home from "./components/Home"
import { Button } from "./components/ui/button"
import { CopyBlock } from "react-code-blocks";
import { Octokit } from "@octokit/core";

function App() {
  function getHello() {
    console.log(
      fetch('http://localhost:3000/api'))
  }
  


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <Button onClick={getHello}>
            ClickMe
          </Button>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <SidebarTrigger />
          <div className="absolute top-1 right-1">
            <ModeToggle></ModeToggle>
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
