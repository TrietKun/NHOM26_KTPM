'use client'; // Khai báo sử dụng strict mode
// import 'schedule.scss';
import React, { Component ,useEffect,useRef, useState} from 'react'
import axios from 'axios';
import ip from '../ip';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faGraduationCap, faDollar, faCreditCard, faChartColumn, faMoneyBill , faSignOut,faHome,faDisplay,faSquareCheck} from '@fortawesome/free-solid-svg-icons';
// import './schedule.css'
import './App.css'
interface Schedule {
    thu: string;
    tiet: string;
    phong: string;
}
interface ScheduleTH {
    thu: string;
    tiet: string;
    phong: string;
    nhom: string;
}
interface ScheduleData {
    id: number;
    tenHocPhan: string;
    giangVien: string;
    lichHocLyThuyet: Schedule;
    lichHocThucHanh: [ScheduleTH];
}
interface User {
    mssv: string;
    password: string;
    email: string;
    name: string;
}

const SchedulePage = () => {


    let [user, setUser] = useState<User | null>(null);
    let [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
    const [openInformations, setOpenInformations] = useState(true);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [isServiceOpen2, setIsServiceOpen2] = useState(false);
    const [isServiceOpen3, setIsServiceOpen3] = useState(false);
    const [isServiceOpen4, setIsServiceOpen4] = useState(false);

    const toggleServiceMenu = () => {
        setIsServiceOpen(!isServiceOpen);
    };
    const toggleServiceMenu2 = () => {
        setIsServiceOpen2(!isServiceOpen2);
    };
    const toggleServiceMenu3 = () => {
        setIsServiceOpen3(!isServiceOpen3);
    };
    const toggleServiceMenu4 = () => {
        setIsServiceOpen4(!isServiceOpen4);
    };

    useEffect(() => {
        // Lấy thông tin user từ Local Storage khi component được mount
        const user = JSON.parse(localStorage.getItem('user') || '');
        if (user) {
            getSchedules(user?.mssv);
            setUser(user);
        }
      }, []);

      useEffect(() => {
        console.log('scheduleData', scheduleData);
        render();
    }, [scheduleData]);
    

    const getSchedules = async(mssv : any) => {
        await axios.post('http://'+ip+':3001/auth/findUser', {mssv :mssv})
        .then(res => {
            console.log(res.data);
            setScheduleData(res.data.data.dshocPhan);
            // console.log('scheduleData', scheduleData);
        })
    }

    //tạo function name(params:type) {
        const renderSchedule = (schedule: Schedule, nameSubject : String , color : String) => {
            let element: HTMLElement | null = null;
            let id = 1;
            if (schedule?.thu === 'Thứ 2') {
                id = 1;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            } else if (schedule?.thu === 'Thứ 3') {
                id = 2;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            } else if (schedule?.thu === 'Thứ 4') {
                id = 3;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            } else if (schedule?.thu === 'Thứ 5') {
                id = 4;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('13')) {  id += 13 }
                element = document.getElementById(id.toString());
            } else if (schedule?.thu === 'Thứ 6') {
                id = 5;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            }
            else if (schedule?.thu === 'Thứ 7') {
                id = 6;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            }
            else if (schedule?.thu === 'Chủ nhật') {
                id = 7;
                if (schedule.tiet.startsWith('3') || schedule.tiet.includes('6')) { id  } 
                else if (schedule.tiet.includes('9') || schedule.tiet.includes('12')) {  id += 7 }
                else if (schedule.tiet.includes('15')) {  id += 13 }
                element = document.getElementById(id.toString());
            }
        
            if (element) {
                
                const isDisplayed = element.innerHTML.includes(schedule.tiet + ' ' + schedule.phong + '<br>');
                // Nếu môn học chưa được hiển thị trước đó thì hiển thị nó
                if (!isDisplayed) {
                    // bọc trong 1 cái div để hiển thị tên môn học
                    const div = document.createElement('div');
                    div.innerHTML = nameSubject + '<br>' + schedule.tiet + ' ' + schedule.phong + '<br>';
                    element.appendChild(div);
                    //css cho div bằng 1 đối tượng style có các thuộc tính trên 1 dòng
                    div.style.cssText = 'background-color: ' + color+' ; color: white; padding: 5px; margin: 5px; border-radius: 5px;';
                }
            }
        };
        



    const render = () => {
        scheduleData.forEach((schedule) => {
            renderSchedule(schedule.lichHocLyThuyet , schedule.tenHocPhan , 'green');
            renderSchedule(schedule.lichHocThucHanh[0] , schedule.tenHocPhan , 'orange');
        });
    };
    
     
      
    return (
       
      <div 
        className='flex-1 justify-center h-full items-center center'
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
        <div 
            className='flex justify-center h-fit border border-black py-2'
        >
        <div>
            <div className="App">
                <div className="menu">
                    <ul className="menu-list">
                        <li className="menu-item"><a href="/home"><FontAwesomeIcon icon={faHome} className="icon" />Trang chủ</a></li>
                        <li className="menu-item">
                            <a href="#services" onClick={toggleServiceMenu}>
                            <FontAwesomeIcon icon={faDisplay} />Thông tin chung {isServiceOpen ? '-' : '+'}
                            </a>
                            {isServiceOpen && (
                            <ul className="sub-menu">
                                <li className="sub-item"><a href=''>Thông tin sinh viên</a></li>
                                <li className="sub-item"><a href=''>Ghi chú nhắc nhở</a></li>
                                <li className="sub-item"><a href=''>Đề xuất cập nhật thông tin</a></li>
                                <li className="sub-item"><a href=''>Đề xuất cập nhật thông tin ngân hàng</a></li>
                            </ul>
                            )}
                        </li>
                        <li className="menu-item">
                            <a href="#services" onClick={toggleServiceMenu2}>
                            <FontAwesomeIcon icon={faGraduationCap} />Học tập {isServiceOpen2 ? '-' : '+'}
                            </a>
                            {isServiceOpen2 && (
                            <ul className="sub-menu">
                                <li className="sub-item"><a href=''>Kết quả học tập</a></li>
                                <li className="sub-item"><a href=''>Lịch theo tuần</a></li>
                                <li className="sub-item"><a href=''>Lịch theo tiến độ</a></li>
                                <li className="sub-item"><a href=''>Lịch lớp học danh nghĩa</a></li>
                            </ul>
                            )}
                        </li>
                        <li className="menu-item">
                            <a href="#services" onClick={toggleServiceMenu3}>
                            <FontAwesomeIcon icon={faSquareCheck} />Đăng ký học phần {isServiceOpen3 ? '-' : '+'}
                            </a>
                            {isServiceOpen3 && (
                            <ul className="sub-menu">
                                <li className="sub-item"><a href=''>Chương trình khung</a></li>
                                <li className="sub-item"><a href=''>Đăng ký học phần</a></li>
                            </ul>
                            )}
                        </li>
                        <li className="menu-item">
                            <a href="#services" onClick={toggleServiceMenu4}>
                            <FontAwesomeIcon icon={faCreditCard} /> Học phí {isServiceOpen4 ? '-' : '+'}
                            </a>
                            {isServiceOpen4 && (
                            <ul className="sub-menu">
                                <li className="sub-item"><a href=''>Tra cứu công nợ</a></li>
                                <li className="sub-item"><a href=''>Thanh toán trực tiếp</a></li>
                                <li className="sub-item"><a href=''>Phiếu thu tổng hợp</a></li>
                            </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <table 
            className='border border-separate border-spacing-1 w-fit text-center' 
        >
          <thead>
            <tr className='border border-black'>
                <th className='border border-black'>Buổi</th>
                <th className='border border-black '>Thứ 2</th>
                <th className='border border-black'>Thứ 3</th>
                <th className='border border-black'>Thứ 4</th>
                <th className='border border-black'>Thứ 5</th>
                <th className='border border-black'>Thứ 6</th>
                <th className='border border-black'>Thứ 7</th>
                <th className='border border-black'>Chủ nhật</th>
            </tr>
          </thead>
          <tbody>
              <tr 
                className='border border-black w-full'
              >
                <td className='border border-black px-5'>Sáng</td>
                    {[...Array(7)].map((_, index) => (
                        <td key={index} id={(index +1).toString()} 
                            className='border border-black px-5 w-fit'
                        ></td>
                    ))}
              </tr>
              <tr >
                <td className='border border-black px-5 w-fit'>Chiều</td>
                {
                    [...Array(7)].map((_, index) => (
                        <td key={index} id={(index +7).toString()} className='border border-black'></td>
                    ))
                }
              </tr>
              <tr>
                <td id='7' className='border border-black px-5 w-fit'>Tối</td>
                {
                    [...Array(7)].map((_, index) => (
                        <td key={index } id={(index +14).toString()} className='border border-black'></td>
                    ))
                }
              </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  
}

export default SchedulePage
