'use client';
import React, { useState, useEffect, ReactNode, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBackspace, faArrowLeft, faLeftLong, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';
import { render } from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { get } from 'https';
import { Aladin } from 'next/font/google';
import ip from '../ip';

interface User {
    mssv: string;
    hoTen: string;
    dshocPhan: any[];
    _id : string;
    gmail: string;
  }
  interface ListSubject {
  
  }

const dataSubject = require('/public/data/dataSubject.js')
const dataClass = require('/public/data/dataClasses.js')


export default function page() {

    const [viewClass, setViewClass] = useState(false)
    const [viewClassRegister, setViewClassRegister] = useState(false)
    const [idHk, setIdHk] = useState('HK01')
    const [scheduleClash, setScheduleClash] = useState(false)
    const [viewModalRegister, setViewModalRegister] = useState(false)
    const [clazz, setClazz] = useState('')

    const [listClassFromApi, setListClassFromApi] = useState([])
    const [listClassRegisteredFromApi, setListClassRegisteredFromApi] = useState<any[]>([]);
    const [currentCourseName, setCurrentCourseName] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [listClassOfUser, setListClassOfUser] = useState<any[]>([]);
    const [viewClassDetail, setViewClassDetail] = useState(false)


    useEffect(() => {
        if (viewClass || viewClassDetail === true) {
            autoScroll('classes');
        }
        else if (viewClassRegister === true) {
            autoScroll('classesRegister');
        }
        else {
            window.scrollTo(0, 0);
        }
    }, [viewClass, viewClassRegister, scheduleClash, currentCourseName ])

    useEffect(() => {
        getAllClass();
    }, [idHk, listClassRegisteredFromApi,user])

    useEffect(() => {
        // Lấy thông tin user từ Local Storage khi component được mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
            reloadUser(parsedUser?.mssv);
        //   setUser(parsedUser);
          setListClassOfUser(parsedUser?.dshocPhan);
        }
      }, []); 

    const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setIdHk(event.target.value);
        setViewClass(false);
        setViewClassRegister(false);
    };

    const renderUniqueCourseNames = (): string[] => {
        const uniqueCourseNames: string[] = [];
        const newlistClassFromApi: string[] = [];

        listClassFromApi.forEach((item: any) => {
            if (!uniqueCourseNames.includes(item.tenHocPhan)) {
                uniqueCourseNames.push(item.tenHocPhan);
                newlistClassFromApi.push(item);
            }
        });
        return newlistClassFromApi;
    };



    const [listClass, setListClass] = useState<string[]>([]); // Khởi tạo listClass với mảng rỗng

    useEffect(() => {
        const newUniqueCourseNames = renderUniqueCourseNames(); // Lấy danh sách mới
        setListClass(newUniqueCourseNames); // Cập nhật listClass
    }, [listClassFromApi]); // Chạy lại effect khi listClassFromApi thay đổi
    
    

    const getClassByCourseName = (courseName: string) => {
        const classes: any[] = [];
        listClassFromApi.forEach((item: any) => {
            if (item.tenHocPhan === courseName ) {
                classes.push(item);
            }
        });
        return classes;
    }

    //Kiểm tra lịch trung khi đăng ký học phần
    const kiemtralichtrung = (item: any, listItem: any) => {
        for(let otherItem of listItem){
            if(item.lichHocLyThuyet.thu === otherItem.lichHocLyThuyet.thu){
                const message = `Lớp học trùng: ${otherItem.tenHocPhan} - ${otherItem.lopHocPhan}\n\n` +
                `Lịch học:\n` +
                `Tiết: ${otherItem.lichHocLyThuyet.tiet}\n` +
                `Thứ: ${otherItem.lichHocLyThuyet.thu}\n`+
                `Phòng: ${otherItem.lichHocLyThuyet.phong}\n`;
                alert(message);
                return 1;
            }

            for(let lichHocThucHanh of item.lichHocThucHanh){
               for(let orhterLichThucHanh of otherItem.lichHocThucHanh){
                if(lichHocThucHanh.thu === orhterLichThucHanh.thu && lichHocThucHanh.tiet === orhterLichThucHanh.tiet){
                    const message = `Lớp học trùng: ${otherItem.tenHocPhan} - ${otherItem.lopHocPhan}\n\n` +
                    `Lịch học:\n` +
                    `Tiết: ${orhterLichThucHanh.tiet}\n` +
                    `Thứ: ${orhterLichThucHanh.thu}\n`+
                    `Phòng: ${orhterLichThucHanh.phong}\n`;
                    alert(message);
                    return 2;//Có lịch học thực hành trùng nhau
                }
               }
            }
        }
        return 0; // Không có lịch học trùng
    }

    const renderListSubject = (): ReactNode => {
        let stt = 0; // Khởi tạo biến đếm STT
        // const uniqueCourseNames = renderUniqueCourseNames();
        return (
            <>
                <div
                    style={{
                        backgroundColor: '#bebbec',
                    }}
                    className='grid grid-cols-8 w-full p-3 m-2 rounded-lg shadow-md content-center align-middle'>
                    <div>
                        <h3 className=' font-bold'>STT</h3>
                    </div>
                    <div>
                        <h3 className='mx-auto font-bold'>Mã học phần</h3>
                    </div>
                    <div className='col-span-3 flex justify-between'>
                        <h3 className=' font-bold'>Tên học phần</h3>
                    </div>
                    <div>
                        <h3 className=' font-bold'>Số tín chỉ</h3>
                    </div>

                    <div>
                        <h3 className='col-span-1 flex justify-end font-bold'>Chọn</h3>
                    </div>
                </div>
                {listClass.map((item: any, index: number) => (
                    //chỉ hiện danh sách tên các học phân khác nhau
                    //item.idHocKy === idHk && 
                    item ?
                        <div
                            key={index}
                            className='grid grid-cols-8 w-full bg-white p-3 m-2 rounded-lg shadow-md'
                        >
                            <div>
                                <h4>{++stt}</h4>
                            </div>
                            <div>
                                <h4>{item.idHocPhan}</h4>
                            </div>
                            <div className='col-span-3 flex justify-between '>
                                <h4 className='font-bold'>{item.tenHocPhan}</h4>
                            </div>
                            <div>
                                <p>{item.soTinChi}</p>
                            </div>

                            {/* radio button */}
                            <div className='col-span-1 flex justify-end'>
                                <input
                                    onClick={async () => {
                                        if(await checkNumberRegistered(item?.soTinChi) === true){
                                            setCurrentCourseName(item.tenHocPhan);
                                            setViewClassDetail(true)
                                            setViewClassDetail(true)
                                            console.log("óahjdgfuhsdfhjshdjóahjdgfuhsdfhjshdj");
                                            
                                        }else{
                                            
                                        }
                                    }}
                                    type='radio'
                                    name='subject'
                                />
                            </div>
                        </div>
                        :
                        null
                ))}
            </>
        );
    }





    const autoScroll = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getSchedule = () => {
        const listCurrentSchedule: any[] = [];
        for (let i = 0; i < listClassOfUser.length; i++) {
            listCurrentSchedule.push(listClassOfUser[i].schedule);
        }
        return listCurrentSchedule;
    }

    const clearSchedule = () => {
        const listCurrentSchedule: any[] = [];
        return listCurrentSchedule;
    }

    const renderNoScheduleClash = (schedule: any) => {
        // const listCurrentSchedule: any[] = [];
        // for (let i = 0; i < storedUser.dshocPhan.length; i++) {
        //     listCurrentSchedule.push(storedUser.dshocPhan[i].schedule);
        //     console.log('listCurrentSchedule', listCurrentSchedule);
        // }

        const listCurrentSchedule = scheduleClash == false ? getSchedule() : clearSchedule();

        if (listCurrentSchedule.includes(schedule)) {
            console.log('Lịch trùng');
            return false;
        } else {
            console.log('Lịch không trùng');
            return true;
        }
    }

    const openModalRegister = (clazz: any) => {
        setViewModalRegister(true);
        setClazz(clazz);
    }
    const closeModalRegister = () => {
        setViewModalRegister(false);
        setClazz('');
    }
    const openModalCancel = (clazz: any) => {
        setIsShowModal(true);
        setClazz(clazz);
    }
    const closeModalCancel = () => {
        setIsShowModal(false);
        setClazz('');
    }



    const renderModalRegister = (boolean: boolean, clazz: any): ReactNode => {
        return (
            <Modal
                isOpen={boolean}
                onRequestClose={() => setViewClassRegister(false)}
                //bấm ra ngoài thì đóng modal
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '50%',
                        height: 'fit-content',
                        margin: 'auto',
                        backgroundColor: 'white',
                    },
                }}
            >
                <div className='flex justify-between  w-full'>
                    <h1 className='mx-auto pt-2 font-bold'>Đăng kí lớp học</h1>
                    <button
                        className='btn btn-primary w-10 h-10 p-1 m-2 absolute top-3 right-5'
                        onClick={() => {
                            closeModalRegister()
                        }}
                    >
                        <FontAwesomeIcon icon={faX} size='1x' />
                    </button>

                </div>
                <div
                    className='w-full bg-white p-3 m-2 rounded-lg shadow-md mx-auto text-center mt-4'
                > Xác nhận đăng ký lớp  {clazz.tenHocPhan}  </div>
                <div className='flex justify-center'>
                    <button
                        className='btn btn-primary w-1/3 h-10 p-1 m-2 bg-green-700 rounded-lg shadow-2xl'
                        onClick={() => {
                            handleRegisterClass(clazz);
                            alert('Bạn đã đăng ký thành công lớp học ' + clazz.tenHocPhan);
                            sendEmail(user?.gmail ?? '', 
    `
    Chào `+user?.hoTen+`,

    Chúc mừng! Bạn đã đăng ký học phần thành công.

    Thông tin môn học:
        - Mã học phần:  `+clazz.idHocPhan+`
        - Tên môn học: `+clazz.tenHocPhan+`
        - Giảng viên: `+clazz.giangVien+`
        - Thời gian học: `+new Date(clazz.ngayBatDau)+` - `+new Date(clazz.ngayKetThuc)+`

    Thông tin cơ sở giảng dạy:
        - Trường: Đại học Công nghiệp Thành phố Hồ Chí Minh
        - Địa chỉ: 12 Nguyễn Văn Bảo, phường 4, quận Gò Vấp, Thành phố Hồ Chí Minh
        - Số điện thoại: 0121212121212

    Chúc bạn có một kỳ học tốt lành!

    Trân trọng!
    `
                            );
                            closeModalRegister()
                            setViewClassDetail(false);
                        }}
                    >
                        Xác nhận
                    </button>
                    <button
                        className='btn btn-primary w-1/3 h-10 p-1 m-2 bg-red-700 rounded-lg shadow-2xl'
                        onClick={() => { closeModalRegister() }}
                    >
                        Hủy
                    </button>
                </div>

            </Modal>
        )
    }

    const renderModalCancel = (boolean: boolean, clazz: any): ReactNode => {
        return (
            <Modal
                isOpen={boolean}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '50%',
                        height: 'fit-content',
                        margin: 'auto',
                        backgroundColor: 'white',

                    },
                
                }}
                className={'modal w-1/2  h-auto bg-white p-5 m-5 rounded-lg shadow-md '}
                >
                <div
                    className=' flex justify-between'
                >
                    <h1
                        className='mx-auto pt-2 font-bold'
                    >Bạn chắc chắn muốn hủy lớp học phần {clazz.tenHocPhan} </h1>
                    
                </div>
                <div
                    className='w-full bg-white p-3 m-2 rounded-lg shadow-md mx-auto text-center mt-4 flex place-content-around'
                >
                    <button
                        className='btn btn-primary w-1/3 h-10 p-1 m-2 bg-green-700 rounded-lg shadow-2xl'
                        onClick={() => {
                            hadleCancelClass(clazz);
                            alert('Bạn đã hủy thành công lớp học phần');
                            closeModalCancel();
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        className='btn btn-primary w-1/3 h-10 p-1 m-2 bg-red-700 rounded-lg shadow-2xl'
                        onClick={() => { closeModalCancel() }}
                    >Đóng</button>
                </div>
            </Modal>
        )
    }

    //render radio button
    const renderButtonNoScheduleClash = (boolean: boolean): ReactNode => {
        return boolean ? (
            //    làm 2 radio bật tắt trùng lịch và không trùng lịch
            <div className='w-full bg-white p-3 m-2 rounded-lg shadow-md '>
                <div className='flex justify-center '>
                    <input
                        //khi click vào radio button thì setScheduleClash = true
                        onClick={() => {
                            setScheduleClash(true)
                        }}
                        className='mr-2'
                        type='radio'
                        name='schedule'
                    />
                    <label>Không trùng lịch</label>
                    <input
                        //khi click vào radio button thì setScheduleClash = false
                        onClick={() => {
                            setScheduleClash(false)
                        }}
                        className='ml-2'
                        type='radio'
                        name='schedule'
                    />
                    <label>Tất cả</label>
                </div>
            </div>
        )
            :
            null
    }

    const renderClassDetail = (boolean: boolean): ReactNode => {
        let stt = 0;
        const listClass = getClassByCourseName(currentCourseName);
        let selectedClass = null; // Biến để lưu trữ phần tử được chọn
    
        return boolean && (
            <div
                id='classes'
                className='w-full bg-white p-3 m-2 rounded-lg shadow-md'
            >
                <div className='w-full'>
                    <table className='w-full border border-separate border-spacing-1 h-full'>
                        <thead>
                            <tr>
                                <th className='border'>STT</th>
                                <th className='border'>Lý thuyết</th>
                                <th className='border'>Thực hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClass.map((item: any, index: number) => (
                                item &&
                                <tr key={index}>
                                    <td className='border flex justify-center content-center items-center pl-3 font-bold h-full'>{++stt}</td>
                                    <td className='border'>
                                        <div className='pl-3 bg-green-400 p-4 h-full rounded-lg m-3'>
                                           
                                            <p className='font-bold text-white'>{item.tenHocPhan}</p>
                                            <p className='ml-5'>{item?.idHocPhan}</p>
                                            <p className='ml-5'>{item?.lopHocPhan}</p>
                                            <p className='ml-5 mt-3'>{item?.lichHocLyThuyet?.thu}</p>
                                            <p className='ml-5'>{item?.lichHocLyThuyet?.tiet}</p>
                                            <p className='ml-5'>{item?.lichHocLyThuyet?.phong}</p>
                                            <p className='ml-5'>{item?.giangVien}</p>
                                            <p className='ml-5'>{item?.siSoDaDangKy}</p>
                                        </div>
                                    </td>
                                    <td className='border'>
                                        { 
                                            item.lichHocThucHanh.length !== 0 ?
                                            (item?.lichHocThucHanh?.map((subItem: any, subIndex: number) => (
                                                <div 
                                                    className='pl-3 bg-orange-200 border border-black border-spacing-1 rounded-lg p-4 h-full m-3 w-auto'
                                                    key={subIndex}
                                                >
                                                    <div className='flex items-center justify-between w-full h-full'>
                                                        <div className='bg-slate-500 flex-1 rounded-md p-2'>
                                                            <p className='text-end font-extrabold'>Nhóm {subItem.nhom}</p>
                                                            <p>{subItem.thu}</p>
                                                            <p>{subItem.tiet}</p>
                                                            <p>{subItem.phong}</p>
                                                        </div>
                                                        {
                                                            item.siSoToiDa == item.siSoDaDangKy ?
                                                                <button
                                                                    className='h-full min-w-32 bg-red-500 rounded-md ml-2 py-11'
                                                                   
                                                                >
                                                                    Đã đầy
                                                                </button>
                                                                :
                                                                <button 
                                                                    className='h-full min-w-32 bg-green-500 rounded-md ml-2 py-11 hover:bg-green-300'
                                                                    onClick={() => {
                                                                        if(kiemtralichtrung(item, listClassOfUser)===0){
                                                                            // Lưu trữ phần tử được chọn
                                                                            selectedClass = item;
                                                                            //loại bỏ phần tử không được chọn ra khỏi mảng lichHocThucHanh của item
                                                                            selectedClass.lichHocThucHanh = item.lichHocThucHanh.filter((item: any) => item === subItem);
                                                                            selectedClass.trangThai = 'Đăng ký mới'
                                                                            selectedClass.siSoDaDangKy +=1;
                                                                            console.log('selectedClass', selectedClass);
                                                                            // Sau đó bạn có thể thực hiện các hành động khác ở đây
                                                                            // Ví dụ: mở modal, chuyển hướng, v.v.
                                                                            openModalRegister(selectedClass);
                                                                        }
                                                                    }}
                                                                >
                                                                    Đăng ký
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                            )))
                                            :
                                            <div
                                                className='h-full w-auto p-3'
                                            >
                                                <button
                                                onClick={() => {

                                                    if(kiemtralichtrung(item, listClassOfUser)===0){
                                                        // Lưu trữ phần tử được chọn
                                                        selectedClass = item;
                                                        selectedClass.trangThai = 'Đăng ký mới'
                                                        selectedClass.siSoDaDangKy +=1;
                                                        console.log('selectedClass', selectedClass);
                                                        // Sau đó bạn có thể thực hiện các hành động khác ở đây
                                                        // Ví dụ: mở modal, chuyển hướng, v.v.
                                                        openModalRegister(selectedClass);
                                                    }
                                                    
                                                }}
                                                className='w-full bg-green-400 h-full rounded-lg'
                                            >
                                                Đăng ký
                                            </button>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    

    const renderClassRegistered = (boolean: boolean): ReactNode => {
        return (
            <div
                id='classes'
                className='w-full bg-white p-3 m-2 rounded-lg shadow-md'
            >
                <div className='w-full'>
                    <table className='w-full border border-separate border-spacing-1'>
                        <thead>
                            <tr>
                                <th className="border">STT</th>
                                <th className="border">Mã lớp</th>
                                <th className="border">Tên lớp</th>
                                <th className="border">Học phí</th>
                                <th className="border">Đã thu</th>
                                <th className="border">Trạng thái</th>
                                <th className="border">Lịch</th>
                                <th className="border">Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClassOfUser.map((item: any, index: number) => (
                                item &&
                                <tr key={index}>
                                    <td className="border">{index + 1}</td>
                                    <td className="border">{item.idHocPhan}</td>
                                    <td className="border">{item.tenHocPhan}</td>
                                    <td className="border">{item.hocPhi}</td>
                                    <td className="border">{item.thu === true ? 'Đã thu' : 'Chưa nộp'} </td>
                                    <td className="border">{item.trangThai}</td>
                                    <td className="border">{new Date(item.ngayKetThuc).toLocaleDateString()}</td>
                                    {
                                        item.thu === false ?
                                            <td className="border">
                                                <button
                                                    onClick={() => {
                                                        openModalCancel(item);
                                                    }}
                                                >
                                                    Hủy
                                                </button>
                                            </td>
                                            :
                                            null
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const getAllClass = async () => {
        await axios.get('http://'+ip+':3001/register/class')
            .then((response) => {
                const mang1 = response.data.data;
                let ketQua = mang1.filter((item1: any) => (
                    !listClassOfUser.some(item2 => item2.idHocPhan === item1.idHocPhan) // Kiểm tra xem có trong mang2 không
                ));
                setListClassFromApi(ketQua);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    const handleRegisterClass = async (clazz: any) => {
        listClassOfUser.push(clazz);
        // console.log('storedUser', listClassOfUser);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                class: clazz,
                userId: user?._id ,
                _id : "662a5d863f8b96d395b0ab01"
            }
        }  
        console.log('config', config.body.class._id);
        await axios.post('http://'+ip+':3001/register/increaseStudent',{_id : config.body._id } )
        .then((response) => {
            console.log('responsethem', response);
        })
        await axios.post('http://'+ip+':3001/register/registerClass', config.body)
            .then((response) => {
                console.log('response', response);
                 reloadUser(user?.mssv ?? '');
            })
            .catch((error) => {
                console.log('error', error);
            })


    }

    const reloadUser = async (mssv : string) => {
        reloadListClass();
        await axios.post('http://'+ip+':3001/auth/findUser', {mssv :mssv})
            .then((response) => {
                setUser(response.data.data);
                setListClassOfUser(response.data.data.dshocPhan);
                console.log('response', response.data.data);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    const hadleCancelClass = async (clazz: any) => {
        console.log('clazz', clazz);
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                class: clazz,
                userId: user?._id ,
                _id : "662a5d863f8b96d395b0ab01"
            }
        }  
        console.log('config', config);
        await axios.post('http://'+ip+':3001/register/decreaseStudent',{_id : config.body._id })
            .then((response) => {
                console.log('responsexoa', response);
            })
        await axios.post('http://'+ip+':3001/register/deleteClass', config.body)
            .then((response) => {
                console.log('response', response);
                reloadUser(user?.mssv ?? '');
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    const reloadListClass = async () => {
        await axios.get('http://localhost:3001/register/class')
            .then((response) => {
                setListClassFromApi(response.data.data);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    const checkNumberRegistered = async (soTinChi: number) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                userId: user?._id,
                hk: idHk,
                soTinChi: soTinChi
            }
        };
    
        try {
            const response = await axios.post('http://' + ip + ':3001/register/checkNumberCredit', {
                userId: config.body.userId,
                hk: config.body.hk,
                soTinChi: config.body.soTinChi
            });
    
            console.log('response', response);
    
            if (response.data.message === "Số tín chỉ vượt quá 30") {
                alert('Số tín chỉ đã đăng ký vượt quá 30 tín chỉ');
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log('error', error);
            return false;
        }
    };
    
    const sendEmail = async (email: string, subject: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: 'cudang123456789@gmail.com',
                subject: subject
            }
        };
    
        try {
            const response = await axios.post('http://' + ip + ':3001/register/sendMail', {
                email: config.body.email,
                subject: config.body.subject
            });
            console.log('response', response);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: 'lightblue'

            }}
        >
            <div className='w-4/5 h-fit max-h-52 bg-slate-500 relative'>
                <Image
                    src="/assets/banner.png"
                    width={1920}
                    height={1080}
                    alt=''
                />
            </div>
            {/* button back */}
            <button
                onClick={() => window.location.href = '/home'}
                className='btn btn-primary w-10 h-10  text-yellow-500 p-1 m-2 absolute top-0 left-0'
            >
                <FontAwesomeIcon icon={faLeftLong} size='3x' />
            </button>
            <div className='mt-5'>
                <h1 className='text-3xl text-center font-extrabold'>Đăng kí học phần</h1>
            </div>
            {/* selector học kì */}
            <div className='w-4/5 flex justify-center mt-5'>
                <select
                    onChange={handleSelectChange}
                    className='w-1/3 p-2 m-2 rounded-lg shadow-md'
                >
                    <option value='HK01'>Học kì 1</option>
                    <option value='HK02'>Học kì 2</option>
                    <option value='HK03'>Học kì 3</option>
                    <option value='HK04'>Học kì 4</option>
                    <option value='HK05'>Học kì 5</option>
                    <option value='HK06'>Học kì 6</option>
                    <option value='HK07'>Học kì 7</option>
                    <option value='HK08'>Học kì 8</option>
                    <option value='HK09'>Học kì 9</option>
                </select>
            </div>
            {/* danh sách học phần */}
            <div
                className='w-4/5 flex flex-wrap justify-center mt-5 bg-slate-500'
            >
                {renderListSubject()}

            </div>
            <div className='w-4/5 flex flex-wrap justify-center mt-5 bg-slate-500'>
                {renderButtonNoScheduleClash(viewClass)}
                {/* {renderListClass(viewClass)} */}
            </div>
            <div className='w-4/5 flex flex-wrap justify-center mt-5 bg-slate-500'>
                {
                    viewClassRegister ?
                        // header 
                        <div
                            style={{
                                backgroundColor: '#bebbec',
                            }}
                            className='grid grid-cols-12 w-full  p-3 m-2 rounded-lg shadow-md'
                        >
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>STT</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>Mã lớp</h4>
                            </div>
                            <div className='col-span-2 flex justify-between'>
                                <h4 className=' font-bold'>Tên môn</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>Số tín chỉ</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>Học phí</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>Thu</h4>
                            </div>
                            <div className='col-span-2'>
                                <h4 className=' font-bold'>Hạn nộp</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>Ngày đăng kí</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className=' font-bold'>TT ĐK</h4>
                            </div>
                            <div className='col-span-1'>
                                <h4 className='flex justify-end font-bold'>TT LHP</h4>
                            </div>
                        </div>
                        :
                        null
                }

                {/* {renderClassDetail(viewClassDetail)} */}
                {renderClassDetail(viewClassDetail)}
                {renderClassRegistered(true)}
                {renderModalRegister(viewModalRegister, clazz)}
                {renderModalCancel(isShowModal, clazz)}
            </div>
        </div>
    )
}
