
import dynamic from "next/dynamic";
import {useSpots} from "@/hooks/useQuery"
import { ISpot } from "@/types";
import MapSkeleton from "@/components/ui/mapCustomer/mapSkeleton";

export default function WhereSection( { className }: { className?: string } ) {

    const MapCustomer = dynamic(() => import("@/components/ui/mapCustomer"), {
        ssr: false,
        loading: () => <MapSkeleton />,
    });

    const { data: spots } = useSpots();

    return (
        <section className={` max-w-7xl mx-auto min-h-[800px] flex justify-center items-center   ${className}`}>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 ">
                <div className="flex flex-col gap-4 lg:flex-1/3">
                <h2 className=" lg:!text-6xl text-center lg:text-start  ">Où me trouver <span className="text-secondary">?</span></h2>
                    <h3 className="text-2xl lg:text-4xl text-center lg:text-start ">Aude , Tarn , Hérault, Pyrénées-Orientales</h3>
                    <p className="mt-2 text-lg opacity-80 text-center lg:text-start">Sélectionne ton terrain de jeu et <strong>laisse-toi guider pour réserver ta sortie !</strong> </p>
                </div>
                <div className="flex  lg:flex-1/2 w-full relative">
                    {spots && <MapCustomer spots={spots as ISpot[]} />}
                </div>
            </div>
        </section>
    )
}

WhereSection.displayName = "WhereSection";