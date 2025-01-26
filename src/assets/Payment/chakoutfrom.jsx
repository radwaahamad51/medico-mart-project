import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useCart from "../Hooks/usecart";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.Price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        console.error("Client secret not received:", res.data);
                        setError("Failed to initialize payment. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error creating payment intent:", error);
                    setError("Error initializing payment. Please try again.");
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError("Stripe has not been loaded yet. Please try again.");
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setError("Card details are not entered correctly.");
            return;
        }

        // Create payment method
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.error("Payment method error:", paymentError);
            setError(paymentError.message);
            return;
        }

        // Confirm card payment
        if (!clientSecret) {
            setError("Payment could not be processed. Please try again.");
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.error("Payment confirmation error:", confirmError);
            setError("Payment confirmation failed. Please try again.");
            return;
        }

        // Payment succeeded
        if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // Save payment to the database
            const paymentData = {
                UserEmail: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                status: 'paid',
            };

            try {
                const res = await axiosSecure.post('/payments', paymentData);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/paymenthistory');
                }
            } catch (dbError) {
                console.error("Error saving payment to database:", dbError);
                setError("Payment was successful but saving to the database failed. Please contact support.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
