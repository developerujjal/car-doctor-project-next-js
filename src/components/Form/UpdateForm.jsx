"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const UpdateForm = ({ service }) => {

    const session = useSession();
    const router = useRouter();

    const handleUpdateBooking = async (e) => {
        e.preventDefault();
        try {
            const updateDoc = {
                date: e.target.date.value,
                mesage: e.target.message.value
            }


            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/my-bookings/update/${service?._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateDoc)
            });
            const data = await response.json();

            if(data?.modifiedCount > 0){
                alert("Successfully Updated");
                router.push('/my-bookings')
            }
            // console.log(data)

        } catch (error) {
            alert("faild to update")
        }
    }

    return (
        <form
            onSubmit={handleUpdateBooking}
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
                    defaultValue={new Date(service?.date).toISOString().split('T')[0]} // Correctly formatted date
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
                defaultValue={service?.mesage}
                className="w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="10"
            ></textarea>
            <button
                type="submit"
                className="w-full cursor-pointer py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
                Update Confirm
            </button>
        </form>
    );
};

export default UpdateForm;