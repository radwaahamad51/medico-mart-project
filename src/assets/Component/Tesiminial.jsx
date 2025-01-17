import React from 'react';

const testimonials = [
    {
        name: 'Khush Taher',
        date: '1 Sept, 2022',
        avatar: 'https://via.placeholder.com/100', // Replace with actual avatar URLs
        feedback:
            "Very good initiative. I have consulted one of the doctors for my son. But one problem I faced was the timing. Doctor should describe their availability, otherwise it's difficult to get them in case of emergencies. Otherwise very much helpful and good app.",
    },
    {
        name: 'Ferdouse Ara',
        date: '8 August, 2022',
        avatar: 'https://via.placeholder.com/100',
        feedback:
            "Very useful and user-friendly app. I am just amazed to see such smooth services. Easy to use. Good pricing. I am a regular customer. So far so good. Always get medicine on time and in good condition. Overall it's a great service!",
    },
    {
        name: 'Dr. S. M. Salim Reza',
        date: '25 Sept, 2022',
        avatar: 'https://via.placeholder.com/100',
        feedback:
            "Excellent app. Almost complete. I found it wonderful and error-free. However, I prefer the Desktop version too.",
    },
    {
        name: 'Rubaiyat Niaz',
        date: '20 Sept, 2022',
        avatar: 'https://via.placeholder.com/100',
        feedback:
            "I've ordered from MedEasy in several occasions, every time they have delivered the required medicine in time. Their service is top-notch. I highly recommend them.",
    },
    {
        name: 'Md Taufikur',
        date: '16 Sept, 2022',
        avatar: 'https://via.placeholder.com/100',
        feedback:
            "MedEasy app is very easy to use, fast delivery of medicines.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto ">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-blue-900 text-white rounded-lg shadow-lg p-5 flex flex-col items-center text-center"
                        >
                            <img
                                src={testimonial.avatar}
                                alt={`${testimonial.name}'s avatar`}
                                className="w-20 h-20 rounded-full border-4 border-green-500 mb-4"
                            />
                            <h3 className="text-lg font-bold">{testimonial.name}</h3>
                            <p className="text-sm mb-4">{testimonial.date}</p>
                            <p className="text-sm">{testimonial.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
