'use client';
import React , {useEffect,useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faGraduationCap, faDollar, faBraille, faChartColumn, faMoneyBill , faSignOut} from '@fortawesome/free-solid-svg-icons';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables,ChartOptions } from 'chart.js';

import axios from 'axios';
import ip from '../ip';
import { list } from 'postcss';

interface User {
  mssv: string;
  hoTen: string;
  soTinChiDatDuoc: number;
  dshocPhan: ListSubject;
}
interface ListSubject {
  
}
interface storedUser {
  mssv: string;
  hoTen: string;
  dshocPhan: ListSubject;
}

Chart.register(...registerables);

const Home = () => {

  const [user, setUser] = useState<User | null>(null);
  const [subject, setSubject] = useState< ListSubject | [] >([]);
  const [selectedOption, setSelectedOption] = useState("HK01 (2021-2022)");
  const [selectedOption2, setSelectedOption2] = useState("HK01 (2021-2022)");


  useEffect(() => {
    // Lấy thông tin user từ Local Storage khi component được mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setSubject(parsedUser?.dshocPhan);
      console.log('User updated:', parsedUser);
      console.log('Subject updated:', parsedUser?.dshocPhan);
      
    }
  }, []); // Sử dụng một array rỗng để chỉ thực hiện useEffect khi component được mount lần đầu tiên


  const countPassFail = (subject: { idHocPhan: string, pass: boolean }[]) => {
    let total = subject.length;
    let passCount = 0;
    let failCount = 0;
    subject.forEach((item) => {
      if (item.pass) {
        passCount++;
      } else {

      }
    });
    return [passCount, total - passCount];
  };

  const [passCount, total] = countPassFail(subject as { idHocPhan: string, pass: boolean }[]);

  const data = {
    labels: ['Đạt', 'Còn'],
    title: 'Số tín chỉ đạt được',
    datasets: [
      {
        label: '',
        data: [user?.soTinChiDatDuoc, 156 - (user?.soTinChiDatDuoc ?? 0)],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 0.2)'],
        borderWidth: 1,
      },
    ],
  }
  // const filteredSubjects = subject.filter(item => item.hocKy === selectedOption);
  let filteredSubjects = Array.isArray(subject) ? subject.filter(item => item.idHocKy === selectedOption) : [];
  const chartData = {
    labels: filteredSubjects.map(item => item.tenHocPhan),
    datasets: [
      {
        label: 'Điểm học phần',
        data: filteredSubjects.map(item => item.diem),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'diemHP', // ID của trục tung cho biểu đồ cột
      },
      {
        label: 'Điểm trung bình',
        data: filteredSubjects.map(item => item.dtbMon),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        yAxisID: 'dtb', // ID của trục tung cho biểu đồ đường
      },
    ],
  };

  const dataBar2 = {
    labels: filteredSubjects.map(item => item.tenHocPhan),
    datasets: [
      {
        label: 'Điểm học phần',
        data: filteredSubjects.map(item => item.diem),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };
  
  const dataBar = {
    // labels: Array.isArray(subject) ? subject.map((item) => item.lopHocPhan) : [],
    labels: Array.isArray(subject) ? subject.map((item) => item.tenHocPhan) : [],
    // labels: Array.isArray(subject) ? subject.filter((item) => item.tenHocPhan) : [],
    // labels: ['Học kỳ 1', 'Học kỳ 2', 'Học kỳ 3', 'Học kỳ 4', 'Học kỳ 5'],
    datasets: [
      {
        label:  'Điểm học phần',
        // data: Array.isArray(subject) ? subject.map((item) => item?.avgMark) : [],
        data: Array.isArray(subject) ? subject.map((item) => item.diem) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',   
        ],
        borderWidth: 1,
      },
    ],
  }
  const handleChange = () => {
    setSelectedOption(selectedOption);
    // Tại đây, bạn có thể thực hiện các hành động khác khi học kỳ được chọn, như là tải dữ liệu từ máy chủ và cập nhật state
    
  };

  const optionsBar: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Điểm học phần',
      },
    },
  
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };
 

  


  const handleLogout = () => {
    // localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
     <div
      style={{

        backgroundColor: '#e7ecf0',
        alignItems: 'center',
        // justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',

      }}
      className='h-full  w-screen  bg-slate-500   shadow-xl shadow-gray-400 pb-7'>
      <div className="flex space-x-3 text-black text-base font-semibold bg-gray-50 h-17 justify-center w-full shadow-xl shadow-gray-400">
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
        <button onClick={handleLogout} className="hover:text-blue-500 min-h-full content-center">
          <FontAwesomeIcon icon={faSignOut} color='black' />
        </button>
      </div>
      <div className="flex justify-center items-center mt-2 w-full max-w-5xl rounded-full">
        <div className="w-full max-w-5xl">
          <div className='grid grid-cols-5 grid-rows-2 gap-2 rounded-full'>
            <div style={{
              backgroundColor: '#e7ecf0',
            }}
              className=' row-span-2 col-span-3  grid grid-cols-3 gap-2 rounded-lg'>
              <div className='col-span-3 row-span-1 bg-white p-2 font-bold hover:text-blue-500 shadow-xl shadow-gray-400 rounded-lg'>Thông tin sinh viên</div>
              <div
                style={{
                  backgroundColor: 'white',
                  //center
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                className='col-span-1 row-span-1 rounded-lg'>
                <div>
                  <Image
                    style={{
                      width: 120,
                      height: 120,
                    }}
                    className='rounded-full flex justify-center items-center align-middle w-full h-full bg-white '
                    src="/assets/1316101.png" alt="home" width={120} height={120} />
                </div>
                <Link
                  style={{
                    alignSelf: 'center',
                  }}
                  className='hover:text-blue-500 text-black font-semibold text-center shadow-xl shadow-gray-400 '
                  href="#">Xem chi tiết</Link>
              </div>

              <div
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  fontSize: 12,
                }}
                className='col-span-1 row-span-1 bg-white font-bold text-gray-600 p-2 shadow-xl shadow-gray-400 rounded-lg'>
                <text>MSSV : {user?.mssv}</text>
                <text>Họ tên : {user?.hoTen}</text>
                <text>Giới tính : Nam</text>
                <text>Ngày sinh : 01/01/2000</text>
                <text>Nơi sinh : Tây Ninh</text>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  fontSize: 12,
                }}
                className='col-span-1 row-span-1 bg-white font-bold text-gray-600 p-2 shadow-xl shadow-gray-400 rounded-lg'>
                <text>Lớp : DHKTPM16A</text>
                <text>Khóa học: 2020 - 2021</text>
                <text>Bậc đào tạo: Đại học</text>
                <text>Loại hình đào tạo: Chính quy</text>
                <text>Ngành: Kỹ thuật phần mềm</text>
              </div>
            </div>
            <div
              className='grid grid-cols-2 col-span-2  bg-white content-center align-middle text-xs font-bold shadow-xl shadow-gray-400 rounded-lg'>
              <div className='col-span-1 content-center mx-auto justify-center flex-col ml-3'>
                <p>Nhắc nhở chưa xem</p>
                <p>0</p>
                <p>Xem chi tiết</p>
              </div>
              <div className='col-span-1 content-center align-middle mx-auto  overflow-hidden rounded-lg'>
                <button className='w-10 h-10 bg-slate-500 rounded-full hover:bg-green-600'>
                  <FontAwesomeIcon className='hover:text-yellow-300' icon={faBell} color='black' size='2x'
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/schedule'}
              style={{
                backgroundColor: '#e0fbff',
                color: '#59a9ed',
              }}
              className='  content-center align-middle px-3.5 col-span-1 shadow-xl shadow-gray-400 font-bold rounded-lg'>
              Lịch học
            </button>
            <div
              style={{
                backgroundColor: '#fff4d4',
                color: '#f7b731',
              }}
              className=' content-center align-middle px-3.5 col-span-1 shadow-xl shadow-gray-400 font-bold rounded-lg'>
              Lịch thi
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-5  mt-4 w-screen max-w-5xl'>

        <div className='col-span-1 flex justify-center items-center  p-2 h-32'>
          <button 
          onClick={() => window.location.href = '/courseRegistration'}
          className='w-full bg-white h-full flex flex-col justify-center items-center rounded-lg shadow-xl shadow-gray-400 hover:bg-green-500'>
            <FontAwesomeIcon icon={faGraduationCap} color='black' className='relative mb-4 text-3xl' />
            <span>Đăng kí học phần</span>
          </button>
        </div>

        <div className='col-span-1 flex justify-center items-center   p-2 h-32'>
          <button 
          onClick={() => window.location.href = '/result'}
          className='w-full  bg-white h-full flex flex-col justify-center items-center rounded-lg shadow-xl shadow-gray-400 hover:bg-green-500'>
            <FontAwesomeIcon icon={faChartColumn} color='black' className='relative mb-4 text-3xl' />
            Kết quả học tập
          </button>
        </div>

        <div className='col-span-1 flex justify-center items-center   p-2 h-32'>
          <button className='w-full  bg-white h-full flex flex-col justify-center items-center rounded-lg shadow-xl shadow-gray-400 hover:bg-green-500'>
            <FontAwesomeIcon icon={faDollar} color='black' className='relative mb-4 text-3xl' />
            Tra cứu công nợ
          </button>
        </div>

        <div className='col-span-1 flex justify-center items-center   p-2 h-32'>
          <button className='w-full  bg-white h-full flex flex-col justify-center items-center rounded-lg shadow-xl shadow-gray-400 hover:bg-green-500'>
            <FontAwesomeIcon icon={faMoneyBill} color='black' className='relative mb-4 text-3xl' />
            Học phần đã đăng kí
          </button>
        </div>

        <div className='col-span-1 flex justify-center items-center   p-2 h-32 '>
          <button className='w-full  bg-white h-full flex flex-col justify-center items-center rounded-lg shadow-xl shadow-gray-400 hover:bg-green-500'>
            <FontAwesomeIcon icon={faBell} color='black' className='relative mb-4 text-3xl' />
            Nhắc nhở
          </button>
        </div>
      </div>
      <div 
        className='grid grid-cols-4 w-full max-w-5xl mt-4 gap-2 h-fit'
      >
        <div
          className='col-span-2 w-full max-w-5xl  bg-white shadow-xl shadow-gray-400 p-2 max-h-svh rounded-xl h-full'
        >
        <select value={selectedOption} onChange={e => {
          setSelectedOption(e.target.value)}
        } 
        // className='w-1/4 h-10 bg-white rounded-lg shadow-xl shadow-gray-400' 
        style={{borderRadius:1,borderWidth:2,borderColor:"black"}}>
          <option value='HK01 (2021-2022)'>HK01 (2021-2022)</option>
          <option value='HK02 (2021-2022)'>HK02 (2021-2022)</option>
          <option value='HK03 (2021-2022)'>HK03 (2021-2022)</option>
          <option value='HK01 (2022-2023)'>HK01 (2022-2023)</option>
          <option value='HK02 (2022-2023)'>HK02 (2022-2023)</option>
          <option value='HK03 (2022-2023)'>HK03 (2022-2023)</option>
        </select>
          <Bar 
            style={{
              height: '100%',
            }}
            data={dataBar2} 
            options={optionsBar}
          />
        </div>  
        <div className='col-span-1 min-h-full max-h-svh bg-white content-center shadow-2xl rounded-xl'>
          <Pie data={data} title='Số tín chỉ đạt được'/>
        </div>
        <div className='col-span-1 min-h-full max-h-svh bg-white content-center shadow-2xl rounded-xl'>
            <select value={selectedOption2} onChange={e => {
                    setSelectedOption2(e.target.value)}
                  } 
                  // className='w-1/4 h-10 bg-white rounded-lg shadow-xl shadow-gray-400' 
                  style={{borderRadius:1,borderWidth:2,borderColor:"black"}}>
                    <option value='HK01 (2021-2022)'>HK01 (2021-2022)</option>
                    <option value='HK02 (2021-2022)'>HK02 (2021-2022)</option>
                    <option value='HK03 (2021-2022)'>HK03 (2021-2022)</option>
                    <option value='HK01 (2022-2023)'>HK01 (2022-2023)</option>
                    <option value='HK02 (2022-2023)'>HK02 (2022-2023)</option>
                    <option value='HK03 (2022-2023)'>HK03 (2022-2023)</option>
            </select>
            {Array.isArray(subject) && subject.filter(item=> item.idHocKy === selectedOption2).map((item) => (
              
              <div key={item.id} className='justify-between p-2 shadow-gray-400'>
                  
                  <div 
                    style={{
                      backgroundColor : item.pass === 'Đang học' ? 'rgba(75, 192, 192, 0.2)' :'rgba(255, 99, 132, 0.2)' ,
                    }}
                  className='rounded-md p-2'>
                  {/* <div className='row-span-1'>
                    <h1 className='text-lg font-bold'>{item.idHocKy}</h1>
                  </div> */}
                  <div className='col-span-3 justify-center align-middle  font-bold'>{item.idHocPhan}</div>
                  <div style={{
                      fontSize: 12,
                    }} className='grid grid-cols-5'>
                    <div className='col-span-3 justify-center align-middle  font-bold'>{item.tenHocPhan}</div>
                    <div style={{
                      fontSize: 12,
                    }} className='col-span-1 justify-center align-middle mx-auto font-bold'>{item.soTinChi}</div>
                    <div 
                    style={{
                      fontSize: 12,
                    }}
                    className='col-span-1 justify-center align-middle mx-auto font-bold'> {item.pass ?  'Đang học' : 'Đạt' } </div>
                  </div>
                </div>
              </div>
            ))  
            }
        </div>
      </div>
    </div>
  )
}

export default Home;