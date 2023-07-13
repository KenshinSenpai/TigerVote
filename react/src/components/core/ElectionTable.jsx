/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ElectionTable = ({ data }) => {

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No data available.</p>;
    }
      
    const getStatusBadge = (electionStart) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const startDate = new Date(electionStart).setHours(0, 0, 0, 0);
    
        if (startDate > today) {
          return (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          );
        } else if (startDate === today) {
          return (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              Ongoing
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
              Done
            </span>
          );
        }
      };
    

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Election Name</th>
              <th>Department</th>
              <th>Year Level</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{ item.id }</td>
                    <td>{ item.electionName }</td>
                    <td>{ item.departmentName }</td>
                    <td>{ item.yearLevel }</td>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div>
                                <div className="font-bold text-green-600">{ item.electionStart }</div>
                                <div className="font-bold text-red-600">{ item.electionEnd }</div>
                            </div>
                        </div>
                    </td>
                    <td>{getStatusBadge(item.electionStart)}</td>
                    <td>
                      <Link
                        to={`/elections/${ item.id }`}
                        className="btn btn-ghost btn-xs"
                      >
                        manage
                      </Link>
                    </td>
                </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
          
        </table>
      </div>
    </div>
  );
};

export default ElectionTable;
