import UploadModalComponent from './UploadModal';
import { useEffect, useState } from "react";
import { Alert, Button, Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { deleteFile } from "./DataAccess";
import axios from 'axios';

function Main() {

    const [data, setData] = useState<any[]>([]);
    const [error_value, setErrorValue] = useState<string | null>();
    const [success_value, setSuccessValue] = useState<string | null>();

    useEffect(() => {
        axios.get(`http://localhost:5000/fetchAllData`).then((response: any) => setData(response?.data?.files))
    }, []);

    const DeleteFile = (id: any) => {
        deleteFile(id)
            .then(() => {
                axios.get(`http://localhost:5000/fetchAllData`).then((response: any) => setData(response?.data?.files))
                setSuccessValue("The File Deleted Successfully!!")
            })
            .catch((error) => {
                console.log(error)
                setErrorValue("Failed to delete")
            });
    };

    return (
        <>
            <div className='row'>
                <div className='col-md-12 mt-4'>
                    <UploadModalComponent setData={setData} />
                </div>
                <div className='col-md-6 mt-2'>
                    <Table
                        dataSource={data.map((e, i) => ({
                            key: i,
                            ...e
                        }))}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "name",
                                key: "name",
                                width: "200px",
                            },
                            {
                                title: "Size",
                                dataIndex: "size",
                                key: "size",
                                width: "200px",
                            },
                            {
                                title: "Date",
                                dataIndex: "date",
                                key: "date",
                                width: "100px",
                            },
                            {
                                title: "Delete",
                                align: "center",
                                render: (value, data) => (
                                    <div className="d-inline-flex">
                                        <Button
                                            type="text"
                                            className="mr-2"
                                            onClick={() => DeleteFile(data.id)}
                                            icon={<DeleteOutlined style={{ color: "red" }} />}
                                        />
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {
                            error_value || success_value ? <> {
                                error_value ? <Alert closable message={error_value} type="error" /> : <Alert closable message={success_value} type="success" />
                            }</> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main