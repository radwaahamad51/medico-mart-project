import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import SectionTitle from "./Sectiontitle/sectiontitle";
import CheckoutForm from "./chakoutfrom";


const stripePromise = loadStripe('pk_test_51QhxfMEpDQAXpdWaBUYxw72VHijAPeJtaFvNGvTDAhyjt1K5SZz3eAxzzgwkawdWIYIavdcJryX5od3GEUjFTSgM00PH4VlQVn');
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;