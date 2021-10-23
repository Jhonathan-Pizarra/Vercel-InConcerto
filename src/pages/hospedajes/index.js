import withAuth from "@/hocs/withAuth";
import ReadLodging from "@/components/lodgings/ReadLodging";


const Hospedajes = () => {

    return (
        <div>
            <div className="container">
                <ReadLodging/>
            </div>
        </div>

    )
}

export default withAuth(Hospedajes);
