"use client";

import type { Prisma } from "@prisma/client";
import {
  Radar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartGraph = ({
  account,
}: {
  account: Prisma.AccountGetPayload<{
    include: { posts: true; doubts: true; guilds: true; friendOf: true };
  }>;
}) => {
  const data = [
    { about: "Posts", amount: account.posts.length },
    { about: "Doubts", amount: account.doubts.length },
    { about: "Friends", amount: account.friendOf.length },
    { about: "Guilds", amount: account.guilds.length },
  ];

  return (
    <div className="mx-auto -mt-8 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius="60%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="about" />
          <Radar
            dataKey="amount"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartGraph;
