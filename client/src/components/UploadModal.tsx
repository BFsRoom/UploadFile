import { Alert, Button, Form, Modal, Upload } from "antd";
import { FC, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "./DataAccess";
import axios from "axios";

interface UploadModalProps {
    setData: Function;
}

const UploadModalComponent: FC<UploadModalProps> = ({
    setData
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error_value, setErrorValue] = useState<string | null>();
    const [success_value, setSuccessValue] = useState<string | null>();
    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalVisible(false);
        setErrorValue(null);
        setSuccessValue(null);
    };

    const submit = (value: any) => {
        let formData = new FormData();
        formData.append("file", value.file.file);

        setLoading(true);
        uploadFile(formData)
            .then(() => {
                setLoading(false);
                form.resetFields();
                handleOk();
                axios.get(`http://localhost:5000/fetchAllData`).then((response: any) => setData(response?.data?.files))
                setSuccessValue("Uploaded Successfully!!")
            })
            .catch((error: any) => {
                setLoading(false);
                setErrorValue("Failed to uploaded")
            });
    };



    return (
        <>
            <Button
                className="btn-outline-secondary"
                style={{ float: "left" }}
                onClick={() => setIsModalVisible(true)}
            >
                Upload File
            </Button>
            <Modal
                centered
                width={600}
                className="fixed-modal"
                title="Upload File"
                open={isModalVisible}
                onCancel={handleOk}
                footer={[
                    <>
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={() => form.submit()}
                            loading={loading}
                        >
                            Upload
                        </Button>
                    </>,
                ]}
            >
                <Form layout="vertical" onFinish={submit} form={form}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item
                                label="File"
                                rules={[{ required: true, message: "Please input File" }]}
                                name="file"
                            >
                                <Upload
                                    name="file"
                                    beforeUpload={() => {
                                        return false;
                                    }}
                                    type="select"
                                    multiple={false}
                                    maxCount={1}
                                >
                                    <Button style={{ width: "100%" }}>
                                        <UploadOutlined /> Choose File
                                    </Button>
                                </Upload>
                            </Form.Item>
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
                </Form>
            </Modal>
        </>
    );

}

export default UploadModalComponent;