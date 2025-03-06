"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const CheckOutForm = ({ service }) => {

    const session = useSession();

    // console.log(service)
    // console.log(session)

    const handleConfirmOrder = async (e) => {
        e.preventDefault()

        try {
            const payLoad = {
                name: session?.data?.user?.name,
                email: session?.data?.user?.email,
                title: service?.title,
                price: service?.price,
                date: e.target.date.value,
                message: e.target.message.value

            }

            const response = await fetch(`http://localhost:3000/api/services/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payLoad)
            })

            const data = await response.json()

            if (data?.insertedId) {
                e.target.reset();
                alert('Successfully Booking')
            }

        } catch (error) {
            alert("Something went wrong!")
        }
    }

    return (
        <form
            onSubmit={handleConfirmOrder}
            className="space-y-6">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    defaultValue={session?.data?.user?.name}
                    readOnly
                    className="w-full px-4 text-sm py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Your Email"
                    name="email"
                    readOnly
                    defaultValue={session?.data?.user?.email}
                    className="w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex gap-4">
                <input
                    type="date"
                    name="date"
                    defaultValue={new Date().toISOString().split('T')[0]} // Correctly formatted date
                    className="w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Service Price $"
                    name="price"
                    readOnly
                    defaultValue={service?.price}
                    className="w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <textarea
                placeholder="Your Message"
                name="message"
                required
                className="w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="10"
            ></textarea>
            <button
                type="submit"
                className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
                Order Confirm
            </button>
        </form>
    );

};

export default CheckOutForm;