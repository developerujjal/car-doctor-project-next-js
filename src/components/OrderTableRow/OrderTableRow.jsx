import React from 'react';
import ActionsBtn from './ActionsBtn/ActionsBtn';

const OrderTableRow = ({ service }) => {


    return (
        <tr className="odd:bg-blue-50">
            <td className="p-4 text-sm">
                {service?.service_name}
            </td>
            <td className="p-4 text-sm">
                {new Date(service?.date).toLocaleDateString()}
            </td>
            <td className="p-4 text-sm">
                {service?.price}
            </td>
            <td className="p-4 flex items-center gap-2">
                <ActionsBtn id={service?._id} />
            </td>
        </tr>
    );
};

export default OrderTableRow;