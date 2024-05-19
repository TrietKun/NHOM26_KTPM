'use client';

import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignOut } from '@fortawesome/free-solid-svg-icons'

interface user {
    dshocPhan: Array<hocPhan>
    soTinChiDatDuoc?: number
    toeic: boolean
}

interface hocPhan {
    soTinChi: number,
    diem: number
    idHocPhan: string,
    tenHocPhan: string,
    idHocKy: string,
    idMonHoc: string

}

interface hocKy {
    idHocKy: string

}

function page() {

    const [user, setUser] = useState<user>(); // Add type annotation for 'user' state variable
    let [dsHocKy, setDsHocKy] = useState<Array<hocKy>>([]); // Add type annotation for 'dsHocKy' state variable
    let [totalCore, setTotalCore] = useState<number>(0); // Add type annotation for 'totalCore' state variable
    let total = 0;

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                parsedUser.toeic = false;
                let count = 0
                parsedUser.dshocPhan.forEach((element: { diem: number; }) => {
                    if (element.diem) {   
                        count += 1
                    }
                })
                
                setUser(parsedUser);
                setDsHocKy(parsedUser.dshocPhan.map((hocPhan: { idHocKy: any; }) => ({ idHocKy: hocPhan.idHocKy })));
                    
                    parsedUser.dshocPhan.forEach((element: { diem: number; }) => {
                        if (element.diem) {
                            console.log('element', element.diem);
                            total += element.diem;
                        }
                    })
                setTotalCore(total/2/count);
                    

            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);


    useEffect(() => {
        console.log('====================================');
        console.log('user', totalCore);
        console.log('====================================');
    }, [user, dsHocKy, totalCore])

    const renderListSubjectOfUser = () => {
        if (!user || !user.dshocPhan) {
            return <div>Không có dữ liệu để hiển thị</div>;
        }
        const hocKyList = Array.from(new Set(user.dshocPhan.map(hocPhan => hocPhan.idHocKy)));
        console.log('====================================');
        console.log('hocKyList', hocKyList);
        console.log('====================================');

        return (
            <div className='flex-1 justify-center h-full items-center center p-5'>
                <div className="flex justify-center h-fit border border-black py-2">
                    Các môn đã học
                </div>


                {hocKyList.map(dsHocPhan => (
                    <div key={dsHocPhan}>
                        <div className='flex pl-2 h-fit border border-black py-2 shadow-xl shadow-gray-400'>
                            <div className='flex-1'>{dsHocPhan}</div>
                        </div>
                        <table className='w-full border border-black mb-5 shadow-xl shadow-gray-400'>
                            <thead className='bg-gray-200 text-black font-semibold text-base border border-black'>
                                <tr>
                                    <th className='border border-black'>STT</th>
                                    <th className='border border-black'>Mã môn</th>
                                    <th className='border border-black'>Tên môn</th>
                                    <th className='border border-black'>Số tín chỉ</th>
                                    <th className='border border-black'>Điểm</th>
                                </tr>
                            </thead>
                            <tbody className='text-black font-normal text-base border border-black pl-3'>
                                {user.dshocPhan
                                    .filter(hocPhan => hocPhan.idHocKy === dsHocPhan)
                                    .map((hocPhan, index) => (
                                        <tr key={index}>
                                            <td className='border border-black'>{index + 1}</td>
                                            <td className='border border-black'>{hocPhan.idHocPhan}</td>
                                            <td className='border border-black'>{hocPhan.tenHocPhan}</td>
                                            <td className='border border-black'>{hocPhan.soTinChi}</td>
                                            <td className='border border-black'>{hocPhan.diem !== null ? hocPhan.diem : 'Đang học'}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        );
    };

    const handelRequestGraduation = () => {
        alert('Yêu cầu tốt nghiệp thành công');
    }

    return (
        <div
            className="flex-1 justify-center h-full items-center center"
        >
            <div className="flex space-x-3 text-black text-base font-semibold bg-gray-50 h-17 justify-center w-full shadow-xl shadow-gray-400 item-center">
                <Link className="hover:text-blue-500 h-full content-center" href="/home">
                    <Image src="/assets/Logo_IUH.png" alt="home" width={120} height={70} />
                </Link>
                <div className="min-h-17 w-3/5 content-center border-opacity-5">
                    <input className="max-h-16 h-10 w-11/12  rounded-full pl-6 text-gray-700 shadow-lg" type="text" placeholder="Search..." />
                    <button style={{
                        position: 'sticky',
                        backgroundColor: '#4CAF50',
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        zIndex: 3,

                    }} >
                        <FontAwesomeIcon icon={faSearch} color='white' />
                    </button>
                </div>
                <Link className="hover:text-blue-500 min-h-full content-center" href="/home">Trang chủ</Link>
                <Link className="hover:text-blue-500 min-h-full content-center" href="/home">Tin tức</Link>
                <Link className="hover:text-blue-500 min-h-full content-center" href="/">User</Link>
                <button className="hover:text-blue-500 min-h-full content-center">
                    <FontAwesomeIcon icon={faSignOut} color='black' />
                </button>
            </div>

            {renderListSubjectOfUser()}


            <div
                className='flex space-x-3 text-black text-base font-semibold bg-gray-50 h-17 mx-auto justify-center w-1/2 shadow-gray-400 item-center'
            >
                <div
                    style={{
                        backgroundColor: user?.soTinChiDatDuoc ?? 0 / 156 !== 1 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 1)'
                    }}
                    className='justify-center h-full items-center center p-5 rounded-lg mt-2 shadow-xl shadow-slate-400'
                >
                    Tổng số tín chỉ đã học: {user?.soTinChiDatDuoc} / 156
                </div>
                <div
                    style={{
                        backgroundColor: user?.toeic == false ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 1)'
                    }}
                    className='justify-center h-full items-center center bg-slate-500 p-5 rounded-lg m-2 shadow-xl shadow-slate-400'
                >
                    Chứng chỉ toeic: {user?.toeic ? 'Đã có' : 'Chưa có'}
                </div>
                <div
                    style={{
                        backgroundColor: totalCore < 5 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 1)'
                    }}
                    className='justify-center h-full items-center center bg-slate-500 p-5 rounded-lg m-2 shadow-xl shadow-slate-400'
                >
                    Điểm tốt nghiệp: {totalCore}
                </div>                
            </div>
            <button 
                    onClick={handelRequestGraduation}
                    className='flex space-x-3 text-black text-base font-semibold 
                    bg-gray-500 h-17 justify-center shadow-xl shadow-gray-400 item-center 
                    my-5 p-5 rounded-lg m-2 w-1/2 mx-auto mt-4
                    hover:bg-gray-400 hover:text-white hover:shadow-xl hover:shadow-gray-400
                    '
                >
                    Yêu cầu tốt nghiệp
                </button>
            
        </div>
    )
}

export default page