import { Link, useParams } from "react-router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Buffer } from "buffer";
import { Textarea } from "@/components/ui/textarea";
import Markdown from 'react-markdown'
import useRepo from "@/hooks/useRepo";
import { useEffect } from "react";
import useExec from "@/hooks/useExec";
import axios from "axios";
import { BookOpenText, Github, Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z, ZodRawShape } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RepoInfoParam } from "@/hooks/useRepos";
import EightQueens from "./8queens";



const getDataTypeForParam = (type: string) => {
  switch (type) {
    case "boolean":
      return z.boolean().default(false)
    case "string":
      return z.string()
    case "number":
      return z.string()
    default:
      return z.any()
  }
}

/*const getDefaultValues = (params) => {
  const defaults = {}
  params.forEach(param => defaults[param.name] = param.default)
  return defaults
}*/

const getComponentForParam = (type: string, field: ControllerRenderProps) => {
  switch (type) {
    case "boolean":
      return <Checkbox className="ml-1" checked={field.value}
        onCheckedChange={field.onChange}></Checkbox>
    case "string":
      return <Input {...field}></Input>
    case "number":
      return <Input {...field}></Input>
    default:
      return <></>
  }
}

const createShape = (params: RepoInfoParam[]) => {
  const shape : ZodRawShape = {}
  for (const param of params) {
    shape[param.name] = getDataTypeForParam(param.type)
  }
  return shape
}

export default function Project() {
  const project = useParams();
  const { data: repo, error: repoError, isLoading: repoIsLoading } = useRepo(project.id);
  const { data: result, mutate: execute, isPending: execIsLoading, reset } = useExec();
  const formSchema = repo?.params ? z.object(createShape(repo.params)) : z.object({})
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const components = {
    "8queens": EightQueens,
  }
  const ParamExplanation = project.id && components[project.id as keyof typeof components] || (() => <></>)

  function onSubmit(values: z.infer<typeof formSchema>) {
    if(!project.id)
      return
    execute({id : project.id, values})
  }

  useEffect(() => {
    document.title = repo ? repo.name : "loading...";
  }, [repo]);

  useEffect(() => {
    reset()
  }, [project, reset, result]);

  if (repoIsLoading) return <div>Loading...</div>;
  if (repoError) return <div>Error: {axios.isAxiosError(repoError) ? repoError.response?.data.error : repoError.message}</div>;
  const readme = repo && Buffer.from(repo.readme, "base64").toString()
  return (

    <>
      <Tabs defaultValue="description">
        <div className="flex flex-col ">
          <TabsList className="self-center sticky top-5 m-5">
            <TabsTrigger value="description"><BookOpenText className="w-4 h-4 mr-2" />Projektbeschreibung</TabsTrigger>
            <TabsTrigger value="code"><Play className="w-4 h-4 mr-2" />Code ausführen</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Markdown className="pl-3 markdown">{readme}</Markdown>
          </TabsContent>
          <TabsContent value="code">
            <ParamExplanation></ParamExplanation>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                <div className="flex justify-center gap-2 mb-2">
                  {repo?.params && (repo.params.map((param) =>
                  (<FormField
                    key={param.name}
                    control={form.control}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    name={param.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{param.name}</FormLabel>
                        <FormControl>
                          {getComponentForParam(param.type, field)}
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />)))}
                  <Button className="bg-green-500" type="submit"><Play className="w-4 h-4 mr-2" />Code ausführen</Button> <Link to={`https://github.com/danielgafarov/${project.id}`} target="_blank" rel="noopener noreferrer"> <Button type="button" className="bg-white"><Github className="w-4 h-4 mr-2" />gesamten Code ansehen</Button> </Link>
                </div>
              </form>
            </Form>
            <div className="pl-2 flex gap-2">
              <SyntaxHighlighter
                className="rounded-md"
                style={vs2015}
                customStyle={{ width: "100%" }}
                language={repo?.lang}
                wrapLongLines={true}
              >
                {repo ? Buffer.from(repo.code, "base64").toString() : "Code loading..."}
              </SyntaxHighlighter>
              <Textarea style={{ fontSize: "16px", letterSpacing: "3px" }} value={execIsLoading ? "Loading..." : result} disabled></Textarea>
            </div>
          </TabsContent>
        </div >
      </Tabs >
    </>
  );
}
