import withAuth from "@/hocs/withAuth";
import ReadCalendars from "@/components/calendars/ReadCalendars";


const Calendarios = () => {

    return (
        <div>
            <div className="container">
                <ReadCalendars/>
            </div>
        </div>

    )
}

export default withAuth(Calendarios);

