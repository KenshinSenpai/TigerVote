import { useEffect, useState } from "react"
import axiosClient from "../axios"
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function VotingForm() {

    const { id } = useParams();
    const [election, setElection] = useState("")

    useEffect(() => {
        axiosClient.get(`/showElection/${id}`)
            .then(response => {
                setElection(response.data);
                console.log(election);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <span>{id}</span>
        </div>
    )
}

export default VotingForm
