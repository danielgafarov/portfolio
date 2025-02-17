import { useParams } from "react-router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Buffer } from "buffer";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "react-markdown";
import useRepo from "@/hooks/useRepo";
import { useEffect } from "react";
import useResult from "@/hooks/useResult";
import rehypeRaw from 'rehype-raw'


export default function Project() {
  const params = useParams();
  const { data, error, isLoading } = useRepo(params.id);
  const { data:result, error:rError, isLoading:rIsLoading } = useResult();
  useEffect(() => {
    document.title = data ? data.name : "loading...";
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Markdown rehypePlugins={[rehypeRaw]} className="pl-2 flex gap-2">{Buffer.from(data.readme, "base64").toString()}</Markdown>
      <div className="pl-2 flex gap-2">
        <SyntaxHighlighter
          className="rounded-md"
          style={vs2015}
          customStyle={{ width: "100%" }}
          language={data.lang}
          wrapLongLines="true"
        >
          {Buffer.from(data.code, "base64").toString()}
        </SyntaxHighlighter>
        <Textarea style={{fontSize:"16px", letterSpacing:"3px"}} disabled>{result}</Textarea>
      </div>
    </>
  );
}
