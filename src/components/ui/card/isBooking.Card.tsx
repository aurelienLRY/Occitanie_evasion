import Image from "next/image";
import { ISession } from "@/types";
import { MapPinIcon, CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";

const IsBookingCard = ({session}: {session: ISession}) => {


     // Vérifie si la session est dans les 3 prochains jours
     const now = new Date();
     const sessionDate = new Date(session.date);
     const diffInMs = sessionDate.getTime() - now.getTime();
     const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
     const isReduced = diffInDays >= 0 && diffInDays <= 3;


const bookSession = () => {
    console.log("bookSession :", session._id);
}


    return (
        <div  className=' relative min-w-[350px] shadow-lg  hover:shadow-xl transition-all duration-300   overflow-hidden group'>
            {isReduced && (
                <div className="">
                    <div className="relative">
                        <div
                            className="absolute translate-y-1/2 -top-1 -left-10"
                            style={{
                                width: '140px',
                                height: '32px',
                                transform: 'rotate(-45deg)',
                                background: 'linear-gradient(90deg, #38b48e 0%, #4ade80 100%)',
                                boxShadow: '0 2px 8px rgba(56,180,142,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span className="text-white font-bold text-xs tracking-wider w-full text-center" style={{letterSpacing: '1px'}}>Prix réduit</span>
                        </div>
                    </div>
                </div>
            )}
        <div  className='flex gap-2 justify-between items-center bg-white  rounded-lg px-4 '>
            <Image src={`/icon/_Icon${session.activity.name.toLowerCase()}.svg`} alt={session.activity.name} width={100} height={100}
                className='absolute left-20 w-1/2 h-full object-cover  opacity-30 overflow-hidden group-hover:opacity-20 transition-all duration-300 ' />
            <div className=' flex flex-col gap-1 px-12  py-2 w-full  z-10 '>
                <h3 className='!text-3xl text-left'>{session.activity.name.trim()}</h3>
                <p className='text-sm flex items-center gap-2'> <MapPinIcon className='w-4 h-4 text-secondary' /> : {session.spot.name}</p>
                <p className='text-sm text-gray-600 flex items-center gap-2'><CalendarIcon className='w-4 h-4 text-secondary' />   : {new Date(session.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <p className='text-sm text-gray-600 flex items-center gap-2'><ClockIcon className='w-4 h-4 text-secondary' />   : {session.startTime} - {session.endTime}</p>
                <p className='text-sm text-gray-600 flex items-center gap-2'><UsersIcon className='w-4 h-4 text-secondary' />   : {session.placesMax - session.placesReserved} places restantes </p>
            </div>

        

            <button className='bg-secondary text-white px-4 py-2 rounded-lg group-hover:scale-110 transition-all duration-300' 
            onClick={bookSession}
            >Participer</button>
        </div>
        </div>
    )
}

export default IsBookingCard;
IsBookingCard.displayName = "IsBookingCard";