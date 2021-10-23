import withAuth from "@/hocs/withAuth";
import ReadResources from "@/components/resources/ReadResources";


const Recursos = () => {

    return (
        <div>

            <div className="container">
                <ReadResources/>
            </div>
        </div>
    )
}

export default withAuth(Recursos);
