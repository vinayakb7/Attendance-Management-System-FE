import react, { useEffect, useState } from "react";
import moment from "moment";
import "../App.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const List_view = () => {
    const [regularization, SetRegularization] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:5025/getRegularization?aitid=AIT-123")
            .then((res) => {
                SetRegularization(res.data);
            })
            .catch((err) => console.log(err));
    }, [])

    const totalHourse = (date, CheckIn, CheckOut) => {
        let datesplit = date.split("T");
        var today = new moment(datesplit[0] + " " + CheckIn);
        var d1 = new moment(datesplit[0] + " " + CheckOut);
        var duration = moment.duration(d1.diff(today));
        var hourse = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;
        // return hourse + ":" + minutes;
        return ("0"+hourse).slice(-2) + ":" + ("0"+minutes).slice(-2);
    };

    const status = (date, CheckIn, CheckOut) => {
        let datesplit = date.split("T");
        var today = new moment(datesplit[0] + " " + CheckIn);
        var d1 = new moment(datesplit[0] + " " + CheckOut);
        var duration = moment.duration(d1.diff(today));
        var hourse = parseInt(duration.asHours());
        if (hourse > 9.0) {
            return "Present";
        } else {
            return "Absent";
        }
    };

    return (
        <div className='conatiner-fluid'>
            <div className="row heading1">
                <div className="col-md-8"><h1 className="leftpad">List View</h1></div>
                <div className="col-md-2 calenderday2"></div>
                <div className="col-md-1 calenderday"></div>
                <div className="col-md-1 calenderday1"></div>
            </div><hr />

            <div className="row conatinerpad">
                <div className="col-md-2 "></div>
                <div className="col-md-8 conatinerpad1">
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
                                <h5>Reason</h5>
                            </div>
                            <div className="col-md-1">
                                <h5>Description</h5>
                            </div>
                        </div>           
                        {regularization.map((element) => {
                            return (
                                <>
                                    <div className="row" id="divtables">
                                        <div className="col-md-3" >
                                            <h5>{moment(element.date).format("ddd, yyyy-MMM-DD")}</h5>
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
                                        <div className="col-md-2">
                                            {status(
                                                element.date,
                                                element.checkIn,
                                                element.checkOut
                                            )}
                                        </div>
                                        <div className="col-md-1" >
                                            <h5>
                                            {element.reason}
                                            </h5>
                                        </div>
                                        <div className="col-md-1" >
                                            <h5>
                                            {element.description}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default List_view;
