import React from "react";


const PricingItem = ({
    name,
    description,
    price = '0',
    currency = '$',
    mode = 'normal', // normal - medium - hard
}) => {
    return (
        <div className={`pricing-item item--${mode}`}>
            <h2>{name}</h2>
            <p>{description}</p>

            <div className="pricing-item-value d-flex">
                <p className={price === '0' ? 'big' : ''}>{price}</p>
                <div className="d-flex flex-column">
                    <span>{currency}</span>
                    <span>Per Month</span>
                </div>
            </div>
        </div>
    )
}

export default () => {


    return (
        <div className="pricing">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <PricingItem
                            name="Free Test"
                            description="Organize across all apps by hand"
                        />
                    </div>
                    <div className="col-md-3">
                        <PricingItem
                            name="Low Price"
                            description="Monthly Fixed Amount"
                            price="200.000"
                        />
                    </div>
                    <div className="col-md-3">
                        <PricingItem 
                            name="Easy Using Methods"
                            description="Various Manuals"
                            price="200.000"
                            mode="medium"
                        />
                    </div>
                    <div className="col-md-3">
                        <PricingItem 
                            name="Verified IT Service"
                            description="On sales in 4 countries"
                            price="300.000"
                            currency="VND"
                            mode="hard"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}