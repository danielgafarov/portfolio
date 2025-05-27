import { NavLink } from "react-router";
import { FolderCode, Home as HomeIcon, Scale, Linkedin, Github, } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

export default function Home() {
  document.title = "Home"
  const items = [
    {
      title: "Projekte",
      url: "/projects",
      icon: FolderCode
    },
    {
      title: "GitHub",
      url: "https://github.com/danielgafarov",
      target: "target='_blank'",
      rel: "noopener noreferrer",
      icon: Github
    },
    /*{
      title: "LinkedIn",
      url: "/linkedin",
      icon: Linkedin
    },
    {
      title: "XING",
      url: "/xing",
      icon: Scale
    },*/
    {
      title: "Impressum",
      url: "/Impressum",
      icon: Scale
    }
  ];
  return (
    <div className="flex flex-col text-center place-content-center gap-5">
      <h1 className="text-9xl">Portfolio</h1>
      <h2 className="text-2xl">Daniel Gafarov</h2>
      <div className="">Willkommen auf meiner Website! Hier kann man sich einige meiner Projekte ansehen und diese ausführen.<br />Derzeit ist die Auswahl an Projekten gering, jedoch habe ich in Zukunft vor, mehr meiner Projekte einzupflegen.</div>
      <div className="flex justify-evenly">
        {items.map((item) => (
          <NavLink to={item.url} target={item.target} rel={item.rel} key={item.title}>
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </CardHeader>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>

  )
}