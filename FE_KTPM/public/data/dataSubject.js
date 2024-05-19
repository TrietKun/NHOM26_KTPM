var dataSubject = [
    {
        "id": "00001",
        "name": "Toán rời rạc",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": false,
        "subjectPrerequisite":" ",
        "idHk" : "hk1" 
    },
    {
        "id": "00002",
        "name": "Nhập môn lập trình",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": false,
        "subjectPrerequisite":" " ,
        "idHk" : "hk1" 
    },
    {
        "id": "00003",
        "name": "Toán cao cấp",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Toán rời rạc" ,
        "idHk" : "hk1" 
    },
    {
        "id": "00004",
        "name": "Cấu trúc dữ liệu và giải thuật",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk1" 
    },
    {
        "id": "00005",
        "name": "Lập trình hướng đối tượng",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk1" 
    },
    {
        "id": "00006",
        "name": "Hệ điều hành",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk3" 
    },
    {
        "id": "00007",
        "name": "Cơ sở dữ liệu",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk5" 
    },
    {
        "id": "00008",
        "name": "Mạng máy tính",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk5" 
    },
    {
        "id": "00009",
        "name": "Phân tích và thiết kế hệ thống",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk6" 
    },
    {
        "id": "00010",
        "name": "Lập trình web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk9" 
    },
    {
        "id": "00011",
        "name": "An toàn và bảo mật thông tin",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk1" 
    },
    {
        "id": "00012",
        "name": "Kiến trúc máy tính",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk1" 
    },
    {
        "id": "00013",
        "name": "Lập trình di động",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Nhập môn lập trình" ,
        "idHk" : "hk8" 
    },
    {
        "id": "00014",
        "name": "Hệ quản trị cơ sở dữ liệu",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Cơ sở dữ liệu" ,
        "idHk" : "hk7" 
    },
    {
        "id": "00015",
        "name": "Lập trình ứng dụng mạng",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Mạng máy tính" ,
        "idHk" : "hk7" 
    },
    {
        "id": "00016",
        "name": "Thực tập công nghệ thông tin",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Phân tích và thiết kế hệ thống" ,
        "idHk" : "hk7" 
    },
    {
        "id": "00017",
        "name": "Phát triển ứng dụng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk6" 
    },
    {
        "id": "00018",
        "name": "Phát triển ứng dụng di động",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình di động" ,
        "idHk" : "hk5" 
    },
    {
        "id": "00019",
        "name": "Phát triển ứng dụng trên thiết bị di động",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình di động" ,
        "idHk" : "hk5" 
    },
    {
        "id": "00020",
        "name": "Phát triển ứng dụng trên nền tảng di động",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình di động" ,
        "idHk" : "hk4" 
    },
    {
        "id": "00021",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk4" 
    },
    {
        "id": "00022",
        "name": "Phát triển ứng dụng trên nền tảng di động",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình di động" ,
        "idHk" : "hk3" 
    },
    {
        "id": "00023",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk3" 
    },
    {
        "id": "00024",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk3" 
    },
    {
        "id": "00025",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk2" 
    },
    {
        "id": "00026",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk2" 
    },
    {
        "id": "00027",
        "name": "Phát triển ứng dụng trên nền tảng web",
        "numberCredit": 3,
        "type": "Bắt buộc",
        "prerequisite": true,
        "subjectPrerequisite":"Lập trình web" ,
        "idHk" : "hk2" 
    }
]

export default dataSubject;