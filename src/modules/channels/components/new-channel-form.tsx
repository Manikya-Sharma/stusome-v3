"use client";

import CustomButton from "@/components/ui/CustomButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import {
  newChannelFormValidator,
  NewChannelFormValidatorType,
} from "@/types/form-validators/channel-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateChannelForm = () => {
  const [descriptor, setDescriptor] = useState<string>("");

  const form = useForm<NewChannelFormValidatorType>({
    resolver: zodResolver(newChannelFormValidator),
    defaultValues: {
      brief: "",
      descriptor: "",
      name: "",
    },
  });

  const {
    mutate: createChannel,
    isPending,
    isError,
    isSuccess,
  } = trpc.channelRouter.createChannel.useMutation();

  const onSubmit = (data: NewChannelFormValidatorType) => {
    setDescriptor(data.descriptor);
    createChannel(data);
  };

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.replace(`/channel/${descriptor}`);
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: `Unable to create channel :${descriptor}`,
        description: `Descriptor :${descriptor} is already taken`,
      });
    }
  }, [isSuccess, isError, descriptor, router]);

  return (
    <Form {...form}>
      <main className="mx-auto max-w-prose rounded-lg border border-black/20 bg-white/70 px-5 py-4 shadow-md dark:border-white/10 dark:bg-slate-800">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Awesome channel" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your channel
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriptor</FormLabel>
                <div className="flex items-stretch">
                  <div className="pointer-events-none flex select-none flex-col items-center justify-center rounded-l border border-r-0 border-black/70 bg-background px-1 pl-3">
                    :
                  </div>
                  <FormControl>
                    <Input
                      className="rounded-l-none border-l-0 pl-0"
                      placeholder="my-awesome-channel"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  This is the unique id of your channel
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brief"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  What others see about your channel
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton disabled={isPending || isSuccess} type="submit">
            Create Channel
            <Loader2
              className={cn("ml-1.5 inline-block size-5", {
                "animate-spin": isPending,
                hidden: !isPending,
              })}
            />
            <Check
              className={cn(
                "ml-1.5 inline-block size-5",
                !isSuccess && "hidden",
              )}
            />
          </CustomButton>
        </form>
      </main>
    </Form>
  );
};

export default CreateChannelForm;
