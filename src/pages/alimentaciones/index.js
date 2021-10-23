import withAuth from "@/hocs/withAuth";
import ReadFeeding from "@/components/feedings/ReadFeeding";


const Alimentaciones = () => {

    return (
        <div>
            <div className="container">
                <ReadFeeding/>
            </div>
        </div>

    )
}

export default withAuth(Alimentaciones);
