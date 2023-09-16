import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { fetchProperty } from "../../services/property.service";
import { formatCurrency, formatAddress } from "../../transformers/transformers";


const PropertyDetailComponent = () => {
    const params = useParams();
    const [propertyDetail, setPropertyDetail] = useState(null);

    const fetchNewProperty = (id: number) => {
        fetchProperty(id).then(
            (propertyDetail) => {
                setPropertyDetail(propertyDetail);
                console.log(propertyDetail)
            }
        );
    }
    useEffect(() => {  
        fetchNewProperty(Number(params.id));
    }, [params.id]);
    return (
        <>  
            <Link to={'/'}>
                <button>Back</button>
            </Link>
            <div className="col-sm-3 py-2">
                {propertyDetail ? (
                                <div className="card">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Price: {formatCurrency(propertyDetail.price)}</h5>
                                    <p className="card-text">{propertyDetail.beds} Beds {propertyDetail.baths} Baths {propertyDetail.square_feet} Sq.Ft.</p>
                                    <p className="card-text">{formatAddress(propertyDetail.address)}</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                    ): <h2>Loading...</h2>
                }
            </div>
        </>

    )
}

export default PropertyDetailComponent