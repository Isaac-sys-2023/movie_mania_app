import { VideoData } from "@/type/YoutubeType";
import VideoPlayer from "../VideoPlayer/VideoPlayer";


interface TrailersProps {
    youtubeData: VideoData[] | null;
}

const Trailers: React.FC<TrailersProps> = ({ youtubeData }) => {
    return (
        <div>
            <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">Trailers</h2>
            <div className="flex flex-wrap gap-4 lg:mx-14 m8 justify-center">
                {youtubeData && youtubeData.length > 0 ? (
                    youtubeData.map((video: VideoData, index: number) => <VideoPlayer video={video} key={index}></VideoPlayer>)
                ) : (
                    <p>No trailers avialable</p>
                )}
            </div>
        </div>
    )
};

export default Trailers;