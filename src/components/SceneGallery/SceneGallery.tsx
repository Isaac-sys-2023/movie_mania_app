import { ImageDetails } from "@/type/SceneType";
import Image from "next/image";

interface SceneGalleryProps {
    sceneImages: ImageDetails[];
    handleImageClick: (filePath: string) => void;
    mediaType: "movie" | "tv";
}

const SceneGallery: React.FC<SceneGalleryProps> = ({ mediaType, sceneImages, handleImageClick }) => {
    return (
        <div>
            <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">
                {mediaType === "movie" ? "Movie Scenes" : "TV Show Scenes"}
            </h2>
            <div className="flex flex-wrap gap-4 lg:mx-14 m-8 justify-center">
                {sceneImages && sceneImages.length > 0 ? (
                    sceneImages.map((scene, index) => (
                        <div
                            key={index}
                            className="relative w-full max-w-sm cursor-pointer sm:hover:scale-[1.04] transition-transform duration-200 ease-in"
                            onClick={()=>handleImageClick(scene.file_path)}
                        >
                            <Image
                                className="object-cover"
                                width={500}
                                height={280}
                                src={`https://image.tmdb.org/t/p/original/${scene?.file_path}`}
                                alt={`Scene ${index + 1}`}
                            />
                        </div>
                    ))
                ) : (
                    <p>No Scene Images avialable</p>
                )}
            </div>
        </div>
    )
}

export default SceneGallery;