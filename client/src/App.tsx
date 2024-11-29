import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Route, Routes } from "react-router"
import Projects from "./components/projects"
import About from "./components/about"
import { Button } from "./components/ui/button"
import Home from "./components/home"
import ProjectsHome from "./components/projects-home"
import EightQueens from "./components/eight-queens"
import ProjectsLayout from "./components/projects-layout"
import { CodeBlock, a11yDark} from "react-code-blocks";

function App() {
  function getHello() {
    console.log(
      fetch('http://localhost:3000/api'))
  }
  const copyBlockProps = {
    text: `function App() {
  function getHello() {
    console.log(
      fetch('http://localhost:3000/api'))
  }`,
    language: "js",
    showLineNumbers: true,
    startingLineNumber: 1,
    wrapLines: true,
    theme: a11yDark
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Button onClick={getHello}>
            ClickMe
          </Button>
          <div className="absolute top-1 right-1">
            <ModeToggle></ModeToggle>
          </div>
          <CodeBlock{... copyBlockProps} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />}>
              <Route index element={<ProjectsHome />} />
              <Route element={<ProjectsLayout />}></Route>
              <Route path="eight_queens" element={<EightQueens />} />
              <Route path="math" element={<ProjectsHome />} />
            </Route>
            <Route path="about" element={<About />} />
          </Routes>

        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
