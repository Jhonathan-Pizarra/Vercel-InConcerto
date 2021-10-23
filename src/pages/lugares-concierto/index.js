import withAuth from "@/hocs/withAuth";
import ReadConcertPlace from "@/components/concert-places/ReadConcertPlace";


const LugaresConcierto = () => {

    return (
        <div>
            <div className="container">
                <ReadConcertPlace/>
            </div>
        </div>

    );
}

export default withAuth(LugaresConcierto);