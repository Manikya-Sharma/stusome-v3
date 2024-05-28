"use client";
import WidthWrapper from "@/components/chunks/WidthWrapper";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./actions";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["get-data"],
    queryFn: async () => await getUsers(),
  });
  return (
    <WidthWrapper className="mt-24">
      stats
      {data?.map((account) => {
        return (
          <div key={account.id}>
            {account.email},{account.createdAt.toString()}
          </div>
        );
      })}
    </WidthWrapper>
  );
};

export default Page;
