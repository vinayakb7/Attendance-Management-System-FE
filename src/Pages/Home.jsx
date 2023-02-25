import React, { useState, useEffect } from 'react'
import "../App.css";
import user from '../Components/Images/AitLogo.png';
import { FaEdit, FaCog, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment/moment';


const Home = () => {
    const [status,setStatus] = useState();
    const [checkIn,setCheckIn] = useState();
    const [data, setdata] = useState([])
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(0);
    const [absentDay, SetAbsentDay] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5025/getMonthlyAbsentCount?aitid=AIT-123&month="+moment(new Date).format('MM')+"&year="+moment(new Date).format('yyyy')+"") .then((res) => {
            SetAbsentDay(res.data);
        })
        .catch((err) => console.log(err));

        axios.post('http://localhost:5025/getCheckIn', {
            "aitId": "AIT-123",
            "date": moment(new Date).format("yyyy-MM-DD")
        }).then(
            (res) => {
                if (res.data.length > 0) {
                    setCheckIn(res.data[0].checkIn);
                    setdata(res.data[0])
                    if (res.data[0].checkIn) {
                        var today = moment(moment(new Date).format('yyyy-MM-DD') + 'T' + res.data[0].checkIn)
                        var d1 = moment(moment(new Date).format('yyyy-MM-DD') + 'T' + moment(new Date).format('HH:mm:ss'))
                        var duration = moment.duration(d1.diff(today));
                        var hourse = parseInt(duration.asHours());
                        var minutes = parseInt(duration.asMinutes()) % 60;
                        var seconds = parseInt(duration.asSeconds()) % 3600;
                        let dummytime = hourse + ':' + minutes + ':' + seconds;
                        setTimerOn(1)
                        const arr = dummytime.split(":");
                        setTime(((arr[0] * 3600 + arr[1] * 60 + (+arr[2])) * 1000)/2)
                        console.log((arr[0] * 3600 + arr[1] * 60 + (+arr[2])) * 1000);
                    }
                }
            })
        //   .catch(err=>alert(err))
        let interval = null;
        if (timerOn === 1) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else if (timerOn === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);
    const checkFunction = (e) => {
        let status;
        let today = new Date();
        const date = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        document.getElementById("checkin").innerHTML = "Checkin";

        if (e.target.checked === true) {
            axios.post('http://localhost:5025/attendance', {
                "aitId": "AIT-123",
                "date": moment(new Date).format("yyyy-MM-DD"),
                "checkIn": date
            }).then(res => console.log(res))
            setTimerOn(1)
            document.getElementById("checkin").innerHTML = "Checkin";
            document.getElementById("checkin").style.color = "green";
        }
        if (e.target.checked === false) {
            var today1 = new moment(moment(today).format("yyyy-MM-DD") + "T" + checkIn);
            var d1 = new moment(moment(today).format("yyyy-MM-DD") + "T" + date);
            var duration = moment.duration(d1.diff(today1));
            var hourse = parseInt(duration.asHours());
            if(hourse>9){
               status = "Present";
            }
            else{
                status = "Absent";
            }
            axios.post('http://localhost:5025/getCheckOut', {
                "aitId": "AIT-123",
                "date": moment(new Date).format("yyyy-MM-DD"),
                "checkOut": date,
                "status":status
            }).then(res => console.log(res))
            setTimerOn(0)
            window.location.reload();
            document.getElementById("checkin").innerHTML = "Checkout";
            document.getElementById("checkin").style.color = "red";
        }
    }


    return (
        <div className='home'>
            <div className='conatiner-fluid'>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-9 heading1">
                        <h1>Welcome To Attendence Management System</h1>
                        <hr id='hr' />
                    </div>

                    <div className="col-md-1"></div>
                </div>
                <div className="row dashrow">
                    <div className="col-md-1"></div>
                    <div className="col-md-3" id='table1'>
                        <table className='table table-light ' >
                            <thead>
                                <tr>
                                    <th>Leave Report</th>
                                    <th>Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Absent<br/>
                                        {absentDay.length} Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Adoption Leave <br />
                                            Available 84 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Compensatory Off <br />
                                            Available 0 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Leave Without Pay <br />
                                            Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Maternity Leave<br />
                                            Available 182 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Optional Holiday <br />
                                            Available 0.5 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Privilege Leave <br />
                                            Available 6.83 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Sick Leave <br />
                                            Available 4.5 Day(s)</p>
                                    </td>
                                    <td><p><FaPlus /></p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4 aligntxt">
                        <h3 id='checkin'></h3>
                        <input className="form-check-input " defaultChecked={data.checkIn} onClick={checkFunction} style={{ width: "100px", height: "30px", }} type="checkbox" role="switch" id="flexSwitchCheckChecked" />

                        <h1 id='timer'> Timer </h1>
                        <div className='aligntxt1'>
                            <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                        </div>
                    </div>
                    <div className="col-md-3" id='table1'>
                        <table className='table table-light'>
                            <thead>
                                <tr>
                                    <th>Upcoming Holidays</th>
                                    <th>&nbsp;Festivals&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Diwali/Deepavali
                                            <br />Monday
                                        </p>
                                    </td>
                                    <td><p>24 - Oct</p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Govardhan Puja
                                            <br />Tuesday
                                        </p>
                                    </td>
                                    <td><p>25 - Oct</p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Bhai Dooj - Optional Holiday
                                            <br />Thursday
                                        </p>
                                    </td>
                                    <td><p>27 - Oct</p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Guru Nanak Jayanti - Optional Holiday
                                            <br />Tuesday
                                        </p>
                                    </td>
                                    <td><p>8 - Nov</p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>New year eve<br />Friday</p>
                                    </td>
                                    <td><p>30 - Dec</p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>New Year <br />Sunday</p>
                                    </td>
                                    <td><p>1 - Jan</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"></div>
                    <div className='row'>
                        <div className="col-md-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
