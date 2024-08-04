import { useAuth } from "../store/auth";

export const Services = () => {

    const { services } = useAuth();

    return (
        <>
            <div className="center-page">
                <h1>SERVICES PAGE</h1>
                {
                    services.map((curElem, index) => {
                        const { service, description, price, provider } = curElem;
                        return (
                            <div className="services-page services-box" key={index}>
                                <p>{service}</p>
                                <p>{description}</p>
                                <p>{price}</p>
                                <p>{provider}</p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};