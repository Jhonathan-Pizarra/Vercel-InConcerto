import withAuth from "@/hocs/withAuth";
import ReadFeedingPlace from "@/components/feeding-places/ReadFeedingPlace";


const LugarAlimentacion = () => {

    return (
        <div>
            <div className="container">
                <ReadFeedingPlace/>
            </div>
        </div>

    )
}

export default withAuth(LugarAlimentacion);
