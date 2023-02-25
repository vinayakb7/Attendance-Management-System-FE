import react, { useEffect, useState } from "react";
import { FaEdit, FaCog, FaPlus, FaEllipsisV, FaCalendarCheck, FaCalendarDay, FaBackward, FaForward } from 'react-icons/fa';
import "../App.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { Formik, Field, ErrorMessage } from "formik";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";

const Tabular_view = () => {
    const [weekData, SetWeekData] = useState([]);
    const [firstDate, SetFirstDate] = useState("");
    const [lastDate, SetLastDate] = useState("");
    const [presentDay, SetPresentDay] = useState([]);
    const [absentDay, SetAbsentDay] = useState([]);
    const[description,setDescription] = useState();

    const initialValues = {
        attendence: "",
        checkin: "",
        checkout: "",
        select1: ""
    }
    const validationSchema = Yup.object({
        attendence: Yup.date().required("required"),
        checkin: Yup.string().required("required"),
        checkout: Yup.string().required("required"),
        select1: Yup.string().required("required")

    })
    const handleOnsubmit = (values) => {
        Axios.post("http://localhost:5025/attendance1", {
          aitId: "AIT-123",
          date: values.attendence,
          checkIn: values.checkin,
          checkOut: values.checkout,
          status: "Request",
          reason:values.select1,
          description:description
        })
          .then((res) => {
            toast.success("successfully");
          })
          .catch((err) => {
            toast.error(err);
          });
    }

    const monthLists = (params1, params2) => {

        Axios.get("http://localhost:5025/getAttendanceByWeek?aitid=AIT-123&date1="+params1+"&date2="+params2+"") .then((res) => {
            SetWeekData(res.data);
        })
        .catch((err) => console.log(err));

        // Axios.post("http://localhost:5025/getAttendanceByWeek", {
        //     aitId: "AIT-123",
        //     date: params1,
        //     status: params2,
        // })
        //     .then((res) => {
        //         SetWeekData(res.data);
        //     })
        //     .catch((err) => console.log(err));
    };
    const presentList = (params1, params2) => {
        Axios.get("http://localhost:5025/getPresentCount?aitid=AIT-123&date1="+params1+"&date2="+params2+"") .then((res) => {
            SetPresentDay(res.data);
        })
        .catch((err) => console.log(err));
        // Axios.post("http://localhost:5025/getAttendanceByWeek", {
        //     aitId: "AIT-123",
        //     date: params1,
        //     status: params2,
        // })
        //     .then((res) => {
        //         SetPresentDay(res.data);
        //     })
        //     .catch((err) => console.log(err));
    };

    const absentList = (params1, params2) => {
        Axios.get("http://localhost:5025/getAbsentCount?aitid=AIT-123&date1="+params1+"&date2="+params2+"") .then((res) => {
            SetAbsentDay(res.data);
        })
        .catch((err) => console.log(err));
        // Axios.post("http://localhost:5025/getAttendanceByWeek", {
        //     aitId: "AIT-123",
        //     date: params1,
        //     status: params2,
        // })
        //     .then((res) => {
        //         SetPresentDay(res.data);
        //     })
        //     .catch((err) => console.log(err));
    };
    useEffect(() => {
        var curr = new Date(); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        let firstDateFormat = moment(firstday).format("yyyy-MM-DD");
        let secondDateFormat = moment(lastday).format("yyyy-MM-DD");
        SetFirstDate(firstDateFormat);
        SetLastDate(secondDateFormat);
        monthLists(firstDateFormat, secondDateFormat);
        presentList(firstDateFormat, secondDateFormat);
        absentList(firstDateFormat, secondDateFormat);
    }, []);
    const back = () => {
        let curr = new Date(firstDate);
        let last = new Date(curr);
        curr.setDate(curr.getDate() - 7);
        last.setDate(curr.getDate() + 6);
        let firstDateFormat = moment(curr).format("yyyy-MM-DD");
        let secondDateFormat = moment(last).format("yyyy-MM-DD");
        SetFirstDate(firstDateFormat);
        SetLastDate(secondDateFormat);
        monthLists(firstDateFormat, secondDateFormat);
        presentList(firstDateFormat, secondDateFormat);
        absentList(firstDateFormat, secondDateFormat);
    };

    const next = () => {
        let curr = new Date(firstDate);
        let last = new Date(curr);
        curr.setDate(curr.getDate() + 7);
        last.setDate(curr.getDate() + 6);
        let firstDateFormat = moment(curr).format("yyyy-MM-DD");
        let secondDateFormat = moment(last).format("yyyy-MM-DD");
        SetFirstDate(firstDateFormat);
        SetLastDate(secondDateFormat);
        monthLists(firstDateFormat, secondDateFormat);
        presentList(firstDateFormat, secondDateFormat);
        absentList(firstDateFormat, secondDateFormat);
    };

    const totalHourse = (date, CheckIn, CheckOut) => {
        let datesplit = date.split("T");
        var today = new moment(datesplit[0] + " " + CheckIn);
        var d1 = new moment(datesplit[0] + " " + CheckOut);
        var duration = moment.duration(d1.diff(today));
        var hourse = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;
        return ("0" + hourse).slice(-2) + ":" + ("0" + minutes).slice(-2);
    };
    const status = (date, CheckIn, CheckOut) => {
        let datesplit = date.split("T");
        var today = new moment(datesplit[0] + " " + CheckIn);
        var d1 = new moment(datesplit[0] + " " + CheckOut);
        var duration = moment.duration(d1.diff(today));
        var hourse = parseInt(duration.asHours());
        if (hourse >= 9.0) {
            return "Present";
        } else {
            return "Absent";
        }
    };

    return (
        <div className='conatiner-fluid'>
            <div><Toaster /></div>
            <div className="row heading1">
                <div className="col-md-8">
                    <h1 className="leftpad">Tabular View</h1>
                </div>
                <div className="col-md-2 calenderday2">
                    <button type="button" class="btn btn-success calenderday2" data-bs-toggle="modal" data-bs-target="#myModal">
                        Regularization
                    </button>
                </div>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Request</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnsubmit}>
                                {(form) => (
                                    <form method="post" onSubmit={form.handleSubmit} >
                                        <div className="modal-body">
                                            <div className="form-group row" id='gapInForm'>
                                                <label className="col-sm-3 col-form-label">Attendence:</label>
                                                <div className="col-sm-9" id="required">
                                                    <Field type="Date" className="form-control" name="attendence" />
                                                    <ErrorMessage name="attendence" />
                                                </div>
                                            </div>
                                            <div className="form-group row" id='gapInForm'>
                                                <label className="col-sm-3 col-form-label">Check In :</label>
                                                <div className="col-sm-9" id="required">
                                                    <Field type="text" className="form-control" name="checkin" />
                                                    <ErrorMessage name="checkin" />
                                                </div>
                                            </div>
                                            <div className="form-group row" id='gapInForm'>
                                                <label className="col-sm-3 col-form-label">Check Out :</label>
                                                <div className="col-sm-9" id="required">
                                                    <Field type="text" className="form-control" name="checkout" />
                                                    <ErrorMessage name="checkout" />
                                                </div>
                                            </div>
                                            <div className="form-group row" id='gapInForm'>
                                                <label className="col-sm-3 col-form-label">Reason :</label>
                                                <div className="col-sm-9" id="required">
                                                    <Field as="select" name="select1" className="form-control">
                                                        <option value="">Select</option>
                                                        <option value="Forgot To Check-in">Forgot To Check-in</option>
                                                        <option value="Forgot To Check-out">Forgot To Check-out</option>
                                                        <option value="Work From Home">Work From Home</option>
                                                    </Field>
                                                    <ErrorMessage name="select1" />
                                                </div>
                                            </div>
                                            <div className="form-group row" id='gapInForm'>
                                                <label className="col-sm-3 col-form-label">Description:</label>
                                                <div className="col-sm-9">
                                                    <textarea name='description' onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="submit" className="btn btn-success" />
                                                <Link to="/List_view">
                                                    <input type="button" value="View" data-bs-dismiss="modal" className=" btn btn-warning" />
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 calenderday">
                    <Link to="/Tabular_view">
                        <abbr title="Week View">
                            <button className="btn btn-dark btnbtnbtn">
                                <FaCalendarDay />
                            </button>
                        </abbr>
                    </Link>
                </div>
                <div className="col-md-1 calenderday1">
                    <Link to="/Tabular_monthView">
                        <abbr title="Month View">
                            <button className="btn btn-dark btnbtnbtn">
                                <FaCalendarCheck />
                            </button>
                        </abbr>
                    </Link>
                </div>
            </div><hr />
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-between fweight">
                        <FaBackward onClick={back} />
                        <span id="spandate">
                            <span>
                                {moment(firstDate).format("DD-MMM-yyyy")} - {" "}
                                {moment(lastDate).format("DD-MMM-yyyy")}
                            </span>
                        </span>
                        <FaForward onClick={next} />
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row conatinerpad">
                <div className="col-md-1 "></div>
                <div className="col-md-10 conatinerpad1">
                    <div className="conatiner">
                        <div className="row" id="divtable_grey">
                            <div className="col-md-3">
                                <h5>Date</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>First IN</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>Last Out</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>Total Hours</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>Status</h5>
                            </div>
                            <div className="col-md-1">
                                <h5>Edit</h5>
                            </div>
                        </div>
                        <div className="row" id="divtable">
                            <div className="col-md-3" id="divtables" >
                                <h5>{moment(firstDate).format("ddd, yyyy-MMM-DD")}</h5>
                            </div>
                            <div className="col-md-9" id="weekend">
                                <h4 id="weekend1" >Weekend</h4>
                            </div>
                        </div>
                        {weekData.map((element) => {
                            return (
                                <>
                                    <div className="row" id="divtables">
                                        <div className="col-md-3" >
                                            <h5> {moment(element.date).format("ddd, yyyy-MMM-DD")}</h5>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>{element.checkIn}</h5>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>{element.checkOut}</h5>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>{totalHourse(
                                                element.date,
                                                element.checkIn,
                                                element.checkOut
                                            )}</h5>
                                        </div>
                                        <div className="col-md-1" >
                                            <h5>
                                            {element.status}
                                            </h5>
                                        </div>
                                        <div className="col-md-1" >
                                            <h5>
                                            {status(
                                            element.date,
                                            element.checkIn,
                                            element.checkOut
                                        ) === "Present" ? (
                                            ""
                                        ) : (
                                            <i
                                            type="button"
                                            className="fa fa-edit"
                                            data-bs-toggle="modal" data-bs-target="#myModal"
                                        ></i>
                                        )}
                                        </h5>
                                        </div>
                                        {/* <div className="col-md-1" >
                                            <i
                                                type="button"
                                                className="fa fa-edit"
                                                data-bs-toggle="modal" data-bs-target="#myModal"
                                            ></i>
                                        </div> */}
                                    </div>
                                </>
                            );
                        })}
                        <div className="row" id="divtable" >
                            <div className="col-md-3" id="divtables">
                                <h5>{moment(lastDate).format("ddd, yyyy-MMM-DD")}</h5>
                            </div>
                            <div className="col-md-9" id="weekend">
                                <h4 id="weekend1">Weekend</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>

            <div className="row conatiner_List_pad">
                <div className="col-md-1 "></div>
                <div className="col-md-10 conatinerpad1">
                    <h3>Attendence :</h3>
                    <div className="row" id="divtable_grey">
                        <div className="col-md-3">
                            <h5>Day(s) :</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>Present</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>Absent</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>Weekend </h5>
                        </div>
                        <div className="col-md-2">
                            <h5>Paid Leaves</h5>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row" id="divtable_grey">
                        <div className="col-md-3">
                            <h5>Hour(s) :</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>{presentDay.length}</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>{absentDay.length}</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>2</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>0</h5>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    );
};

export default Tabular_view;