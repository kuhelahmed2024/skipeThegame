"use client"
import Logo from "@/public/image/logo.png"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"

import React from 'react';
import { AppstoreOutlined, CarOutlined, EllipsisOutlined, UserOutlined, FileDoneOutlined, LinkOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Badge } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'dashboard',
        icon: <Badge dot={true}><AppstoreOutlined /></Badge>,
        label: 'Dashboard',
    },
    // {
    //     key: 'link',
    //     icon: <LinkOutlined />,
    //     label: 'Link',
    // },
    {
        key: 'informasion',
        label: 'Informations',
        icon: <Badge dot={true}><FileDoneOutlined /></Badge>,
    },
];

interface LeftComponentProps {
    clickEvent: (showSliedName: string) => void;
}

const LeftSide: React.FC<LeftComponentProps> = ({ clickEvent }) => {
    const onClick: MenuProps['onClick'] = (e) => {
        clickEvent(e.key)
    };
    return (
        <main className="w-[17vw] h-auto flex flex-col gap-2 bg-white">
            <header className="w-full h-auto flex gap-2 justify-center items-center p-3">
                <Link href={"/admin"} className="flex w-auto h-full justify-center items-center">
                    <Image src={Logo} priority={true} placeholder="empty" property="true" className="w-[80%]" alt="" />
                </Link>
            </header>
            <Menu onClick={onClick} style={{ width: 256, }} mode="inline" items={items} className="w-full h-[90vh] overflow-y-auto styleSliedBar" />
        </main>
    )
}
export default LeftSide
