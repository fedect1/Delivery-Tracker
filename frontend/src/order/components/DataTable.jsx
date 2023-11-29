import { useEffect } from "react";
import { useOrderStore } from "../../hooks/useOrderStore"

export const DataTable = () => {
    const { listOrders, startLoadingOrders } = useOrderStore();
    useEffect(() => {
        startLoadingOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'received':
                return { color: 'blue' };
            case 'preparing':
                return { color: 'orange' };
            case 'out for delivery':
                return { color: 'purple' };
            case 'delivered':
                return { color: 'green' };
            default:
                return {};
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


  return (
    <table className="table table-striped container" style={{ width: '100%' }}>
        <thead>
            <tr>
                <th>Fullname</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Tracknumber</th>
                <th>Status</th>
                <th className="text-center">Update</th>
                <th className="text-center">Delete</th>
            </tr>
        </thead>
        <tbody>
            {listOrders.map((order, index) => (
                <tr key={index}>
                    <td>{order.costumerInfo.name}</td>
                    <td>{order.costumerInfo.address}</td>
                    <td>{order.costumerInfo.phone}</td>
                    <td>{order.costumerInfo.email}</td>
                    <td>{order.trackerNumber}</td>
                    <td style={getStatusStyle(order.status)}>{capitalizeFirstLetter(order.status)}</td>
                    <td className="text-center">
                        <button className="btn btn-primary text-center">
                            <i className="fas fa-edit"></i>
                            <span> Status </span>
                        </button>
                    </td>
                    <td className="text-center">
                        <button className="btn btn-warning">
                            <i className="fas fa-trash-alt"></i>
                            <span> Delete </span>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

