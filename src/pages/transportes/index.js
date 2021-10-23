import withAuth from "@/hocs/withAuth";
import ReadTransport from "@/components/transports/ReadTransport";


const Transportes = () => {

    return (
        <div>
            <div className="container">
                <ReadTransport/>
            </div>
        </div>

    )
}

export default withAuth(Transportes);
