"use client"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Space, Table, Tag, Button, Select, Switch, AutoComplete, Input, TableProps, Spin, InputRef, TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import WarningToast from "@/src/components/toast/WarningToast"
import InfoToast from "@/src/components/toast/InfoToast"
import SuccessToast from "@/src/components/toast/SuccessToast"

interface DataType {
    key: string;
    name: string;
    email: string;
    rool: string;
    profile: any,
    action: any,
    url: string
}

type DataIndex = keyof DataType;

export default function AdminUserList() {
    const router = useRouter()
    const [showLoding, setShowLoding] = useState(true)
    const [actionLoding, setactionLoding] = useState(false)
    const [seletedRous, setseletedRous] = useState<React.Key[]>([])
    const [Actions, setActions] = useState("Actions")
    const [UserType, setUserType] = useState("")
    const [Status, setStatus] = useState("")
    const [UseData, setUserData] = useState<DataType[]>([])
    const [UseData2, setUserData2] = useState<any[]>([])
    const newdata: DataType[] = []

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch2 = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => { setSelectedKeys(e.target.value ? [e.target.value] : []) }}
                    onPressEnter={() => handleSearch2(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch2(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (value: string) => {
        const array: any = UseData2.filter((GetNewData : any) => {
            return (GetNewData.firstName + " " +  GetNewData.lastName + " " + GetNewData.email).toLowerCase().includes(value.toLowerCase())
        })
        setUser(array)
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Profile',
            dataIndex: 'profile',
            key: 'profile',
            render: (_, { profile }) => (
                <div className="w-[46px] h-[46px] flex justify-center items-center bg-slate-300 rounded-full">
                    <Image priority={true} src={profile} alt="User Logo" className="w-11 h-11 rounded-full" width={1000} height={1000} quality={100} />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: "Url",
            dataIndex: "url",
            key: "url",
            ...getColumnSearchProps('url')
        },
        {
            title: 'User Role',
            dataIndex: 'rool',
            key: 'rool',
            render: (_, { rool }) => (
                <Tag color={rool === "0" ? "volcano" : "green"} key={rool}>
                    {rool === "0" ? "Administrator" : "User"}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
        },
    ];

    const disableUser = async ({ userId, index }: { userId: string, index: number }) => {
        try {
            const toastId = toast.loading("Please wait...", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })
            const axioResponse = await axios.post("/api/admin/user/disable_enable", { id: userId })
            const ms = axioResponse.data.message
            const st = axioResponse.data.status

            if (st === 500 || st === 400) {
                toast.update(toastId, { render: ms, type: "warning", isLoading: false })
                return
            } else if (st === 200) {
                toast.update(toastId, { render: ms, type: "success", isLoading: false })
                return
            }
        } catch (error) {
            WarningToast({ message: "Something went wrong" })
        }
    }

    const setUser = useCallback((newData: any[]) => {
        const newdata: DataType[] = newData.map(userData => ({
            key: userData._id,
            name: userData.firstName + " " + userData.lastName,
            email: userData.email,
            profile: userData.profileImage,
            url: "/auth/login?id=" + userData.url,
            rool: userData.rool,
            action: <Switch key={userData._id} defaultChecked={userData.accountStatus} onChange={() => { disableUser({ userId: userData._id, index: newData.indexOf(userData) }) }} />,
        }));
        setUserData(newdata);
        setShowLoding(false);
    }, []);

    const seeFunction = useCallback(async () => {
        try {
            const response = await axios.post('/api/admin/user/seeAllUsers')

            if (response.data.status === 400) {
                WarningToast({ message: response.data.message })
                setTimeout(() => {
                    router.push("/controlers")
                }, 1500);
            } else if (response.data.status === 200) {
                setUserData2(response.data.message)
                setUser(response.data.message)
            }
        } catch (error) {
            console.log(error)
            WarningToast({ message: "Something went wrong" })
        }
    }, [router, setUser]);

    useEffect(() => {
        seeFunction()
    }, [seeFunction])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setseletedRous(selectedRowKeys);
        },
    };

    const handleChangeActions = async (value: string[]) => {
        if (seletedRous.length === 0) {
            InfoToast({ message: "You should select any user" })
            return
        }
        if (actionLoding) {
            WarningToast({ message: "Your request is processing" })
            return
        }
        setactionLoding(true)
        const toastId = toast.loading("Please wait...", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
        let data = value.join('');

        let response;
        if (data === "Active") {
            response = await axios.post("/api/admin/user/activeArray", { dataArray: seletedRous })
        } else if (data === "Disable") {
            response = await axios.post("/api/admin/user/deActiveArray", { dataArray: seletedRous })
        } else if (data === "Delete") {
            response = await axios.post("/api/admin/user/deleteArray", { dataArray: seletedRous })
        }

        const st = response?.data.status
        const ms = response?.data.message
        setactionLoding(false)

        if (st === 500) {
            toast.update(toastId, { render: ms, type: "warning", isLoading: false })
            return
        } else if (st === 400) {
            toast.update(toastId, { render: ms, type: "info", isLoading: false })
            return
        } else {
            toast.update(toastId, { render: ms, type: "success", isLoading: false })
            setShowLoding(true)
            setseletedRous([])
            seeFunction()
        }
    };

    const handleUserStatus = (value: string) => {
        setShowLoding(true)
        const array: any = UseData2.filter((data: any) => {
            return value === "" ?
                data
                :
                value === "enable" ?
                    data.accountStatus === true
                    :
                    data.accountStatus === false

        })
        setUser(array)
    }

    return (
        <main className="w-full h-full p-6 flex flex-col gap-2 border_full">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <h1 className="text-2xl font-extrabold">User List</h1>
            <section className="w-full h-auto p-2 bg-white rounded-lg flex flex-col gap-2">
                <header className="w-full h-16 flex justify-between items-center px-8 border_bottom">
                    <div className="w-auto h-full flex items-center gap-2">
                        <h2 className="text-lg font-medium">All User</h2>
                        <Space wrap>
                            <Select
                                onChange={handleChangeActions}
                                style={{ width: 120 }}
                                value={[Actions]}
                                options={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Disable', label: 'Disable' },
                                    { value: 'Delete', label: 'Delete' },
                                ]}
                            />
                        </Space>
                    </div>
                    {/* This is Search Input box */}
                    <div className="w-auto h-full flex justify-center items-center">
                        <AutoComplete popupMatchSelectWidth={450} className="w-[500px]" onSearch={handleSearch} >
                            <Input.Search size="large" placeholder="Write email & Username & Phone number" enterButton />
                        </AutoComplete>
                    </div>
                    <div className="flex gap-2">
                        <Space wrap>
                            <Select
                                defaultValue="Status"
                                onChange={handleUserStatus}
                                style={{ width: 120 }}
                                options={[
                                    { value: "enable", label: 'Active' },
                                    { value: "disable", label: 'Deactive' },
                                    { value: "", label: 'All' },
                                ]}
                            />
                        </Space>
                    </div>
                </header>
                <div className="w-full h-auto flex">
                    {
                        showLoding ?
                            <div className="w-full h-96 bg-white flex justify-center items-center">
                                <Spin size="large" />
                            </div>
                            :
                            <Table
                                rowSelection={{ type: "checkbox", ...rowSelection }}
                                columns={columns}
                                dataSource={UseData}
                                className="w-full"
                            />
                    }
                </div>
            </section>
        </main>
    )
}
