import { useParams } from "react-router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Buffer } from "buffer";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "react-markdown";
import useRepo from "@/hooks/useRepo";
import { useEffect } from "react";
import useExec from "@/hooks/useExec";
import rehypeRaw from 'rehype-raw'
import { Button } from "./ui/button";
import axios from "axios";
import { BookOpenText, Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";



export default function Project() {
  const params = useParams();
  const { data: repo, error: repoError, isLoading: repoIsLoading } = useRepo(params.id);
  const { data: result, refetch } = useExec(params.id);
  useEffect(() => {
    document.title = repo ? repo.name : "loading...";
  }, [repo]);
  if (repoIsLoading) return <div>Loading...</div>;
  if (repoError) return <div>Error: {axios.isAxiosError(repoError) ? repoError.response?.data.error : repoError.message}</div>;
  const text = Buffer.from(repo.readme, "base64").toString()
  return (

    <>

      <Tabs defaultValue="description">
        <div className="flex">
          <TabsList className="">
            <TabsTrigger value="description"><BookOpenText />Projektbeschreibung</TabsTrigger>
            <TabsTrigger value="code"><Play />Code ausführen</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="description">
          <Markdown rehypePlugins={[rehypeRaw]} className="pl-3">{text}</Markdown>
        </TabsContent>
        <TabsContent value="code">
          <Button onClick={() => refetch()}>test</Button>
          <div className="pl-2 flex gap-2">
            <SyntaxHighlighter
              className="rounded-md"
              style={vs2015}
              customStyle={{ width: "100%" }}
              language={repo.lang}
              wrapLongLines="true"
            >
              {Buffer.from(repo.code, "base64").toString()}
            </SyntaxHighlighter>
            <Textarea style={{ fontSize: "16px", letterSpacing: "3px" }} value={result} disabled></Textarea>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
