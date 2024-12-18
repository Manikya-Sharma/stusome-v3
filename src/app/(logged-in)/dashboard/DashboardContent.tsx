import ChannelsList from "@/components/ChannelsList";
import BentoElem from "./BentoElem";

const DashboardContent = () => {
  return (
    <div className="h-full p-5 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 rounded-lg gap-3">
      <div className="rounded-t-2xl md:rounded-tr-[1%] md:rounded-tl-2xl rounded-[1%] ring-1 ring-black/20 bg-slate-50">
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
      <div className="md:rounded-tr-2xl rounded-[1%] ring-1 ring-black/20 bg-slate-50">
        <BentoElem address="/posts" heading="Posts">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="md:rounded-bl-2xl rounded-[1%] ring-1 ring-black/20 bg-slate-50">
        <BentoElem address="/stats" heading="Statistics">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="rounded-b-2xl md:rounded-bl-[1%] md:rounded-br-2xl rounded-[1%] ring-1 ring-black/20 bg-slate-50">
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
