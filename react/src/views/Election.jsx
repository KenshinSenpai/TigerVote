import { PlusCircleIcon } from "@heroicons/react/24/solid";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import ElectionTable from "../components/core/ElectionTable";

export default function Elections() {

  const [elections, setElections] = useState([]);

  useEffect(() => {
    axiosClient.get('/election')
      .then((response) => {
        setElections(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <PageComponent
      title="Elections"
      buttons={(
        <TButton color="green" to="/elections/create">
          <PlusCircleIcon className="h-6 w-6 mr-2"/>
          Create New
        </TButton>
      )}>
      <ElectionTable data={elections} />
    </PageComponent>
  )
}
