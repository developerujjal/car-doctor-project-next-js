import UpdateForm from '@/components/Form/UpdateForm';
import { headers } from 'next/headers';
import React from 'react';

const UpdatePage = async ({ params }) => {

    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/my-bookings/update/${id}`, {
        headers: new Headers(await headers())
    });
    const booking = await response.json();

    // console.log(booking)


    return (
        <section>
            <div className="container mx-auto px-4 md:px-12 lg:px-24 py-4">
                <div>
                    <div className="min-h-screen font-inter flex items-center justify-center my-10 md:my-14">
                        <div className="w-full bg-[#F3F3F3] p-4 md:p-12 lg:p-24 rounded-lg shadow-md">
                            <UpdateForm service={booking} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UpdatePage;