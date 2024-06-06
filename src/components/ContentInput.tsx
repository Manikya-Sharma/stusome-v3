"use client";

import TextAreaAutoSize from "react-textarea-autosize";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowMarkdown from "./ShowMarkdown";
import WidthWrapper from "./chunks/WidthWrapper";
import { Input } from "./ui/input";
import { Bold, Italic, Link, Save } from "lucide-react";

interface Props {
  CallComponent?: React.ReactNode;
  header?: string;
  onUpload?: (content: string) => any;
  setContent?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTitle?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ContentInput = ({
  header,
  onUpload,
  CallComponent,
  setContent,
  setTitle,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [localContent, setLocalContent] = useState<string | undefined>(
    undefined,
  );
  const [localTitle, setLocalTitle] = useState<string | undefined>(undefined);
  if (CallComponent !== undefined) {
    return (
      <Dialog>
        <DialogTrigger>{CallComponent}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{header ?? "Enter the content"}</DialogTitle>

            <DialogDescription>
              This supports markdown. Make sure you follow community guidelines.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Tabs defaultValue="input" className="mx-auto max-w-prose">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="input">
                <TextAreaAutoSize
                  maxRows={10}
                  minRows={4}
                  autoFocus
                  className="w-full rounded-md px-3 py-2 ring-1 ring-zinc-900/10"
                  ref={textAreaRef}
                  value={localContent}
                  onChange={() => {
                    if (textAreaRef.current) {
                      setLocalContent(textAreaRef.current.value);
                      if (setContent) {
                        setContent(textAreaRef.current.value);
                      }
                    }
                  }}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="markdown-wrapper max-h-[263px] min-h-[119px] overflow-y-auto rounded-lg ring-1 ring-zinc-900/10">
                  <ShowMarkdown data={localContent} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  onUpload ? (localContent ? onUpload(localContent) : {}) : {}
                }
              >
                Upload
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    // The component exists in page not as dialog
    return (
      <>
        <div className="sticky inset-x-0 top-0 mb-1 flex h-10 items-center bg-zinc-50">
          <WidthWrapper className="flex w-full items-center justify-between">
            <Input
              className="block h-8 max-w-40"
              placeholder="Title"
              required
              ref={titleRef}
              onChange={() => {
                if (titleRef.current) {
                  setLocalTitle(titleRef.current.value);
                  if (setTitle) {
                    setTitle(titleRef.current.value);
                  }
                }
              }}
            />
            <div className="flex items-center gap-3">
              <ul className="flex items-center justify-around">
                <li>
                  <Button variant="ghost" className="p-1">
                    <Bold />
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="p-1">
                    <Italic />
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="p-1">
                    <Link />
                  </Button>
                </li>
              </ul>
              <Button variant="default" className="text-md">
                <Save />
              </Button>
            </div>
          </WidthWrapper>
        </div>
        <WidthWrapper>
          {/* top bar */}
          <Tabs defaultValue="input">
            {/* tabs */}
            <TabsList className="sticky top-10 grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            {/* content */}
            <TabsContent value="input">
              <TextAreaAutoSize
                minRows={4}
                autoFocus
                className="w-full rounded-md px-3 py-2 ring-1 ring-zinc-900/10"
                ref={textAreaRef}
                value={localContent}
                onChange={() => {
                  if (textAreaRef.current) {
                    setLocalContent(textAreaRef.current.value);
                    if (setContent) {
                      setContent(textAreaRef.current.value);
                    }
                  }
                }}
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="markdown-wrapper max-h-[263px] min-h-[119px] overflow-y-auto ring-1 ring-zinc-900/10">
                <ShowMarkdown data={localContent} />
              </div>
            </TabsContent>
          </Tabs>
        </WidthWrapper>
        <p className="max-prose mx-auto mt-5 text-center text-sm text-muted-foreground">
          This supports markdown. Make sure you follow community guidelines.
        </p>
      </>
    );
  }
};

export default ContentInput;
