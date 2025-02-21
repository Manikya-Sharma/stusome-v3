import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  newAccountFormValidator,
  NewAccountFormValidatorType,
} from "@/types/form-validators/account-form";
import { NewProfileFormValidatorType } from "@/types/form-validators/profile-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const CreateAccountForm = ({
  usernameNotUnique,
  createAccount,
}: {
  usernameNotUnique: boolean;
  createAccount: (data: NewProfileFormValidatorType) => void;
}) => {
  const { data: session } = useSession();

  const form = useForm<NewAccountFormValidatorType>({
    resolver: zodResolver(newAccountFormValidator),
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const onSubmit = ({
    username,
    displayName,
  }: z.infer<typeof newAccountFormValidator>) => {
    if (!session?.user?.email || !session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred, please try again after clearing browser cache",
      });
      return;
    }

    createAccount({
      displayName,
      email: session?.user?.email,
      externalId: session?.user?.id,
      username,
      profilePicture: session.user.image ?? "",
    });
  };

  return (
    <div className="w-full max-w-prose">
      <h1 className="mb-16 text-4xl font-semibold tracking-tight">
        Almost there...
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="john_doe" {...field} />
                </FormControl>
                <FormDescription>People tag you using this</FormDescription>
                <FormMessage />
                {usernameNotUnique && (
                  <p className="text-red-500">
                    This username is already taken, try another
                  </p>
                )}
              </FormItem>
            )}
          />
          <CustomButton type="submit">Create account</CustomButton>
        </form>
      </Form>
      <p className="mt-5 text-sm text-muted-foreground">
        By creating account, you agree to our{" "}
        <Button asChild variant="link" className="px-0 underline">
          <Link target="_blank" href="/toc">
            Terms and Conditions
            <ExternalLink className="size-2" />
          </Link>
        </Button>
      </p>
    </div>
  );
};

export default CreateAccountForm;
