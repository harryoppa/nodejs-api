import React from "react";

export default () => {

    return (
        <>
            <div className="banner position-relative">
                <div className="banner-inner min-container">
                    <div className="banner-content">
                        <div className="banner-left d-flex align-items-center justify-content-center">
                            <h2>
                                Asia IT <br /> Market Place
                            </h2>
                        </div>

                        <div className="banner-right d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex">
                                <span className="active">Now</span>
                                <span>Future</span>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <p>6</p>
                                    <span>different <br />
                                    IT Software <br /> Networks</span>
                                </div>
                                <div>
                                    <p>32</p>
                                    <span>partners</span>
                                </div>
                                <div>
                                    <p>4</p>
                                    <span>countries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-sufix">
                <span>You are now viewing an <strong>IT Software</strong> that has been verified by over <strong>1 million users.</strong></span>
            </div>

        </>
    )
}