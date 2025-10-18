import { Link, useParams } from "react-router-dom";
import ContactForm from "../sections/ContactForm.tsx";
import { useActivityCard } from "../../hooks/useActivityCards";
import { useCardDetails } from "../../hooks/useCardDetails";

const ActivityDetails = () => {
    const { id } = useParams();
    const numberId = Number(id);

    const { activityCard: activity, isLoading: activityLoading } = useActivityCard(numberId);
    const { cardDetails: details, isLoading: detailsLoading } = useCardDetails(numberId);

    const loading = activityLoading || detailsLoading;

    return (
        <>
            <div className="h-32"></div>
            <Link to="/book">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </Link>
            {loading ? (
                <p className="text-center">Loading adventures...</p>
            ) : (activity && details) ? (
                <>
                    <section className="text-center py-10">
                        <h1 className="text-6xl tracking-wide text-teal-800 uppercase">{activity.title}</h1>
                        <p className="text-2xl py-2 uppercase text-gray-600 mt-1 tracking-widest">{activity.location}</p>
                    </section>

                    <section className="flex justify-center gap-6 px-4 md:px-16 mx-5">
                        <img src={details.gallery_img1 ?? ''} alt="Gallery img 1" className="w-1/4 rounded shadow-md object-cover" />
                        <img src={details.gallery_img2 ?? ''} alt="Gallery img 2" className="w-1/4 rounded shadow-md object-cover" />
                        <img src={details.gallery_img3 ?? ''} alt="Gallery img 3" className="w-1/4 rounded shadow-md object-cover" />
                    </section>

                    <div className="my-10 mx-auto w-2/3 border-t border-gray-300"></div>

                    <section className="px-6 md:px-16 pb-12 text-left max-w-2xl mx-auto">
                        <h2 className="text-center text-4xl text-orange-300 mb-6">OVERVIEW</h2>
                        <ul className="space-y-2 text-base leading-relaxed">
                            {activity.location && (<li className="text-2xl font-light"><span className="font-semibold">LOCATION:</span> {activity.location}</li>)}
                            {activity.price_pp && (<li className="text-2xl font-light"><span className="font-semibold">PRICE:</span> ${activity.price_pp}</li>)}
                            {activity.adult_price && (<li className="text-2xl font-light"><span className="font-semibold">ADULT PRICE:</span> ${activity.adult_price}</li>)}
                            {activity.child_price && (<li className="text-2xl font-light"><span className="font-semibold">CHILD PRICE (8-11):</span> ${activity.child_price}</li>)}
                            {activity.half_day_pp && (<li className="text-2xl font-light"><span className="font-semibold">HALF DAY PRICE:</span> ${activity.half_day_pp}</li>)}
                            {activity.full_day_pp && (<li className="text-2xl font-light"><span className="font-semibold">FULL DAY PRICE:</span> ${activity.full_day_pp}</li>)}
                            {activity.min_people && (<li className="text-2xl font-light"><span className="font-semibold">MIN PEOPLE:</span> {activity.min_people}</li>)}
                            {activity.max_people && (<li className="text-2xl font-light"><span className="font-semibold">MAX PEOPLE:</span> {activity.max_people}</li>)}
                        </ul>
                    </section>

                    <div className="my-10 mx-auto w-2/3 border-t border-gray-300"></div>

                    {details.rating && (
                        <section className="px-6 md:px-16 pb-12 text-left max-w-2xl mx-auto">
                            <h2 className="text-center  text-4xl text-orange-600 mb-6">QUICK STATS</h2>
                            <ul className="space-y-2 text-base leading-relaxed">
                                {details.rating && (<li className="text-2xl font-light"><span className="font-semibold">RATING:</span> {details.rating}</li>)}
                                {details.length && (<li className="text-2xl font-light"><span className="font-semibold">LENGTH:</span> {details.length}</li>)}
                                {details.gear && (<li className="text-2xl font-light"><span className="font-semibold">GEAR:</span> {details.gear}</li>)}
                                {details.maps && (<li className="text-2xl font-light"><span className="font-semibold">MAPS:</span> {details.maps}</li>)}
                                {details.rappels && (<li className="text-2xl font-light"><span className="font-semibold">RAPPELS:</span> {details.rappels}</li>)}
                                {details.water && (<li className="text-2xl font-light"><span className="font-semibold">WATER:</span> {details.water}</li>)}
                                {details.flood_danger && (<li className="text-2xl font-light"><span className="font-semibold">FLASH FLOOD DANGER:</span> {details.flood_danger}</li>)}
                                {details.season && (<li className="text-2xl font-light"><span className="font-semibold">SEASON:</span> {details.season}</li>)}
                                {details.notes && (<li className="text-2xl font-light"><span className="font-semibold">NOTES:</span>{details.notes}</li>)}
                            </ul>
                        </section>
                    )}

                    {details.hype && (
                        <>
                            <div className="my-10 mx-auto w-2/3 border-t border-gray-300"></div>

                            <section className="px-6 md:px-16 pb-12 text-left max-w-4xl mx-auto">
                                <h2 className="text-center text-4xl text-emerald-900 mb-6">HYPE</h2>
                                <p className="space-y-2 text-xl font-light leading-relaxed tracking-wide whitespace-pre-line">{details.hype}</p>
                            </section>
                        </>
                    )}

                    <ContactForm />
                </>
            ) : (
                <p className="text-center text-red-600">Activity not found.</p>
            )}
        </>
    )
}

export default ActivityDetails;