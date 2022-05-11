import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Table from '../../../Tables/Table'

const columns = [
    { columnName: "#", keyName: "sn" },
    { columnName: "Name", keyName: "name" },
    { columnName: "Email", keyName: "email" },
    { columnName: "Phone", keyName: "phone" },
    { columnName: "Role", keyName: "role" },
    // { columnName: 'Actions', keyName: 'actions' },
  ];

//
const Test = () => {
    const [ loading, setLoading ] = useState(false)
    const usersArr = useSelector((state) => state.users.value);
    setLoading(false)
    const List = usersArr.map((item, index) => ({
        ...item,
        sn: index + 1,
        
      }));
    console.log(usersArr, "usersArr")
  return (
    <div>
        <Table loading={loading} columns={columns} tableData={List}/>
    </div>
  )
}

export default Test