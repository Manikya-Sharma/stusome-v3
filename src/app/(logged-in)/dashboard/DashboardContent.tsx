import ChannelsList from "@/components/ChannelsList";
import BentoElem from "./BentoElem";

const DashboardContent = () => {
  return (
    <div className="grid h-full grid-cols-1 grid-rows-4 gap-3 rounded-lg p-5 dark:bg-zinc-900 md:grid-cols-2 md:grid-rows-2">
      <div className="rounded-[1%] rounded-t-2xl bg-slate-50 ring-1 ring-black/20 dark:bg-zinc-950 dark:ring-white/10 md:rounded-tl-2xl md:rounded-tr-[1%]">
        <BentoElem address="/channels" heading="Channels">
          <ChannelsList
            channels={[
              {
                id: "apple",
                brief: "The awesome channel",
                descriptor: ":awesme-chnl",
                name: "Awesome Channel",
                permissions: {},
              },
              {
                id: "banana",
                brief: "The amazing channel",
                descriptor: ":amz-in-g",
                name: "Amazing Channel",
                permissions: {},
              },
            ]}
          />
        </BentoElem>
      </div>
      <div className="rounded-[1%] bg-slate-50 ring-1 ring-black/20 dark:bg-zinc-950 dark:ring-white/10 md:rounded-tr-2xl">
        <BentoElem address="/posts" heading="Posts">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="rounded-[1%] bg-slate-50 ring-1 ring-black/20 dark:bg-zinc-950 dark:ring-white/10 md:rounded-bl-2xl">
        <BentoElem address="/stats" heading="Statistics">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="rounded-[1%] rounded-b-2xl bg-slate-50 ring-1 ring-black/20 dark:bg-zinc-950 dark:ring-white/10 md:rounded-bl-[1%] md:rounded-br-2xl">
        <BentoElem address="/app-settings" heading="App Settings">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
    </div>
  );
};

export default DashboardContent;
