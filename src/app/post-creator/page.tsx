"use client";

import ContentInput from "@/components/ContentInput";
import WidthWrapper from "@/components/chunks/WidthWrapper";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploadPost } from "./actions";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [content, setContent] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const { data: session } = useSession();

  const { mutate: newPost, isPending } = useMutation({
    mutationKey: ["new-post"],
    mutationFn: async ({
      content,
      title,
      author_email,
    }: {
      content: string;
      title: string;
      author_email: string;
    }) => await uploadPost(content, title, author_email),
    onError: () => {
      toast.error("Something went wrong, please contact our team");
    },
    onSuccess: () => {
      toast.success("Post published successfully!");
    },
  });

  return (
    <>
      <ContentInput setContent={setContent} setTitle={setTitle} />
      <WidthWrapper>
        <Button
          className="mx-auto my-5 block w-fit"
          onClick={() => {
            if (!content) {
              toast.error("No content added!");
              return;
            }
            if (!title) {
              toast.error("No title provided!");
              return;
            }
            const author_email = session?.user?.email;
            if (!author_email) {
              toast.error("User not logged in!");
              return;
            }
            newPost({ content, title, author_email });
          }}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : "Post"}
        </Button>
      </WidthWrapper>
    </>
  );
};

export default Page;
