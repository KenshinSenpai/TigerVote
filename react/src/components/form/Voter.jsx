import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios";

export default function Voter() {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState({
    electionName: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axiosClient.post(`/elections/${id}/uploadVoter`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/elections/${id}`)
      .then(response => {
        const { electionName } = response.data[0];
        setElection({ electionName });
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading &&
        <div className="flex justify-center mt-36 space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
        </div>
      }
      {!loading && (
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            {/* Title */}
              <h2
                className="font-semibold leading-7 ml-4 pt-3 text-gray-900 pb-6"
              >
                Positions for {election.electionName}
              </h2>
              <p className="text-sm leading-6 text-gray-600">Upload a <strong className="text-gray-900">CSV File</strong> containing the following information: Name, Email, Department, and Year Level</p>
              <div className="mt-2 flex justify-start gap-x-6">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <button
                  onClick={handleUpload}
                  className="rounded-md border-2 border-green-900 px-4 text-sm font-semibold text-green-900 shadow-sm hover:bg-green-900 hover:text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  Upload
                </button>
              </div>
            {/* Title */}
          </div>
        </div>
      )}
    </div>
  )
}
