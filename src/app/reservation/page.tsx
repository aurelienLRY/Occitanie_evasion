import ReservationForm from '@/components/form/ReservationForm';

const Reservation = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Réserver votre activité
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Remplissez le formulaire ci-dessous pour réserver votre activité d&apos;aventure. 
                        Nous vous recontacterons rapidement pour confirmer votre réservation.
                    </p>
                </div>
                
                <ReservationForm />
            </div>
        </div>
    );
};

export default Reservation;