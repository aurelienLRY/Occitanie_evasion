import ReservationForm from '@/components/form/ReservationForm';
import { ContactForm } from '@/components/form';

const Reservation = () => {
    return (
        <div className="min-h-screen  py-12 mt-20">
            <div className="container mx-auto ">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Réserve ton activité
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Remplis le formulaire ci-dessous pour réserver ton aventure.
                        Je te recontacte rapidement pour confirmer ta réservation.
                    </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row gap-6 text-center">
                    <div className='w-full lg:w-1/3 bg-primary/20 rounded-lg p-6'>
                        <h2 className='text-4xl font-bold text-text mb-4'>
                            Rejoinds-nous sur une de ces sessions ?
                        </h2>
                        <p className='text-sm text-gray-600'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus enim officia temporibus distinctio fugit, cum quam tenetur ullam, eaque, laboriosam ea quaerat modi ipsum quisquam illum magni id ipsa!
                        </p>

                    </div>
                    <div className='w-full lg:w-2/3'>
                        <ReservationForm />
                    </div>

                </div>
                <div className='w-full px-4 mt-12'>
                    <h2 className='text-4xl font-bold text-text mb-4'>
                        Vous avez des questions ?
                    </h2>
                    <p className='text-sm text-gray-600'>
                        Je suis là pour t&apos;aider.
                    </p>
                    <ContactForm />
                </div>




            </div>
        </div>
    );
};

export default Reservation;