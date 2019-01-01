import React from "react";
import dateFns from "date-fns";
import style from "../css/DatePicker.css";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        };
        this.onDateClick = this.onDateClick.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className={style.header + ' ' + style.row + ' ' + style.flexmiddle}>
                <div className={style.col + ' ' + style.colstart}>
                    <div className={style.icon} onClick={this.prevMonth}>
                        chevron_left
            </div>
                </div>
                <div className={style.col + ' ' + style.colcenter}>
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className={style.col + ' ' + style.colend} onClick={this.nextMonth}>
                    <div className={style.icon}>chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className={style.col + ' ' + style.colcenter} key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className={style.days + ' ' + style.row}>{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={style.col + ' ' + style.cell
                            + ' ' + `style.${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className={style.number}>{formattedDate}</span>
                        <span className={style.bg}>{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className={style.row} key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className={style.body}>{rows}</div>;
    }

    onDateClick(day) {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth() {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth() {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <div className={style.calendar}>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default DatePicker;